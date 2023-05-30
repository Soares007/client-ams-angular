import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Client } from '../client';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnChanges {
  @Input()
  client: Client = {} as Client;

  @Output()
  saveEvent = new EventEmitter<Client>();
  @Output()
  cleanEvent = new EventEmitter<void>();

 formGroupClient: FormGroup;
 submitted: boolean = false;
  constructor(private formBuilder: FormBuilder

  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupClient.setValue(this.client);
  }

  save() {
    this.submitted = true;
    if (this.formGroupClient.valid) {
      this.saveEvent.emit(this.formGroupClient.value);
      this.formGroupClient.reset();
      this.submitted = false;
    }
  }

  limparDados() {
    this.cleanEvent.emit();
    this.formGroupClient.reset();
    this.submitted = false;
  }

  get name(): any {
    return this.formGroupClient.get("name");
  }
  get email(): any {
    return this.formGroupClient.get("email");
  }
}
