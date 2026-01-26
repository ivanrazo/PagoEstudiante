import { Component, OnInit } from '@angular/core';
import { Estudiante, Materia } from '../models/estudiante.model';
import { MateriaService } from '../services/materia-service';
import { EstudiantesService } from '../services/estudiantes-service';

@Component({
  selector: 'app-new-materia',
  imports: [],
  templateUrl: './new-materia.html',
  styleUrl: './new-materia.css',
})
export class NewMateria implements OnInit{
estudiantesDataSource = new MatTableDataSource<Estudiante>([]);
  displayedColumns: string[] = ['idEstudiante', 'nombreEstudiante', 'apellidoPaterno', 'apellidoMaterno'];

  idMateria!: number;
  nombreMateria: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private materiaService: MateriaService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private estudianteService: EstudiantesService
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.params['idMateria'];
    if (idParam) {
      this.idMateria = +idParam;
      this.cargarEstudiantesDeMateria();
    }
  }

  ngAfterViewInit(): void {
    this.estudiantesDataSource.paginator = this.paginator;
    this.estudiantesDataSource.sort = this.sort;
  }

  cargarEstudiantesDeMateria(): void {
    this.materiaService.buscarMateriaPorId(this.idMateria).subscribe({
      next: (materia) => {
        this.nombreMateria = materia.nombreMateria;
        this.cdr.detectChanges();
      },
      error: () => this.nombreMateria = ''
    });

    this.materiaService.listarEstudiantesDeMateria({ idMateria: this.idMateria } as Materia)
      .subscribe({
        next: (estudiante) => {
          this.estudiantesDataSource.data = estudiante;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cargar pagos', err)
      });
  }


  eliminarEstudiante(idPago: number): void {
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

  agregarEstudiante(): void {
    this.router.navigate(['/admin/new-', this.idEstudiante]);
  }

  regresarPaginaAnterior(): void {
    this.location.back();
  }
}
