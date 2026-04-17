import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, User, UserLogin, UserRegister } from '../../shared/interfaces/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:3030/users';

  private user = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  isLoggedIn = computed(() => this.user() !== null);
  currentUser = computed(() => this.user());

  login(credentials: UserLogin): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((resp) => this.setSession(resp))
      )
  };

  register(credentials: UserRegister): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/register`, credentials)
      .pipe(
        tap((resp) => this.setSession(resp))
      );
  };

  logout(): Observable<void> {
    return this.httpClient.get<void>(`${this.apiUrl}/logout`)
      .pipe(
        tap(() => this.clearSession())
      );
  };

  setSession(response: AuthResponse) {
    const { accessToken, ...userData } = response; // отделяме accessToken и userData от response
    localStorage.setItem('accessToken', accessToken); // записваме accessToken за interceptor-a
    localStorage.setItem('user', JSON.stringify(userData)); // записваме userData като стринг за refresh на страницата
    this.user.set(userData); // обновяваме сигнала с чистите данни
  }

  clearSession() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    this.user.set(null);
  }

  updateProfile(userId: string, userData: Partial<User>): Observable<void> {
    return this.httpClient.put<void>(`${this.apiUrl}/${userId}`, userData);
  }

  updateUser(userData: Partial<User>) {
    const updated = {
      ...this.user()!,
      ...userData
    };
    localStorage.setItem('user', JSON.stringify(updated));
    this.user.set(updated);

  }
}


