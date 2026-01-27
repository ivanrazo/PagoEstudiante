import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Docente, Materia } from '../models/estudiante.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DocenteService } from '../services/docente-service';
import { MateriaService } from '../services/materia-service';
import { CommonModule, Location } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-materia-docente',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  templateUrl: './materia-docente.html',
  standalone: true,
  styleUrl: './materia-docente.css',
})
export class MateriaDocente implements OnInit {
  materiasDataSource = new MatTableDataSource<Materia>([]);
  displayedColumns: string[] = ['idMateria', 'nombreMateria', 'creditos'];

  idDocente!: number;
  nombreDocente: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private docenteService: DocenteService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef
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

  agregarMateria(): void {
    this.router.navigate(['/admin/new-materia', this.idDocente]);
  }

  regresarPaginaAnterior(): void {
    this.location.back();
  }
}
