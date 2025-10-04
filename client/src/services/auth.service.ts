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
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isRole(role: string): boolean {
    return this.getRole() === role;
  }
  hasAnyRole(...roles: string[]): boolean {
    const current = this.getRole();
    return current ? roles.includes(current): false;
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

  getLoginStatus(): boolean {
    try { return !!localStorage.getItem('token'); } catch { return false; }
  }
}