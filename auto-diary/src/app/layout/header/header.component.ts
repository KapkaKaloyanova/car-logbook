import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CarService } from '../../core/services/car.service';
import { Car } from '../../shared/interfaces/car';
import { Subscription } from 'rxjs';
import { AlertService } from '../../core/services/alert.service';
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
  private alertService = inject(AlertService);

  isLoggedIn = this.authService.isLoggedIn;
  username = computed(() => this.authService.currentUser()?.username ?? '');
  alerts = signal<string[]>([]);

  isDropdownOpen = signal(false);
  isAlertsOpen = signal(false);

  userCars = signal<Car[]>([]);
  private subscription!: Subscription;



  toggleDropdown() {
    this.isDropdownOpen.update(val => !val);
  }
  alertToggleDropdown() {
    this.isAlertsOpen.update(val => !val);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }
  alertCloseDropdown() { 
    this.isAlertsOpen.set(false); } 

  logout() {
    this.authService.logout().subscribe({
      next: () => { this.router.navigate(['/home']) }
    })
  }

  ngOnInit(): void {
    // Абониране за router events и презареждане на userCars след всяка навигация
    this.subscription = this.router.events.subscribe(
      {
        next: event => {
          if (event instanceof NavigationEnd) {
            if (this.authService.isLoggedIn()) {
              this.carService.getCarsByOwner(this.authService.currentUser()!._id).subscribe(
                {
                  next: cars => {
                    this.userCars.set(cars);
                    this.alertService.getAlertsForAllCars(cars).subscribe(
                      {
                        next: alerts => this.alerts.set(alerts),
                        error: (err) => console.error('Грешка при получаване на известията:', err)
                      }
                    );
                  },
                  error: (err) => console.error('Грешка при получаване на автомобилите:', err)
                });
            };
          }
        },
        error: (err) => console.error('Грешка при получаване на router events:', err)
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  };

}
