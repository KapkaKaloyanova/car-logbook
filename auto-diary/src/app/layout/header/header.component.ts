import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../shared/interfaces/car';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);
  private carService = inject(CarService);

  isLoggedIn = this.authService.isLoggedIn;
  username = computed(() => this.authService.currentUser()?.username ?? '');

  isDropdownOpen = signal(false);

  userCars = signal<Car[]>([]);
  private subscription!: Subscription;


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
    // Абониране за router events и презареждане на userCars след всяка навигация
    this.subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.authService.isLoggedIn()) {
          this.carService.getCarsByOwner(this.authService.currentUser()!._id)
            .subscribe(cars => this.userCars.set(cars));
        }
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
