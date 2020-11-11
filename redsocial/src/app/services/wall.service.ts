import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WallService {

  readonly URL_API = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) { }

  getWall(){
    return this.http.get<any>(this.URL_API + '/wall');
  }

}
