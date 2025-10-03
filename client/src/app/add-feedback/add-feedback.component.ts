import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss'],
  providers: [DatePipe]
})
export class AddFeedbackComponent implements OnInit {
  /**
   * FormGroup representing the feedback form. Includes fields for eventId,
   * rating (1–5), comments, and date. Form controls are initialized in
   * ngOnInit.
   */
  itemForm!: FormGroup;

  /**
   * List of available events to choose from. Populated on component
   * initialization by calling the backend via HttpService.
   */
  events: any[] = [];

  /**
   * Message shown to the user when feedback submission succeeds.
   */
  successMessage = '';

  /**
   * Message shown to the user when an error occurs while loading events or
   * submitting feedback.
   */
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties of a directive
   * are initialized. Initializes the feedback form and loads the list of
   * events from the backend.
   */
  ngOnInit(): void {
    // Initialize the reactive form with default values and validators
    this.itemForm = this.fb.group({
      eventId: [null, Validators.required],
      rating: [null, [Validators.required, Validators.min(1), Validators.max(5)]],
      comments: ['', Validators.required],
      date: [this.datePipe.transform(new Date(), 'yyyy-MM-dd')]
    });

    // Load the list of events. For simplicity, we fetch all events for
    // institution ID 1, but this could be replaced with a more specific
    // endpoint if available.
    this.httpService.getEventByInstitutionId(1).subscribe({
      next: (res: any) => (this.events = res || []),
      error: () => (this.errorMessage = 'Failed to load events')
    });
  }

  /**
   * Handles submission of the feedback form. Validates the form, retrieves
   * the current user ID, and calls the backend service to persist the
   * feedback. Displays appropriate success or error messages based on the
   * outcome.
   */
  submit(): void {
    // Validate the form before submission
    if (this.itemForm.invalid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      this.successMessage = '';
      return;
    }

    // Retrieve the user ID from local storage (set during authentication)
    const userId = localStorage.getItem('userId');
    if (!userId) {
      this.errorMessage = 'User not logged in.';
      this.successMessage = '';
      return;
    }

    const { eventId, rating, comments, date } = this.itemForm.value;
    const payload = { rating, comments, date };

    // Call the backend to add feedback. We use the participant-specific
    // endpoint here; if the role is professional, you could swap this for
    // AddFeedback instead.
    this.httpService.addFeedbackByParticipants(eventId, userId, payload).subscribe({
      next: () => {
        this.successMessage = 'Feedback submitted successfully.';
        this.errorMessage = '';
        // Reset the form while retaining the date default
        this.itemForm.reset();
        this.itemForm.patchValue({ date: this.datePipe.transform(new Date(), 'yyyy-MM-dd') });
      },
      error: () => {
        this.errorMessage = 'Failed to submit feedback.';
        this.successMessage = '';
      }
    });
  }
}