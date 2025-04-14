import { Component, inject, signal, Signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  user: Signal<null | User> = signal(null);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  constructor() {
    this.user = this.authService.getCurrentuser();
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login');
      this.toastr.success('User logged out successfully');
    } catch (error: string | any) {
      this.toastr.error('Error logging out', 'Please try again later', error);
    }
  }
}
