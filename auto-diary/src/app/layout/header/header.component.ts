import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../shared/interfaces/car';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private carService = inject(CarService);

  isLoggedIn = this.authService.isLoggedIn;
  username = computed(() => this.authService.currentUser()?.username ?? '');

  isDropdownOpen = signal(false);

  userCars = signal<Car[]>([]);

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

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.carService.getCarsByOwner(this.authService.currentUser()!._id).subscribe(cars => this.userCars.set(cars));
    }
  }

}
