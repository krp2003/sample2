import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  itemForm!: FormGroup;
  events: any[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private httpService: HttpService) { }

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      type: [undefined, Validators.required],
      description: [undefined, Validators.required],
      availabilityStatus: [null, Validators.required]
    });
    this.itemForm.patchValue({
      type: undefined,
      description: undefined
    })
    this.loadEvents();
  }

  loadEvents() {
    this.httpService.getEventByInstitutionId(1).subscribe({
      next: (res) => (this.events = res),
      error: () => (this.errorMessage = 'Failed to load events')
    });
  }

  submit() {
    if (this.itemForm.invalid) return;

    this.httpService.addResource(this.itemForm.value).subscribe({
      next: () => (this.successMessage = 'Resource added successfully'),
      error: () => (this.errorMessage = 'Failed to add resource')
    });
  }
}