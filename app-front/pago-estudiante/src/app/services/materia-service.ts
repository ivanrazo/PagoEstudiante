import { Injectable } from '@angular/core';
import { Docente, Estudiante, Materia } from '../models/estudiante.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {

  private baseUrl = `${environment.backendHost}/materias`;

  constructor(private http: HttpClient) { }

  listarMaterias(): Observable<Materia[]> {
    return this.http.get<Materia[]>(this.baseUrl);
  }

  buscarMateriaPorId(idMateria: number): Observable<Materia> {
      return this.http.get<Materia>(`${environment.backendHost}/materias/${idMateria}`);
    }
  
    agregarMateria(formData: FormData): Observable<Materia> {
      return this.http.post<Materia>(`${environment.backendHost}/materias`, formData);
    }
  
    editarMateria(idMateria: number, formData: FormData): Observable<Materia> {
      return this.http.put<Materia>(`${environment.backendHost}/materias/${idMateria}`, formData);
    }
  
    eliminarMateria(idMateria: number): Observable<void> {
      return this.http.delete<void>(`${environment.backendHost}/materias/${idMateria}`);
    }
  
    listarDocentesDeMateria(materia: Materia): Observable<Docente[]> {
      return this.http.get<Array<Docente>>(`${environment.backendHost}/materias/${materia.idMateria}/docentes`);
    }

    listarEstudiantesDeMateria(materia: Materia): Observable<Estudiante[]> {
      return this.http.get<Array<Estudiante>>(`${environment.backendHost}/materias/${materia.idMateria}/estudiantes`);
    }
}
