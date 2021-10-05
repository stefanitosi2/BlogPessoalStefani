import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tema } from 'src/app/model/tema';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<tema[]>{
    return this.http.get<tema[]>('https://backendblogpessoal.herokuapp.com/tema', this.token)

  }

  getByIdTema(id: number): Observable<tema>{
    return this.http.get<tema>(`https://backendblogpessoal.herokuapp.com/tema/${id}`, this.token)

  }

  postTema(tema: tema): Observable<tema>{
    return this.http.post<tema>('https://backendblogpessoal.herokuapp.com/tema', tema, this.token)

  }

  putTema(tema: tema): Observable<tema>{
    return this.http.put<tema>('https://backendblogpessoal.herokuapp.com/tema', tema, this.token)

  }

  deletetema(id: number){
    return this.http.delete(`https://backendblogpessoal.herokuapp.com/tema/${id}`, this.token)

  }



}
