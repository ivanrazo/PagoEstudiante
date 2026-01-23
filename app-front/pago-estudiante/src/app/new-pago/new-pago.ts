import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Estudiante, Pago } from '../models/estudiante.model';
import { PagosService } from '../services/pagos-service';
import { EstudiantesService } from '../services/estudiantes-service';
import { AuthService } from '../services/auth-service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-new-pago',
  standalone: true,
  templateUrl: './new-pago.html',
  styleUrls: ['./new-pago.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule
  ]
})
export class NewPago implements OnInit {
  pagoFormGroup!: FormGroup;
  idPago!: number;
  isEditMode = false;

  estudiantes: Estudiante[] = [];
  estudiantesFiltrados: Estudiante[] = [];

  tiposPagos: string[] = ['EFECTIVO', 'CHEQUE', 'TRANSFERENCIA', 'DEPOSITO'];
  estadosPagos: string[] = ['CREADO', 'VALIDADO', 'RECHAZADO'];

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private pagosService: PagosService,
    private estudiantesService: EstudiantesService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
    private location: Location) { }

  ngOnInit(): void {
    this.pagoFormGroup = this.fb.group({
      estudiante: [null, Validators.required],
      date: [null, Validators.required],
      cantidad: [null, [Validators.required, Validators.min(1)]],
      type: [null, Validators.required],
      status: ['CREADO', Validators.required]
    });

    this.cargarEstudiantes();
    this.configurarFiltroAutocomplete();

    this.activatedRoute.paramMap.subscribe(params => {
      const idPagoParam = params.get('idPago');
      const idEstudianteParam = params.get('idEstudiante');

      if (idPagoParam) {
        this.idPago = +idPagoParam;
        if (!isNaN(this.idPago)) {
          this.isEditMode = true;
          this.cargarPago();
        }
      } else if (idEstudianteParam) {
        const idEstudiante = +idEstudianteParam;
        if (!isNaN(idEstudiante)) {
          this.estudiantesService.buscarEstudiantePorId(idEstudiante)
            .subscribe(estudiante => {
              this.pagoFormGroup.patchValue({ estudiante });
              this.cdr.detectChanges();
            });
        }
      }
    });
  }

  getNombreCompleto(estudiante: Estudiante): string {
    return `${estudiante.nombre} ${estudiante.apellidoPaterno} ${estudiante.apellidoMaterno}`.trim();
  }


  get nombreEstudiante(): string {
    const estudiante: Estudiante | null =
      this.pagoFormGroup?.get('estudiante')?.value;
    return estudiante ? this.getNombreCompleto(estudiante) : '';
  }

  cargarEstudiantes(): void {
    this.estudiantesService.listarEstudiantes().subscribe(estudiantes => {
      this.estudiantes = [...estudiantes].sort((a, b) =>
        this.getNombreCompleto(a).localeCompare(
          this.getNombreCompleto(b),
          'es',
          { sensitivity: 'base' }
        )
      );
      this.estudiantesFiltrados = [...this.estudiantes];
    });
  }

  configurarFiltroAutocomplete(): void {
    this.pagoFormGroup.controls['estudiante'].valueChanges.subscribe(value => {
      const texto = typeof value === 'string'
        ? value.toLowerCase()
        : this.displayEstudiante(value).toLowerCase();

      this.estudiantesFiltrados = this.estudiantes.filter(estudiante =>
        this.getNombreCompleto(estudiante).toLowerCase().includes(texto)
      );
    });
  }

  displayEstudiante = (estudiante: Estudiante | null): string => {
    return estudiante ? this.getNombreCompleto(estudiante) : '';
  }

  compareEstudiantes(e1: Estudiante, e2: Estudiante): boolean {
    return e1 && e2 ? e1.idEstudiante === e2.idEstudiante : e1 === e2;
  }

  onEstudianteSelected(estudiante: Estudiante): void {
    this.pagoFormGroup.controls['estudiante'].setValue(estudiante);
  }

  cargarPago(): void {
    this.pagosService.getPagoById(this.idPago).subscribe({
      next: pago => {
        this.pagoFormGroup.patchValue({
          estudiante: pago.estudiante,
          date: new Date(pago.fecha),
          cantidad: pago.cantidad,
          type: pago.type,
          status: pago.status
        });
        this.cdr.detectChanges();
      },
      error: () =>
        Swal.fire('Error', 'No se pudo cargar el pago', 'error')
    });
  }

  guardarOEditarPago(): void {
    if (this.pagoFormGroup.invalid) {
      Swal.fire('Formulario incompleto', 'Completa todos los campos', 'warning');
      return;
    }

    const formValue = this.pagoFormGroup.getRawValue();
    const estudiante: Estudiante | null = formValue.estudiante;

    if (!estudiante || !estudiante.idEstudiante) {
      Swal.fire('Error', 'Debes seleccionar un alumno válido', 'warning');
      return;
    }

    const pago: Pago = {
      idPago: this.isEditMode ? this.idPago : undefined,
      fecha: formValue.date.toISOString().split('T')[0],
      cantidad: formValue.cantidad,
      type: formValue.type,
      status: formValue.status,
      ...(this.isEditMode
        ? {
          estudiante: {
            idEstudiante: estudiante.idEstudiante,
            nombre: estudiante.nombre,
            apellidoPaterno: estudiante.apellidoPaterno,
            apellidoMaterno: estudiante.apellidoMaterno
          }
        }
        : { estudianteId: estudiante.idEstudiante }
      )
    };

    const request$ = this.isEditMode
      ? this.pagosService.editarPago(pago)
      : this.pagosService.guardarPago(estudiante.idEstudiante, pago);

    request$.subscribe({
      next: () => {
        Swal.fire(
          'Éxito',
          `Pago ${this.isEditMode ? 'actualizado' : 'registrado'} correctamente`,
          'success'
        );
        this.router.navigate(['/admin/pago-estudiante', estudiante.idEstudiante]);
      },
      error: () =>
        Swal.fire('Error', 'No se pudo guardar el pago', 'error')
    });
  }

  regresarPaginaAnterior(): void {
    this.location.back();
  }

  isAdmin(rol: string): boolean {
    return this.authService.roles.includes(rol);
  }
}
