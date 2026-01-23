import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante, Pago } from '../models/estudiante.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EstudiantesService {

  constructor(private http: HttpClient) { }

  listarEstudiantes(): Observable<Estudiante[]> {
    return this.http.get<Array<Estudiante>>(`${environment.backendHost}/estudiantes`);
  }

  buscarEstudiantePorId(idEstudiante: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${environment.backendHost}/estudiantes/${idEstudiante}`);
  }

  agregarEstudiante(formData: FormData): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${environment.backendHost}/estudiantes`, formData);
  }

  editarEstudiante(idEstudiante: number, formData: FormData): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${environment.backendHost}/estudiantes/${idEstudiante}`, formData);
  }

  eliminarEstudiante(idEstudiante: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/estudiantes/${idEstudiante}`);
  }

  listarPagosDeEstudiante(estudiante: Estudiante): Observable<Pago[]> {
    return this.http.get<Array<Pago>>(`${environment.backendHost}/estudiantes/${estudiante.idEstudiante}/pagos`);
  }
}
