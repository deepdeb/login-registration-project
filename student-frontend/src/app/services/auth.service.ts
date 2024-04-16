import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3600/auth';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient
  ) {}

  register(student: any): Observable<any> {
    return this.http.post<any>(`${this.url}/register`, student, this.httpOptions)
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password }, this.httpOptions);
  }

  getStudentList(): Observable<any> {
    return this.http.get(`${this.url}/studentList`);
  }

  deleteStudent(id: any): Observable<any> {
    return this.http.delete(`${this.url}/students/${id}`);
  }

  updateStudent(id: any, data: any): Observable<any> {
    return this.http.put(`${this.url}/students/${id}`, data);
  }
}
