import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Estudiante } from '../models/estudiante.model';
import { EstudiantesService } from '../services/estudiantes-service';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.html',
  imports:[
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginator,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    CommonModule
  ],
  styleUrls: ['./estudiantes.css']
})
export class Estudiantes implements OnInit {


  displayedColumns: string[] = ['foto','nombre','apellidoPaterno','apellidoMaterno', 'programaId','domicilio','agregarPago','mostrarPagos'];

  estudiantesDataSource = new MatTableDataSource<Estudiante>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private estudiantesService: EstudiantesService,
    private router: Router
  ) {}

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

  configurarFiltro(): void {
    this.estudiantesDataSource.filterPredicate = (
      estudiante: Estudiante,
      filtro: string
    ) => {
      if(filtro.length<=2){
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

  agregarPago(estudiante: Estudiante): void {
  console.log('Estudiante seleccionado:', estudiante);
  this.router.navigate(['/admin/new-pago', estudiante.idEstudiante]);
}

  mostrarPagos(estudiante: Estudiante){
      this.router.navigate(['/admin/pago-estudiante', estudiante.idEstudiante]);
  }

  regresarPaginaAnterior(): void {
    window.history.back();
  }
}
