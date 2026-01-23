import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Location } from '@angular/common';
import { EstudiantesService } from '../services/estudiantes-service';
import { Estudiante } from '../models/estudiante.model';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { UppercaseDirective } from '../directives/uppercase.directive';
import { UppercaseTwoDirective } from '../directives/uppercaseTwo.directive';
import { UppercaseThreeDirective } from '../directives/uppercaseThree.directive';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../../environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-new-estudiante',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    UppercaseDirective,
    UppercaseTwoDirective,
    UppercaseThreeDirective
  ],
  templateUrl: './new-estudiante.html',
  styleUrls: ['./new-estudiante.css']
})
export class NewEstudiante implements OnInit {

  estudianteFormGroup!: FormGroup;

  fotoFile?: File;
  fotoActual: string | null = null;
  preview: string | ArrayBuffer | null = null;

  esEdicion = false;

  imageHost = environment.imageHost;

  constructor(
    private fb: FormBuilder,
    private estudiantesService: EstudiantesService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();

    this.route.paramMap.subscribe(params => {
      const id = params.get('idEstudiante');
      if (id) {
        this.esEdicion = true;
        this.cargarEstudiantePorId(+id);
      }
    });
  }

  inicializarFormulario() {
    this.estudianteFormGroup = this.fb.group({
      idEstudiante: [null],
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      foto: ['', Validators.required],
      programaId: ['', Validators.required],
      domicilio: ['']
    });
  }

cargarEstudiantePorId(idEstudiante: number) {
  this.estudiantesService.buscarEstudiantePorId(idEstudiante).subscribe({
    next: (estudiante: Estudiante) => {
      this.estudianteFormGroup.patchValue(estudiante);

      if (estudiante.foto) {
        const nombreArchivo = estudiante.foto.startsWith('/uploads/') 
          ? estudiante.foto.substring(9) 
          : estudiante.foto;

        this.fotoActual = `${this.imageHost.replace(/\/$/, '')}/${nombreArchivo}`;
      }
    },
    error: () => {
      Swal.fire('Error', 'No se pudo cargar el estudiante', 'error');
      this.router.navigate(['/admin/estudiantes']);
    }
  });
}


  onFileSelected(event: any) {
    this.fotoFile = event.target.files[0];

    if (this.fotoFile) {
      const reader = new FileReader();
      reader.onload = () => this.preview = reader.result as string;
      reader.readAsDataURL(this.fotoFile);
    }
  }


  
  guardarEstudiante() {
    if (this.estudianteFormGroup.invalid) {
      Swal.fire('Formulario incompleto', 'Completa los campos requeridos', 'warning');
      return;
    }

    const estudiante = this.estudianteFormGroup.getRawValue();
    const formData = new FormData();

    formData.append('nombre', estudiante.nombre);
    formData.append('apellidoPaterno', estudiante.apellidoPaterno);
    formData.append('apellidoMaterno', estudiante.apellidoMaterno);
    formData.append('programaId', estudiante.programaId);
    formData.append('domicilio', estudiante.domicilio);

    if (this.fotoFile) {
      formData.append('foto', this.fotoFile);
    }

    if (this.esEdicion) {
      this.estudiantesService.editarEstudiante(estudiante.idEstudiante!, formData)
        .subscribe({
          next: () => {
            Swal.fire('Actualizado', 'Estudiante editado correctamente', 'success');
            this.location.back();
          },
          error: () => Swal.fire('Error', 'No se pudo editar', 'error')
        });
    } else {
      this.estudiantesService.agregarEstudiante(formData)
        .subscribe({
          next: () => {
            Swal.fire('Guardado', 'Estudiante registrado con éxito', 'success');
            this.location.back();
          },
          error: () => Swal.fire('Error', 'No se pudo guardar', 'error')
        });
    }
  }

  regresarPaginaAnterior() {
    this.location.back();
  }
}
