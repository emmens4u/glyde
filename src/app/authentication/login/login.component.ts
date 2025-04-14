import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LayoutComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('Form submitted:', loginForm.value);
      const { email, password } = loginForm.value;
      try {
        await this.authService.login(email, password);
        console.log('User logged in successfully');
        this.router.navigateByUrl('/dashboard');
      } catch (error) {
        console.error('Login error', error);
      }
    }
  }
}
