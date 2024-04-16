import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  studentId: any
  constructor() {}
  studentEvent = new EventEmitter<any>();
}
