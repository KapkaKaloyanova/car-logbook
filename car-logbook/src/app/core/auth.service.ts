import { computed, inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { User } from './models/user';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authFirebase = inject(Auth);

  private currentUser = signal<User | null>(null);
  isLoggedIn = computed(() => this.currentUser() !== null);

  register(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.authFirebase, email, password));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(this.authFirebase, email, password));
  }

  logout(): Observable<void> {
    return from(signOut(this.authFirebase));
  }

}
