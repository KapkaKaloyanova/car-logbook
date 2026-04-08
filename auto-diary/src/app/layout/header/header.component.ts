import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
// import { CarService } from '../../core/services/car.service'; // Бъдещия carService
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
   router = inject(Router);
   authService = inject(AuthService);
  // carService = inject(CarService); // Тук ще взимаме колите

  isLoggedIn = this.authService.isLoggedIn;
  username = computed(() => this.authService.currentUser()?.username ?? '');

  isDropdownOpen = signal(false);

  // Засега правим примерен списък, докато вържем бекенда
  userCars = signal([
    { id: '1', brand: 'BMW', model: '320d' },
    { id: '2', brand: 'Opel', model: 'Astra' }
  ]);

  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => { this.router.navigate(['/home']) }
    })
  }


}
