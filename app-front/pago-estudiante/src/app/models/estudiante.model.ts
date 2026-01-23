export interface Estudiante {
  idEstudiante: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  programaId: string;
  domicilio: string;
  horario: Date;
  pagos?: Pago[];
  foto: string;
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
  idMaterias: number;
  nombreMateria: string;
  creditos: number;
}

export interface Docente {
  idDocente: number;
  nombreDocente: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  email: string;
  foto: string;
  horario: Date;
}

