import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriaService } from '../services/materia-service';
import { DocenteService } from '../services/docente-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Materia } from '../models/estudiante.model';
import {CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-materias',
  imports: [
    CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDividerModule, MatCardModule, MatIconModule
  ],
  templateUrl: './materias.html',
  styleUrl: './materias.css',
})
export class Materias implements OnInit{
  nombreDocente: string = '';
  idEstudiante!: number;
  public materias: any[] = [];
  public dataSource!: MatTableDataSource<Materia>;
  public displayedColumns = ['idMateria', 'nombreMateria', 'creditos', 'docentes', 'alumnosInscritos'];
  public docentesDataSource: any;

  /*
  - @ViewChild: Decorador que permite acceder a un componente hijo del DOM
  */
  @ViewChild(MatPaginator) paginator!: MatPaginator; //VIEWCHILD permite obtener componentes hijos del template HTML
  @ViewChild(MatSort) sort!: MatSort; //permite ordenamiento por columnas el ! indica que la variable se inicializara despues

  constructor(private materiaService: MateriaService, private location: Location, private docenteService: DocenteService) { }

  ngOnInit(): void {
    this.materiaService.listarMaterias().subscribe({
      next: data => { //se ejecuta cuando llegan los datos exitosamente
        this.materias = data; //Se asignan valores a la tabla
        this.dataSource = new MatTableDataSource(this.materias); //MatTableDataSource Se usan para mostrar datos de <table mat-table>
        this.dataSource.paginator = this.paginator; //Permite que se dividan en paginas automaticamente
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  cargarDocentes(): void { //lista los estudiantes
    this.docenteService.listarDocentes().subscribe({
      next: (data) => {
        this.docentesDataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar docentes', err);
      }
    });
  }

  regresarPaginaAnterior() {
    this.location.back();
  }
}
