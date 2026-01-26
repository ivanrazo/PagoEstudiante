import { Component, ViewChild } from '@angular/core';
import { DocenteService } from '../services/docente-service';
import { Docente, Estudiante } from '../models/estudiante.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment.development';
import { Location } from '@angular/common';

@Component({
  selector: 'app-load-docentes',
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  templateUrl: './load-docentes.html',
  styleUrl: './load-docentes.css',
})
export class LoadDocentes {
docentesDataSource = new MatTableDataSource<Docente>([]);
  displayedColumns: string[] = [
    'idDocente', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'foto', 'email', 'editarDocente', 'eliminarDocente'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imageHost = environment.imageHost;
  constructor(
    private docenteService: DocenteService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.cargarDocentes();
    this.configurarFiltro();
  }

  cargarDocentes(): void {
    this.docenteService.listarDocentes().subscribe({
      next: docentes => {
        this.docentesDataSource.data = docentes;
        this.docentesDataSource.paginator = this.paginator;
        this.docentesDataSource.sort = this.sort;
      },
      error: () => console.error('Error al cargar docentes')
    });
  }

  agregarDocente(): void {
    this.router.navigate(['/admin/new-docente']);
  }

  configurarFiltro(): void {
    this.docentesDataSource.filterPredicate = (
      docente: Docente,
      filtro: string
    ) => {
      if (filtro.length <= 2) {
        return true;
      }
      return docente.nombreDocente
        .toLowerCase()
        .startsWith(filtro);
    };
  }

  filtrarDocentes(event: Event): void {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.docentesDataSource.filter = valor;
  }

  regresarPaginaAnterior(): void { //regresa a la pagina anterior
    this.location.back();
  }

  //muestra un SweetAlert de confirmacion, si se confirma manda a la ruta del formulario, pero con el idEstudiante

  editarDocente(docente: Docente): void {
    Swal.fire({
      title: '¿Editar Docente?',
      text: 'Se abrirá el formulario para editar este docente',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/new-docente', docente.idDocente]);
      }
    });
  }

  //muestra un SweetAlert de alerta para confirmar la accion, 
  eliminarDocente(idDocente: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al docente permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        // si se confirma se ejecuta el metodo del servicio
        this.docenteService.eliminarDocente(idDocente).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Docente eliminado correctamente', 'success');
            //Actualiza la tabla localmente
            this.docentesDataSource.data = this.docentesDataSource.data.filter(
              docente => docente.idDocente !== idDocente
            );
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el docente', 'error')
        });
      }
    });
  }

  getFotoUrl(foto?: string): string {
    return foto
      ? `${this.imageHost}/${foto}`
      : 'assets/user-default.png';
  }
}
