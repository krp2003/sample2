import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  itemForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: [undefined, [Validators.required]],
      schedule: [undefined, [Validators.required]],
      location: [undefined, [Validators.required]],
      status: [undefined, [Validators.required]],
      description: [undefined, [Validators.required]],
      institutionId: [null]
    });

    this.itemForm.patchValue({
      title:undefined,
      schedule:undefined,
      location:undefined,
      description:undefined,
      institutionId:null
    })
  }
  
  submit() {
    if (this.itemForm.invalid) return;

    this.httpService.createEvent(this.itemForm.value).subscribe({
      next: () => (this.successMessage = 'Event created successfully'),
      error: () => (this.errorMessage = 'Failed to create event')
    });
  }
}