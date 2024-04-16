import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { StudentService } from '../../services/student.service';
import { DialogRef } from '@angular/cdk/dialog';

//Material imports
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-studentregistration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './studentregistration.component.html',
  styleUrl: './studentregistration.component.css',
})
export class StudentregistrationComponent implements OnInit {
  studentRegistrationForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _dialogRef: DialogRef<StudentregistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.studentRegistrationForm = this.createFormGroup();
    this.studentRegistrationForm.patchValue(this.data);
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      age: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  registerStudent(): void {
    if (this.data) {
      this._authService
        .updateStudent(this.data.id, this.studentRegistrationForm.value)
        .subscribe({
          next: (res) => {
            alert('Student updated');
            this._dialogRef.close();
            this._studentService.studentEvent.emit();
          },
          error: (error) => {
            console.log(error);
            this._dialogRef.close();
          },
        });
    } else {
      this._authService.register(this.studentRegistrationForm.value).subscribe({
        next: (res) => {
          alert('Student registered');
          this._dialogRef.close();
          this._studentService.studentEvent.emit();
        },
        error: (error) => {
          if (error.status === 409) {
            alert('Email already registered');
          }
          this._dialogRef.close();
        },
      });
    }
  }

  onCancel() {
    this._dialogRef.close();
  }
}
