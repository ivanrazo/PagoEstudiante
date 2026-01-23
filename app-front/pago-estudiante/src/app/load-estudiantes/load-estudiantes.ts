import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estudiante } from '../models/estudiante.model';
import { EstudiantesService } from '../services/estudiantes-service';
import { Location } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { environment } from '../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-load-estudiantes',
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
  templateUrl: './load-estudiantes.html',
  styleUrls: ['./load-estudiantes.css'],
})
export class LoadEstudiantes implements OnInit {

  estudiantesDataSource = new MatTableDataSource<Estudiante>([]);
  displayedColumns: string[] = [
    'idEstudiante', 'nombre', 'apellidoPaterno', 'apellidoMaterno', 'foto', 'programaId', 'domicilio', 'editarEstudiante', 'eliminarEstudiante'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  imageHost = environment.imageHost;
  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.configurarFiltro();
  }

  cargarEstudiantes(): void {
    this.estudiantesService.listarEstudiantes().subscribe({
      next: estudiantes => {
        this.estudiantesDataSource.data = estudiantes;
        this.estudiantesDataSource.paginator = this.paginator;
        this.estudiantesDataSource.sort = this.sort;
      },
      error: () => console.error('Error al cargar estudiantes')
    });
  }

  agregarEstudiante(): void {
    this.router.navigate(['/admin/new-estudiante']);
  }

  configurarFiltro(): void {
    this.estudiantesDataSource.filterPredicate = (
      estudiante: Estudiante,
      filtro: string
    ) => {
      if (filtro.length <= 2) {
        return true;
      }
      return estudiante.nombre
        .toLowerCase()
        .startsWith(filtro);
    };
  }

  filtrarEstudiantes(event: Event): void {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.estudiantesDataSource.filter = valor;
  }

  regresarPaginaAnterior(): void { //regresa a la pagina anterior
    this.location.back();
  }

  //muestra un SweetAlert de confirmacion, si se confirma manda a la ruta del formulario, pero con el idEstudiante

  editarEstudiante(estudiante: Estudiante): void {
    Swal.fire({
      title: '¿Editar Estudiante?',
      text: 'Se abrirá el formulario para editar este estudiante',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/new-estudiante', estudiante.idEstudiante]);
      }
    });
  }

  //muestra un SweetAlert de alerta para confirmar la accion, 
  eliminarEstudiante(idEstudiante: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al estudiante permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        // si se confirma se ejecuta el metodo del servicio
        this.estudiantesService.eliminarEstudiante(idEstudiante).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Estudiante eliminado correctamente', 'success');
            //Actualiza la tabla localmente
            this.estudiantesDataSource.data = this.estudiantesDataSource.data.filter(
              e => e.idEstudiante !== idEstudiante
            );
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el estudiante', 'error')
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
