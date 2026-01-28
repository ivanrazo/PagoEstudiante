import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Pago } from '../models/estudiante.model';
import { PagosService } from '../services/pagos-service';
import { Location, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  standalone: true,
  selector: 'app-load-pagos',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTableModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule
  ],
  templateUrl: './load-pagos.html',
  styleUrls: ['./load-pagos.css'],
})
export class LoadPagos implements OnInit {

  pagosDataSource = new MatTableDataSource<Pago>([]);
  idEstudiante!: number;

  displayedColumns: string[] = [
    'idPago', 'fecha', 'cantidad', 'tipo', 'estado', 'nombreCompleto', 'editarPago', 'eliminarPago'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idEstudianteParam = this.activatedRoute.snapshot.params['idEstudiante'];
    if (idEstudianteParam) {
      this.idEstudiante = +idEstudianteParam;
    }

    this.cargarPagos();
  }

  cargarPagos(): void {
    this.pagosService.listarPagos().subscribe({
      next: (pagos) => {
        const filtrados = this.idEstudiante
          ? pagos.filter(p => p.estudiante?.idEstudiante === this.idEstudiante)
          : pagos;

        this.pagosDataSource.data = filtrados ?? [];

        // Paginación y ordenamiento
        this.pagosDataSource.paginator = this.paginator;
        this.pagosDataSource.sort = this.sort;

        // Detectar cambios para evitar NG0100
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.pagosDataSource.data = [];
      }
    });
  }

  //metodo que manda a la ruta donde esta la lista de estudiantes a editar su pago
  agregarPago() {
    this.router.navigate(['/admin/new-pago/:idEstudiante']);
  }

  //Confirmacion y entrutamiento al formulario de pagos
  editarPago(pago: Pago): void {
    if (!pago.idPago) return;
    Swal.fire({
      title: '¿Editar Pago?',
      text: 'Se abrirá el formulario para editar este pago',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/pagos/editar', pago.idPago]);
      }
    });
  }


  //metodo para eliminar pago
  eliminarPago(idPago: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el pago permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.pagosService.eliminarPago(idPago).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Pago eliminado correctamente', 'success');
            //Actualiza la tabla localmente
            this.pagosDataSource.data = this.pagosDataSource.data.filter(p => p.idPago !== idPago);
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el pago', 'error');
          }
        });
      }
    });
  }
    //Regresa a la pagina anterior
  regresarPaginaAnterior(): void {
    this.location.back();
  }
}
