import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localidad';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {
  url:string = `http://localhost:8080/api`;

  constructor(private http: HttpClient) { }

  getLocalidades():Observable<Localidad[]> {
    const url = `${this.url}/localidades/todas`
    return this.http.get<Localidad[]>(url)
  }
}
