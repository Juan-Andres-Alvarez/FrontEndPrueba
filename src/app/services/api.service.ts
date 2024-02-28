import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }

  apiGet(path:string, queryParams?: string){
    const url = queryParams? `${this.apiUrl}/${path}?${queryParams}` : `${this.apiUrl}/${path}`;
    return this._http.get(url);
  }

  apiDelete(path:string, id:number){
    return this._http.delete(`${this.apiUrl}/${path}/${id}`);
  }

}
