import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogRef } from '@angular/cdk/dialog';
import { StudentService } from '../../services/student.service';

//Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-studentlogin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './studentlogin.component.html',
  styleUrl: './studentlogin.component.css',
})
export class StudentloginComponent {
  email: string;
  password: string;
  studentId: any;

  constructor(
    private _authService: AuthService,
    private _dialogRef: DialogRef<StudentloginComponent>,
    private _studentService: StudentService
  ) {}

  loginStudent(): void {
    this._authService.login(this.email, this.password).subscribe({
      next: (tokenObject) => {
        this.studentId = tokenObject.studentId;
        this._studentService.studentId = tokenObject.studentId;
        this._dialogRef.close();
        this._studentService.studentEvent.emit();
      },
      error: (error) => {
        if (error.status === 401) {
          alert('Incorrect password');
        }
      },
    });
  }

  onCancel() {
    this._dialogRef.close();
  }
}
