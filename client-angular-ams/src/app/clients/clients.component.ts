import { Observable } from 'rxjs';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit{

  clients: Client [] = [];

  formGroupClient : FormGroup;

  constructor (private ClientService: ClientService,
     private formBuilder: FormBuilder

    ){
       this.formGroupClient = formBuilder.group({

       });
    }
  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
   this.ClientService.getClients().subscribe( {
    next : data => this.clients = data
   });
  }


}
