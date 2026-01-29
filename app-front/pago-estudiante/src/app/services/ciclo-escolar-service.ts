import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CicloEscolar } from '../models/estudiante.model';

@Injectable({
  providedIn: 'root',
})
export class CicloEscolarService {
  private baseUrl = 'http://localhost:8080/api/ciclos';

  constructor(private http: HttpClient) { }

  listarCiclos(): Observable<CicloEscolar[]> {
    return this.http.get<CicloEscolar[]>(this.baseUrl);
  }

  obtenerCiclo(id: number): Observable<CicloEscolar> {
    return this.http.get<CicloEscolar>(`${this.baseUrl}/${id}`);
  }

  agregarCiclo(ciclo: CicloEscolar): Observable<CicloEscolar> {
    const params = new URLSearchParams();
    params.set('nombre', ciclo.nombre);
    params.set('activo', ciclo.activo.toString());
    return this.http.post<CicloEscolar>(`${this.baseUrl}?${params.toString()}`, {});
  }

  editarCiclo(ciclo: CicloEscolar): Observable<CicloEscolar> {
    const params = new URLSearchParams();
    params.set('nombre', ciclo.nombre);
    params.set('activo', ciclo.activo.toString());
    return this.http.put<CicloEscolar>(`${this.baseUrl}/${ciclo.idCicloEscolar}?${params.toString()}`, {});
  }

  eliminarCiclo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
