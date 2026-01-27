import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Estudiante, Materia } from '../models/estudiante.model';
import { MateriaService } from '../services/materia-service';
import { EstudiantesService } from '../services/estudiantes-service';
import { CommonModule, Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlynumbersDirective } from "../directives/onlynumbers.directive";
import { UppercaseDirective } from "../directives/uppercase.directive";
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from '../../environments/environment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UppercaseThreeDirective } from '../directives/uppercaseThree.directive';
import { UppercaseTwoDirective } from '../directives/uppercaseTwo.directive';

@Component({
  selector: 'app-new-materia',
  standalone: true,
  imports: [
    OnlynumbersDirective, 
    UppercaseDirective, 
    MatDividerModule, 
    MatTableModule, 
    MatFormFieldModule, 
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
    ReactiveFormsModule],
  templateUrl: './new-materia.html',
  styleUrl: './new-materia.css',
})
export class NewMateria implements OnInit{
materiaFormGroup!: FormGroup;

  esEdicion = false;

  imageHost = environment.imageHost;

  constructor(
    private fb: FormBuilder,
    private materiaService: MateriaService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();

    this.route.paramMap.subscribe(params => {
      const id = params.get('idMateria');
      if (id) {
        this.esEdicion = true;
        this.cargarMateriaPorId(+id);
      }
    });
  }

  inicializarFormulario() {
    this.materiaFormGroup = this.fb.group({
      idMateria: [null],
      nombreMateria: ['', Validators.required],
      creditos: ['', Validators.required]
    });
  }

  cargarMateriaPorId(idMateria: number) {
    this.materiaService.buscarMateriaPorId(idMateria).subscribe({
      next: (materia: Materia) => {
        this.materiaFormGroup.patchValue(materia);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la materia', 'error');
        this.router.navigate(['/admin/materias']);
      }
    });
  }

  guardarMateria() {
    if (this.materiaFormGroup.invalid) {
      Swal.fire('Formulario incompleto', 'Completa los campos requeridos', 'warning');
      return;
    }

    const materia = this.materiaFormGroup.getRawValue();
    const formData = new FormData();

    formData.append('nombreMateria', materia.nombreMateria);
    formData.append('creditos', materia.creditos);
  

    if (this.esEdicion) {
      this.materiaService.editarMateria(materia.idMateria!, formData)
        .subscribe({
          next: () => {
            Swal.fire('Actualizado', 'Materia editada correctamente', 'success');
            this.location.back();
          },
          error: () => Swal.fire('Error', 'No se pudo editar', 'error')
        });
    } else {
      this.materiaService.agregarMateria(formData)
        .subscribe({
          next: () => {
            Swal.fire('Guardado', 'Materia registrada con éxito', 'success');
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
