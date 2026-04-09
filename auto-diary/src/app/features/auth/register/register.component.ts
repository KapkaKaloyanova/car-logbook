import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router , RouterLink} from '@angular/router';
import { UserRegister } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rePassword: new FormControl('', [Validators.required]),
  },{
    validators: this.passwordMatchValidator
  });

  // Валидатор за съвпадение на паролите
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { passwordMismatch: true };
  }
  onSubmit() {
    if(this.registerForm.invalid) { return; }
    
    // Премахване на полето rePassword за да не се изпраща към authService
    const { rePassword, ...registerData } = this.registerForm.value;

    this.authService.register(registerData as UserRegister).subscribe({
      next: () => { this.router.navigate(['/home']) }
    })
  }

}
