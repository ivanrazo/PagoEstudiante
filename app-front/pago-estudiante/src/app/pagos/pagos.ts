import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PagosService } from '../services/pagos-service';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { EstudiantesService } from '../services/estudiantes-service';
import { Pago } from '../models/estudiante.model';

@Component({
  standalone: true,
  selector: 'app-pagos',
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDividerModule, MatCardModule],
  templateUrl: './pagos.html',
  styleUrl: './pagos.css',
})
export class Pagos implements OnInit {
  nombreEstudiante: string = '';
  idEstudiante!: number;
  public pagos: any[] = [];
  public dataSource!: MatTableDataSource<Pago>;
  public displayedColumns = ['idPago', 'fecha', 'cantidad', 'type', 'status', 'nombreCompleto'];
  public estudiantesDataSource: any;

  /*
  - @ViewChild: Decorador que permite acceder a un componente hijo del DOM
  */
  @ViewChild(MatPaginator) paginator!: MatPaginator; //VIEWCHILD permite obtener componentes hijos del template HTML
  @ViewChild(MatSort) sort!: MatSort; //permite ordenamiento por columnas el ! indica que la variable se inicializara despues

  constructor(private pagosService: PagosService, private location: Location, private estudianteService: EstudiantesService) { }

  ngOnInit(): void {
    this.pagosService.listarPagos().subscribe({
      next: data => { //se ejecuta cuando llegan los datos exitosamente
        this.pagos = data; //Se asignan valores a la tabla
        this.dataSource = new MatTableDataSource(this.pagos); //MatTableDataSource Se usan para mostrar datos de <table mat-table>
        this.dataSource.paginator = this.paginator; //Permite que se dividan en paginas automaticamente
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  cargarEstudiantes(): void { //lista los estudiantes
    this.estudianteService.listarEstudiantes().subscribe({
      next: (data) => {
        this.estudiantesDataSource.data = data;
      },
      error: (err) => {
        console.error('Error al cargar estudiantes', err);
      }
    });
  }

  regresarPaginaAnterior() {
    this.location.back();
  }
}

