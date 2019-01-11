import { Injectable } from '@angular/core';
import { Warehouse } from '../models/warehouse';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class warehousesService {

  private warehousesRootApiUrl = `${environment.api_url}/api/warehousess`;
  private searchwarehousesApiUrl = this.warehousesRootApiUrl + "/search?=";

  constructor(
    private http: HttpClient,
    public snackBar: MatSnackBar) { }

  // Get an array of warehousess
  public getwarehousess() {
    return this.http.get<Warehouse[]>(this.warehousesRootApiUrl)
      .pipe(catchError(this.handleError<Warehouse[]>('getwarehousess')));
  }

  //Get a single warehouses by id
  public getwarehouses(id): Observable<Warehouse> {
    return this.http.get<Warehouse>(`${this.warehousesRootApiUrl}/${id}`)
      .pipe(catchError(this.handleError<Warehouse>('getwarehouses')));
  }

   // Add an warehouses
   addwarehouses(warehouses): Observable<Warehouse> {
    return this.http.post<Warehouse>(this.warehousesRootApiUrl, warehouses)
    .pipe(catchError(this.handleError<Warehouse>('addwarehouses')));
  }

   // Edit an warehouses
   editwarehouses(id): Observable<Warehouse> {
    console.log(id);
    return this.http.put<Warehouse>(this.warehousesRootApiUrl, id)
    .pipe(catchError(this.handleError<Warehouse>('editwarehouses')));
  }
  
  // Delete an warehouses  
  deletewarehouses(id): Observable<Warehouse> {
    console.log(id);
    return this.http.delete<Warehouse>(`${this.warehousesRootApiUrl}?id=${id}`)
    .pipe(catchError(this.handleError<Warehouse>('deletewarehouses')));
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.log(JSON.stringify(error.error));
      this.showErrorMessage(JSON.stringify(error.error));
      return throwError(error || 'generic backend error');
  }
}

  showErrorMessage(msg) {
    let snackBarRef = this.snackBar.open(msg, 'Undo');
    console.log(snackBarRef);
  }
}