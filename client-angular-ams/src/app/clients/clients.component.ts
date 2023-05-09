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
export class ClientsComponent implements OnInit {


  clients: Client[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;

  constructor(private ClientService: ClientService,
    private formBuilder: FormBuilder

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      email: ['']
    });
  }
  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.ClientService.getClients().subscribe({
      next: data => this.clients = data
    });
  }

  save() {
    if (this.isEditing) {
      this.ClientService.update(this.formGroupClient.value).subscribe(
        {
          next: () => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;
          }

        }
      );
    }
    else {
      this.ClientService.save(this.formGroupClient.value).subscribe(
        {
          next: data => {
            this.clients.push(data)
            this.formGroupClient.reset();

          }
        }
      );
    }
  }

  edit(client: Client) {
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }

  delete(client: Client) {
    this.ClientService.delete(client).subscribe(
      {
        next: () => this.loadClients()
      }
    );
  }

}
