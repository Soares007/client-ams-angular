import { Observable } from 'rxjs';
import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {


  clients: Client[] = [];
  constructor(private ClientService: ClientService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: data => this.clients = data
    });
  }
  create() {
    this.router.navigate(['createClient']);
  }

  edit(client: Client) {
    this.router.navigate(['clientDetails', client.id]);
  }

  delete(client: Client) {
    this.ClientService.delete(client).subscribe(
      {
        next: () => this.loadClients()
      }
    );
  }

}
