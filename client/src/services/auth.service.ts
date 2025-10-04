import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | null = null;

  saveToken(token: string) {
    this.token = token;
    try { localStorage.setItem('token', token); } catch {}
  }

  getToken(): string | null {
    if (!this.token) {
      try { this.token = localStorage.getItem('token'); } catch {}
    }
    return this.token;
  }
  SetRole(role: any) {
    localStorage.setItem('role', role);
  }
  get getRole(): string | null {
    return localStorage.getItem('role');
  }

  SetUsername(username: any) {
    localStorage.setItem('username', username);
  }
  get getUsername(): string | null {
    return localStorage.getItem('username');
  }
  logout() {
    try { localStorage.removeItem('token'); } catch {}
    this.token = null;
  }

  get getLoginStatus(): boolean {
    try { return !!localStorage.getItem('token'); } catch { return false; }
  }
}