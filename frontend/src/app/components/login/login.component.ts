import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  baseUrl: string;
  errorMessage: string = '';
  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {
    this.baseUrl = this.apiService.getBaseUrl();
  }

  onSubmit() {
    const url = `${this.baseUrl}/user/login`;

    this.http.post<any>(url, { email: this.username, password: this.password })
      .subscribe(
        response => {
          localStorage.setItem('token', response.access_token);
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Login failed', error);
          if (error.status === 401) {
            this.errorMessage = 'Credenciais inválidas. Por favor, verifique seu email e senha.';
          } else {
            this.errorMessage = 'Erro ao tentar fazer login. Por favor, tente novamente mais tarde.';
          }
        }
      );
  }
}
