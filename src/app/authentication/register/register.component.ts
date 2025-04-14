import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [LayoutComponent, FormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  fullname = '';
  email = '';
  password = '';
  confirmPassword = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

   async onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      console.log('Form submitted:', registerForm.value);
      const { email, password } = registerForm.value;
      try {
        await this.authService.register(email, password);
        console.log('User registered successfully');
        this.router.navigateByUrl('/login');
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  }
}
