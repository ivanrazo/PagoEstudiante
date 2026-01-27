import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriaService } from '../services/materia-service';
import { Materia } from '../models/estudiante.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-materias',
  standalone: true,
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
  templateUrl: './load-materias.html',
  styleUrl: './load-materias.css',
})
export class LoadMaterias implements OnInit {
  displayedColumns: string[] = ['idMateria', 'nombreMateria', 'creditos', 'editarMateria', 'eliminarMateria'];

  materiasDataSource = new MatTableDataSource<Materia>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private materiaService: MateriaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarMaterias();
    this.configurarFiltro();
  }

  cargarMaterias(): void {
    this.materiaService.listarMaterias().subscribe({
      next: materias => {
        this.materiasDataSource.data = materias;
        this.materiasDataSource.paginator = this.paginator;
        this.materiasDataSource.sort = this.sort;
      },
      error: () => console.error('Error al cargar materias')
    });
  }

  configurarFiltro(): void {
    this.materiasDataSource.filterPredicate = (
      materia: Materia,
      filtro: string
    ) => {
      if (filtro.length <= 2) {
        return true;
      }
      return materia.nombreMateria
        .toLowerCase()
        .startsWith(filtro);
    };
  }

  filtrarMaterias(event: Event): void {
    const valor = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.materiasDataSource.filter = valor;
  }

  agregarMateria(): void {
    this.router.navigate(['/admin/new-materia']);
  }

  eliminarMateria(idMateria: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la materia permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        // si se confirma se ejecuta el metodo del servicio
        this.materiaService.eliminarMateria(idMateria).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Materia eliminada correctamente', 'success');
            //Actualiza la tabla localmente
            this.materiasDataSource.data = this.materiasDataSource.data.filter(
              m => m.idMateria !== idMateria
            );
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar la materia', 'error')
        });
      }
    });
  }

  mostrarDocentes(materia: Materia) {
    this.router.navigate(['/admin/materia-docente', materia.idMateria]);
  }

  regresarPaginaAnterior(): void {
    window.history.back();
  }

  editarMateria(materia: Materia): void {
    Swal.fire({
      title: '¿Editar Materia?',
      text: 'Se abrirá el formulario para editar esta materia',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        console.log('Materia completa:', materia);
        this.router.navigate(['/admin/new-materia', materia.idMateria]);
      }
    });
  }
}
