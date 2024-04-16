import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StudentloginComponent } from '../studentlogin/studentlogin.component';
import { StudentregistrationComponent } from '../studentregistration/studentregistration.component';
import { StudentService } from '../../services/student.service';

//Material Imports
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})

export class NavigationComponent {
  studentId: any

  constructor(private _dialogRef: MatDialog, private _studentService: StudentService) {}
  ngOnInit(): void {
    this._studentService.studentEvent.subscribe({
      next: () => {this.studentId = this._studentService.studentId}
    })
  }

  openLoginLogoutForm() {
    if(!this.studentId) {
      this._dialogRef.open(StudentloginComponent);
    } else {
      this._studentService.studentId = null
      this.studentId = null
      this._studentService.studentEvent.emit()
    }
  }

  openRegistrationForm() {
    this._dialogRef.open(StudentregistrationComponent);
  }
}
