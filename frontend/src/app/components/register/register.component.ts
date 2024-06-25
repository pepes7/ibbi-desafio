import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/utils/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) {}

  onSubmit() {
    const url = `${this.apiService.getBaseUrl()}/user/register`;

    this.http.post<any>(url, { name: this.name, email: this.email, password: this.password })
      .subscribe(
        response => {
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 400) {
            this.errorMessage = 'Usuário já existe com este email. Por favor, escolha outro email.';
          } else {
            this.errorMessage = 'Erro ao tentar cadastrar. Por favor, tente novamente mais tarde.';
          }
        }
      );
  }
}
