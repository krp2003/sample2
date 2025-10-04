import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm!:FormGroup;
  errorMessage='';

  constructor(private fb:FormBuilder, private httpService: HttpService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if(this.itemForm.invalid) {
      return;
    }
    this.httpService.login(this.itemForm.value).subscribe({
      next: (res) => {this.authService.saveToken(res.token);
        console.log(res.token);
                      if(res.userId) {
                        localStorage.setItem('userId', res.userId.toString());
                        localStorage.setItem('role', res.role);
                      }
                      this.router.navigateByUrl("/dashboard")},
      error: () => (this.errorMessage = 'Invalid username or password'),
    });
  }
}