import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/estudiante.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private baseUrl = `${environment.backendHost}/pagos`;

  constructor(private http: HttpClient) { }

  listarPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.baseUrl);
  }

  guardarPago(idEstudiante: number, pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(`${environment.backendHost}/estudiantes/${idEstudiante}/pagos`, pago);
  }

  editarPago(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.baseUrl}/${pago.idPago}`, pago);
  }

  eliminarPago(idPago: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idPago}`);
  }

  getPagoById(idPago: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.baseUrl}/${idPago}`);
  }
}
