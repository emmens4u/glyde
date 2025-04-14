import { Component, inject } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import {
  FormBuilder,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { passwordMatchValidator } from '../Validators/passwordMatchValidator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  registerForm = this.fb.group({
    fullName: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required,]],
  }, {
    validators: passwordMatchValidator,});

  async onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      if (email && password) {
        try {
          await this.authService.register(email, password);
          this.toastr.success('Registration Successful', 'Welcome!');
          this.router.navigateByUrl('/login');
        } catch (error: string | any) {
          this.toastr.error('Registration Failed', error);
        }
      }
    }
  }
}
