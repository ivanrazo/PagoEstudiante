import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Docente, Estudiante } from '../models/estudiante.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { DocenteService } from '../services/docente-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docentes',
  imports: [
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
  templateUrl: './docentes.html',
  styleUrl: './docentes.css',
})
export class Docentes implements OnInit{

  imageHost = environment.imageHost;

  displayedColumns: string[] = ['foto','nombreDocente','apellidoPaterno','apellidoMaterno', 'email', 'mostrarMaterias', 'mostrarHorarios'];

  docentesDataSource = new MatTableDataSource<Docente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private docenteService: DocenteService,
    private router: Router
  ) {}

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

  configurarFiltro(): void {
    this.docentesDataSource.filterPredicate = (
      docente: Docente,
      filtro: string
    ) => {
      if(filtro.length<=2){
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

  agregarDocente(docente: Docente): void {
  console.log('Docente seleccionado:', docente);
  this.router.navigate(['/admin/new-docente', docente.idDocente]);
}

getFotoUrl(foto?: string): string {
  return foto
    ? `${this.imageHost}/${foto}`
    : 'assets/user-default.png';
}

mostrarMaterias(docente: Docente): void {
  if (!docente.materias || docente.materias.length === 0) {
    Swal.fire('Materias', 'Este docente no tiene materias asignadas', 'info');
    return;
  }

  const listaMaterias = docente.materias
    .map(m => m.nombreMateria)
    .join('<br>');

  Swal.fire({
    title: 'Materias asignadas',
    html: listaMaterias,
    icon: 'info'
  });
}

  regresarPaginaAnterior(): void {
    window.history.back();
  }
}
