import { Injectable } from '@angular/core';
import { Docente, Materia } from '../models/estudiante.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DocenteService {
  constructor(private http: HttpClient) { }

  listarDocentes(): Observable<Docente[]> {
    return this.http.get<Array<Docente>>(`${environment.backendHost}/docentes`);
  }

  buscarDocentePorId(idDocente: number): Observable<Docente> {
    return this.http.get<Docente>(`${environment.backendHost}/docentes/${idDocente}`);
  }

  agregarDocente(formData: FormData): Observable<Docente> {
    return this.http.post<Docente>(`${environment.backendHost}/docentes`, formData);
  }

  editarDocente(idDocente: number, formData: FormData): Observable<Docente> {
    return this.http.put<Docente>(`${environment.backendHost}/docentes/${idDocente}`, formData);
  }

  asignarMaterias(idDocente: number, idMateria: number): Observable<Docente> {
    return this.http.post<Docente>(
      `${environment.backendHost}/docentes/${idDocente}/materias/${idMateria}`,
      {} // body vacío porque el backend no necesita datos adicionales
    );
  }

  eliminarDocente(idDocente: number): Observable<void> {
    return this.http.delete<void>(`${environment.backendHost}/docentes/${idDocente}`);
  }

  listarMateriasDelDocente(docente: Docente): Observable<Materia[]> {
    return this.http.get<Array<Materia>>(`${environment.backendHost}/docentes/${docente.idDocente}/materias`);
  }

  asignarMateria(idDocente: number, idMateria: number): Observable<Docente> {
    return this.http.post<Docente>(`${environment.backendHost}/${idDocente}/materias/${idMateria}`,
      {}
    );
  }
}
