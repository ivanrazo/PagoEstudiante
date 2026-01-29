import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Horario } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
   private baseUrl = 'http://localhost:8080/api/horarios';

  constructor(private http: HttpClient) { }

  listarHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.baseUrl);
  }

  obtenerHorario(id: number): Observable<Horario> {
    return this.http.get<Horario>(`${this.baseUrl}/${id}`);
  }

  agregarHorario(horario: Horario): Observable<Horario> {
    const params = new URLSearchParams();
    params.set('dia', horario.dia);
    params.set('horaInicio', horario.horaInicio);
    params.set('horaFin', horario.horaFin);
    params.set('aula', horario.aula);
    params.set('idMateria', horario.materia.idMateria!.toString());

    return this.http.post<Horario>(`${this.baseUrl}?${params.toString()}`, {});
  }

  editarHorario(horario: Horario): Observable<Horario> {
    const params = new URLSearchParams();
    params.set('dia', horario.dia);
    params.set('horaInicio', horario.horaInicio);
    params.set('horaFin', horario.horaFin);
    params.set('aula', horario.aula);
    params.set('idMateria', horario.materia.idMateria!.toString());

    return this.http.put<Horario>(`${this.baseUrl}/${horario.idHorario}?${params.toString()}`, {});
  }

  eliminarHorario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
