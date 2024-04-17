import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StudentregistrationComponent } from '../studentregistration/studentregistration.component';
import { StudentService } from '../../services/student.service';

//Material imports
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-studentlist',
  standalone: true,
  imports: [StudentregistrationComponent, MatTableModule, MatButtonModule],
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.css',
})
export class StudentlistComponent implements OnInit {
  studentList: any;
  studentId: any;
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'phone', 'email', 'actions'];

  constructor(
    private _authService: AuthService,
    private _dialogRef: MatDialog,
    private _studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudentList();
    this.studentId = this._studentService.studentId;
    this._studentService.studentEvent.subscribe({
      next: () => {
        this.getStudentList();
      },
    });
  }

  getStudentList() {
    this.studentId = this._studentService.studentId;
    this._authService.getStudentList().subscribe({
      next: (res) => {
        this.studentList = res.data;
      },
      error: console.log,
    });
  }

  editProfile(data: any) {
    this._dialogRef.open(StudentregistrationComponent, {
      data,
    });
  }

  deleteStudent(id: any) {
    this._authService.deleteStudent(id).subscribe({
      next: (res) => {
        alert('Student deleted');
        this._studentService.studentId = null;
        this.studentId = null;
        this._studentService.studentEvent.emit();
      },
      error: console.log,
    });
  }
}
