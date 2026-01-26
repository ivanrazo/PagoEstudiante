import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Docente, Materia } from '../models/estudiante.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocenteService } from '../services/docente-service';
import { MateriaService } from '../services/materia-service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-materia-docente',
  imports: [],
  templateUrl: './materia-docente.html',
  standalone: true,
  styleUrl: './materia-docente.css',
})
export class MateriaDocente {
  materiasDataSource = new MatTableDataSource<Materia>([]);
  displayedColumns: string[] = ['idMateria', 'creditos', 'horario'];

  idDocente!: number;
  nombreDocente: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private docenteService: DocenteService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private materiaService: MateriaService
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.params['idDocente'];
    if (idParam) {
      this.idDocente = +idParam;
      this.cargarMateriasDelDocente();
    }
  }

  ngAfterViewInit(): void {
    this.materiasDataSource.paginator = this.paginator;
    this.materiasDataSource.sort = this.sort;
  }

  cargarMateriasDelDocente(): void {
    this.docenteService.buscarDocentePorId(this.idDocente).subscribe({
      next: (docente) => {
        this.nombreDocente = `${docente.nombreDocente} ${docente.apellidoPaterno} ${docente.apellidoMaterno}`;
        this.cdr.detectChanges();
      },
      error: () => this.nombreDocente = ''
    });

    this.docenteService.listarMateriasDelDocente({ idDocente: this.idDocente } as Docente)
      .subscribe({
        next: (materias) => {
          this.materiasDataSource.data = materias;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar materias', err)
      });
  }

  editarMateria(materia: Materia): void {
    if (!materia.idMateria) return;
    Swal.fire({
      title: '¿Editar Materia?',
      text: 'Se abrirá el formulario para editar esta materia',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/materias/editar', materia.idMateria]);
      }
    });
  }

  //eliminarMateria(idMateria: number): void {
  // Swal.fire({
  // title: '¿Estás seguro?',
  // text: 'Esta acción eliminará el materia permanentemente',
  // icon: 'warning',
  // showCancelButton: true,
  // confirmButtonText: 'Sí, eliminar',
  // cancelButtonText: 'Cancelar'
  // }).then(result => {
  //  if (result.isConfirmed) {
  //  this.materiaService.eliminarMateria(idMateria).subscribe({
  //  next: () => {
  //  Swal.fire('Eliminado', 'Materia eliminada correctamente', 'success');
  //  this.materiasDataSource.data = this.materiasDataSource.data.filter(m => m.idMateria !== idMateria);
  //  },
  //  error: () => Swal.fire('Error', 'No se pudo eliminar la materia', 'error')
  // });
  //  }
  //  });
  //}

  agregarPago(): void {
    this.router.navigate(['/admin/new-materia', this.idDocente]);
  }

  regresarPaginaAnterior(): void {
    this.location.back();
  }
}
