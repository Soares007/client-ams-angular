import { ClientService } from './../client.service';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  formGroupClient: FormGroup;
  submitted: boolean = false;
  isEditing: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private ClientService: ClientService,
    private route: ActivatedRoute,
    private router: Router

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.getClientbyId(id);
  }
  getClientbyId(id: number) {
    this.ClientService.getClient(id).subscribe({
      next: data => {
        this.formGroupClient.setValue(data);
        this.isEditing = true;
      }
    })
  }

  save() {
    this.submitted = true;
    if (this.formGroupClient.valid) {
      if (this.isEditing) {
        this.ClientService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
      else {
        this.ClientService.save(this.formGroupClient.value).subscribe({
          next: () => {
            this.router.navigate(['clients']);
          }
        })
      }
    }
  }
  cancel() {
    this.router.navigate(['clients']);
  }

  get name(): any {
    return this.formGroupClient.get("name");
  }
  get email(): any {
    return this.formGroupClient.get("email");
  }
}
