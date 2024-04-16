import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentloginComponent } from './components/studentlogin/studentlogin.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    StudentloginComponent,
    NavigationComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent { }
