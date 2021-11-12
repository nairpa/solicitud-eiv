import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, map } from 'rxjs';
import { Vendedor } from '../models/vendedore';
import { Localidad } from '../models/localidad';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class VendedorService {

  url = `http://localhost:8080/api`
  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(this.url + `/vendedores/todos`).pipe(
      catchError(this.handleError<Vendedor[]>('Obtener lista vendedores'))
    )
  }

  putVendedor(id: number, vendedor: Vendedor): Observable<Vendedor> {
    const url = `${this.url}/vendedores/${id}`
    return this.http.put<Vendedor>(url, vendedor, this.httpOptions).pipe(
      tap(_ => this.snackBar.open(`El vendedor con ${id} ha sido modificado con éxito`, '', {duration: 3000})),
      catchError(this.handleError<Vendedor>('Editar vendedor'))
    )
  }

  deleteVendedor(id: number): Observable<Vendedor> {
    const url = `${this.url}/vendedores/${id}`
    return this.http.delete<Vendedor>(url, this.httpOptions).pipe(
      tap(_ => this.snackBar.open(`El vendedor con id: ${id} ha sido eliminado con éxito`, '', {duration: 3000})),
      catchError(this.handleError<Vendedor>('Eliminar vendedor'))
    )
  }

  addVendedor(vendedor: Vendedor): Observable<Vendedor> {
    const url = `${this.url}/vendedores`
    return this.http.post<Vendedor>(url, vendedor, this.httpOptions).pipe(
      tap((newVendedor: Vendedor) => this.snackBar.open(`El vendedor con id: ${newVendedor.id} ha sido creado con éxito`, '', {duration: 3000})),
      catchError(this.handleError<Vendedor>('Agregar vendedor'))
    )
  }

  getLocalidades():Observable<Localidad[]> {
    const url = `${this.url}/localidades/todas`
    return this.http.get<Localidad[]>(url)
  }

  getImage(id: number):Observable<any> {
    const url = `${this.url}/vendedores/${id}/foto`
    return this.http.get(url, {responseType: 'blob'}).pipe(
      catchError(this.handleError<any>('Obtener imagen'))
    )
  }

  postImage(id: number, file: File):Observable<any> {
    const url = `${this.url}/vendedores/${id}/foto`
    const formData = new FormData();
    formData.append('file', file)

    return this.http.post<any>(url, formData).pipe(
      map((resp: any) => resp),
      tap(_ => this.snackBar.open('Foto subida con éxito','', {duration: 3000})),
      catchError(this.handleError<any>('Subir imagen'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return(error: any): Observable<T> => {
      this.snackBar.open(`${operation} falló: ${error.message}`)
      return of(result as T);
    }
  }
}
