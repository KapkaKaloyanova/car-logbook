import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CarService } from '../../../core/services/car.service';
import { CarCardComponent } from '../../cars/components/car-card/car-card.component';
import { Car } from '../../../shared/interfaces/car';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [CarCardComponent, RouterLink, ReactiveFormsModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  private authService = inject(AuthService);
  private carService = inject(CarService);

  currentUser = this.authService.currentUser;
  cars = signal<Car[]>([]);

  isEditing = signal(false);

  userProfileForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    this.carService.getCarsByOwner(this.currentUser()!._id).subscribe(car => this.cars.set(car));

    this.userProfileForm.patchValue({
      username: this.currentUser()?.username,
      email: this.currentUser()?.email,
      tel: this.currentUser()?.tel
    });
  }

  onSubmit() {
    if (this.userProfileForm.invalid) {
      return;
    }
    const userData = this.userProfileForm.value as Partial<User>;

    this.authService.updateProfile(this.currentUser()!._id, userData).subscribe({
      next: () =>{
        this.authService.updateUser(userData);
        this.isEditing.set(false);
      }
    })
    }
  }



