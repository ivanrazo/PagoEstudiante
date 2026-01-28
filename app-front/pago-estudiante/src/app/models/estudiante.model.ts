export interface Estudiante {
  idEstudiante: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  programaId: string;
  domicilio: string;
  pagos?: Pago[];
  foto: string;
  materias?: Materia[];
}

export interface Pago {
  idPago?: number;
  fecha: string;
  cantidad: number;
  type: 'EFECTIVO' | 'CHEQUE' | 'TRANSFERENCIA' | 'DEPOSITO';
  status: 'CREADO' | 'VALIDADO' | 'RECHAZADO';
  estudianteId?: number;
  estudiante?: {
    idEstudiante: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  };
}

export interface Materia {
  idMateria: number;
  nombreMateria: string;
  creditos: number;
  estudiantes?: Estudiante[];
  docentes?: Docente[];
  horarios?: Horario[];
}

export interface Docente {
  idDocente: number;
  nombreDocente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  foto: string;
  materias?: Materia[];
}

export interface Horario {
  idHorario: number;
  dia: string;
  horaInicio: string;
  horaFin: string;
  aula: string;
  materia?: Materia;
}

export interface CicloEscolar{
idCicloEscolar: number;
nombre: string;
activo: boolean;
estudiante?:Estudiante[];
}
