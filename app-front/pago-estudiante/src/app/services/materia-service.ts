import { Injectable } from '@angular/core';
import { Materia } from '../models/estudiante.model';
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
}
