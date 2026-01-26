import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Docente } from '../models/estudiante.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../environments/environment.development';
import { DocenteService } from '../services/docente-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { UppercaseDirective } from '../directives/uppercase.directive';
import { UppercaseThreeDirective } from '../directives/uppercaseThree.directive';
import { UppercaseTwoDirective } from '../directives/uppercaseTwo.directive';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-docente',
  standalone: true,
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
    UppercaseDirective
  ],
  templateUrl: './new-docente.html',
  styleUrl: './new-docente.css',
})
export class NewDocente implements OnInit {

  docenteFormGroup!: FormGroup;

  fotoFile?: File;
  fotoActual: string | null = null;
  preview: string | ArrayBuffer | null = null;

  esEdicion = false;

  imageHost = environment.imageHost;

  constructor(
    private fb: FormBuilder,
    private docenteService: DocenteService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();

    this.route.paramMap.subscribe(params => {
      const id = params.get('idDocente');
      if (id) {
        this.esEdicion = true;
        this.cargarDocentePorId(+id);
      }
    });
  }

  inicializarFormulario() {
    this.docenteFormGroup = this.fb.group({
      idDocente: [null],
      nombreDocente: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      foto: [''],
      email: ['', Validators.required]
    });
  }

  cargarDocentePorId(idDocente: number) {
    this.docenteService.buscarDocentePorId(idDocente).subscribe({
      next: (docente: Docente) => {
        this.docenteFormGroup.patchValue(docente);

        if (docente.foto) {
          const nombreArchivo = docente.foto.startsWith('/uploads/')
            ? docente.foto.substring(9)
            : docente.foto;

          this.fotoActual = `${this.imageHost.replace(/\/$/, '')}/${nombreArchivo}`;
        }
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar el docente', 'error');
        this.router.navigate(['/admin/docentes']);
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

  guardarDocente() {
    if (this.docenteFormGroup.invalid) {
      Swal.fire('Formulario incompleto', 'Completa los campos requeridos', 'warning');
      return;
    }

    const docente = this.docenteFormGroup.getRawValue();
    const formData = new FormData();

    formData.append('nombreDocente', docente.nombreDocente);
    formData.append('apellidoPaterno', docente.apellidoPaterno);
    formData.append('apellidoMaterno', docente.apellidoMaterno);
    formData.append('email', docente.email);

    if (this.fotoFile) {
      formData.append('foto', this.fotoFile);
    }

    if (this.esEdicion) {
      this.docenteService.editarDocente(docente.idDocente!, formData)
        .subscribe({
          next: () => {
            Swal.fire('Actualizado', 'Docente editado correctamente', 'success');
            this.location.back();
          },
          error: () => Swal.fire('Error', 'No se pudo editar', 'error')
        });
    } else {
      this.docenteService.agregarDocente(formData)
        .subscribe({
          next: () => {
            Swal.fire('Guardado', 'Docente registrado con éxito', 'success');
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