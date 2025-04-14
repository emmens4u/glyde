import { Injectable, signal, Signal } from '@angular/core';
import {
  Auth,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  user,
  User,
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly user$: Signal<User | null> = signal(null);

  constructor(private readonly firebase_auth: Auth) {
    this.setPrivateSessionStorage();
    this.user$ = toSignal(user(this.firebase_auth), { initialValue: null });
  }
  private setPrivateSessionStorage(): void {
    setPersistence(this.firebase_auth, browserSessionPersistence);
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.firebase_auth, email, password);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  }

  public async register(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.firebase_auth, email, password);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error; 
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.firebase_auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error; // Rethrow the error for further handling if needed
    }
  }

  getCurrentuser(): Signal<User | null> {
    return this.user$;
  }

  isLoggedIn(): boolean {
    return this.user$() !== null;
  }
}
