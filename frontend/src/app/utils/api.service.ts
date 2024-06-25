import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8000';

  constructor() { }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
