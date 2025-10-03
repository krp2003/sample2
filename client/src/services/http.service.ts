import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = environment.apiUrl;
  
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.headers = this.createHeaders();
  }
  private createHeaders(): HttpHeaders {
    const authToken = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    if (authToken) {
      headers = headers.set('Authorization', `Bearer ${authToken}`);
    }
    return headers;
  }
 
  private getRequestOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }
  // ----------------- USER -----------------
  registerUser(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/register`, details);
  }
 
  login(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/login`, details, this.getRequestOptions());
  }
 
  // ----------------- INSTITUTION -----------------
  createEvent(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/institution/event`, details, this.getRequestOptions());
  }
 
  updateEvent(eventId: any, details: any): Observable<any> {
    return this.http.put(`${this.serverName}/api/institution/event/${eventId}`, details, this.getRequestOptions());
  }
 
  getEventByInstitutionId(institutionId: any): Observable<any> {
    return this.http.get(`${this.serverName}/api/institution/events?institutionId=${institutionId}`, this.getRequestOptions());
  }
 
  addResource(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/institution/event/${details.eventId}/resource`, details, this.getRequestOptions());
  }
 
  GetAllProfessionals(): Observable<any> {
    return this.http.get(`${this.serverName}/api/institution/event/professionals`, this.getRequestOptions());
  }
 
  assignProfessionals(eventId: any, userId: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/institution/event/${eventId}/professional?userId=${userId}`, {}, this.getRequestOptions());
  }
 
  // ----------------- PROFESSIONAL -----------------
  getEventByProfessional(userId: any): Observable<any> {
    return this.http.get(`${this.serverName}/api/professional/events?userId=${userId}`, this.getRequestOptions());
  }
 
  UpdateEventStatus(eventId: any, status: any): Observable<any> {
    return this.http.put(`${this.serverName}/api/professional/event/${eventId}/status?status=${status}`, {}, this.getRequestOptions());
  }
 
  AddFeedback(eventId: any, userId: any, details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/professional/event/${eventId}/feedback?userId=${userId}`, details, this.getRequestOptions());
  }
 
  // ----------------- PARTICIPANT -----------------
  GetAllevents(): Observable<any> {
    return this.http.get(`${this.serverName}/api/participant/events`, this.getRequestOptions());
  }
 
  viewAllEvents(): Observable<any> {
    return this.http.get(`${this.serverName}/api/participant/events`, this.getRequestOptions());
  }
 
  EnrollParticipant(eventId: any, userId: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/participant/event/${eventId}/enroll?userId=${userId}`, {}, this.getRequestOptions());
  }
 
  viewEventStatus(eventId: any): Observable<any> {
    return this.http.get(`${this.serverName}/api/participant/event/${eventId}/status`, this.getRequestOptions());
  }
 
  addFeedbackByParticipants(eventId: any, userId: any, details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/participant/event/${eventId}/feedback?userId=${userId}`, details, this.getRequestOptions());
  }
 
 
}
 