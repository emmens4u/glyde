import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
  private readonly toastr = inject(ToastrService);

  async onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;
      try {
        await this.authService.login(email, password);
        this.toastr.success('Login Successful', 'Welcome back!');
        this.router.navigateByUrl('/dashboard');
      } catch (error:string | any) {
        this.toastr.error('Login Failed', 'Invalid email or password', error);
      }
    }
  }
}
