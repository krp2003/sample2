import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-event-status',
  templateUrl: './update-event-status.component.html',
  styleUrls: ['./update-event-status.component.scss']
})
export class UpdateEventStatusComponent implements OnInit {
  /**
   * Reactive form for updating event status. Contains eventId and status.
   */
  itemForm!: FormGroup;

  /**
   * List of events to choose from.
   */
  events: any[] = [];

  /**
   * Allowed status values for an event. Adjust these as necessary to match
   * your backend.
   */
  statuses: string[] = ['Not Started', 'Ongoing', 'Completed', 'Cancelled'];

  /** Success and error messages for UI feedback */
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private httpService: HttpService, private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize form controls with validators
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      status: ['', Validators.required]
    });

    // Load events (for simplicity we fetch by institution ID; change as needed)
    this.httpService.getEventByInstitutionId(localStorage.getItem('userId')).subscribe({
      next: (res: any) => (this.events = res || []),
      error: () => (this.errorMessage = 'Failed to load events')
    });
  }

  /**
   * Submit the updated status to the backend. If successful, display a success
   * message; otherwise display an error message.
   */
  submit(): void {
    if (this.itemForm.invalid) {
      this.errorMessage = 'Please select an event and status.';
      this.successMessage = '';
      return;
    }
    const { eventId, status } = this.itemForm.value;
    this.httpService.UpdateEventStatus(eventId, status).subscribe({
      next: () => {
        this.successMessage = 'Event status updated successfully.';
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Failed to update event status.';
        this.successMessage = '';
      }
    });
  }
}