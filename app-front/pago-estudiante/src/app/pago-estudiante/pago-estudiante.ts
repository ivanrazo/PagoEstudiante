import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import Swal from 'sweetalert2';

import { EstudiantesService } from '../services/estudiantes-service';
import { Pago, Estudiante } from '../models/estudiante.model';
import { PagosService } from '../services/pagos-service';

@Component({
  selector: 'app-pago-estudiante',
  standalone: true,
  templateUrl: './pago-estudiante.html',
  styleUrls: ['./pago-estudiante.css'],
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
  ]
})
export class PagoEstudiante implements OnInit, AfterViewInit {

  pagosDataSource = new MatTableDataSource<Pago>([]);
  displayedColumns: string[] = ['idPago', 'fecha', 'cantidad', 'tipo', 'estado'];

  idEstudiante!: number;
  nombreEstudiante: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private estudiantesService: EstudiantesService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private pagosService: PagosService
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.params['idEstudiante'];
    if (idParam) {
      this.idEstudiante = +idParam;
      this.cargarPagosDelEstudiante();
    }
  }

  ngAfterViewInit(): void {
    this.pagosDataSource.paginator = this.paginator;
    this.pagosDataSource.sort = this.sort;
  }

  cargarPagosDelEstudiante(): void {
    this.estudiantesService.buscarEstudiantePorId(this.idEstudiante).subscribe({
      next: (estudiante) => {
        this.nombreEstudiante = `${estudiante.nombre} ${estudiante.apellidoPaterno} ${estudiante.apellidoMaterno}`;
        this.cdr.detectChanges();
      },
      error: () => this.nombreEstudiante = ''
    });

    this.estudiantesService.listarPagosDeEstudiante({ idEstudiante: this.idEstudiante } as Estudiante)
      .subscribe({
        next: (pagos) => {
          this.pagosDataSource.data = pagos;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar pagos', err)
      });
  }

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
            this.pagosDataSource.data = this.pagosDataSource.data.filter(p => p.idPago !== idPago);
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el pago', 'error')
        });
      }
    });
  }

  agregarPago(): void {
    this.router.navigate(['/admin/new-pago', this.idEstudiante]);
  }

  regresarPaginaAnterior(): void {
    this.location.back();
  }
}
