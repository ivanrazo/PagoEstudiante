export interface Estudiante {
  idEstudiante: number; 
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  programaId: string;
  domicilio: string;
  pagos?: Pago[];
  foto: string;
}

export interface Pago {
  idPago?: number;
  fecha: string; 
  cantidad: number;
  type: 'EFECTIVO' | 'CHEQUE' | 'TRANSFERENCIA' | 'DEPOSITO';
  status: 'CREADO' | 'VALIDADO' | 'RECHAZADO';
  estudianteId ?: number;
  estudiante ?: {
    idEstudiante: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
  };
}

