import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

getClients(): Observable<Client[]> {
  let url = "http://localhost:3000/clients";
  return this.http.get<Client[]>(url);
}

}
