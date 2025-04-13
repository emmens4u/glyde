import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import {
  FormsModule,
  NgForm,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LayoutComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
email = '';
password = '';
 
  onSubmit(loginForm: NgForm): void {
   if (loginForm.valid) {
      console.log('Form submitted:', loginForm.value);
    }
  }
}
