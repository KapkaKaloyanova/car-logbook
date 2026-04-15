import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProfileComponent } from './features/user/profile/profile.component';
import { CarCatalogComponent } from './features/cars/car-catalog/car-catalog.component';
import { CarCreateComponent } from './features/cars/car-create/car-create.component';
import { CarDetailsComponent } from './features/cars/car-details/car-details.component';
import { CarEditComponent } from './features/cars/car-edit/car-edit.component';
import { CarAddFuelComponent } from './features/cars/car-add-fuel/car-add-fuel.component';
import { CarAddServiceComponent } from './features/cars/car-add-service/car-add-service.component';
import { CarAddDocumentComponent } from './features/cars/car-add-document/car-add-document.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },

    { path: 'user', component: ProfileComponent, canActivate: [authGuard] },

    { path: 'cars', component: CarCatalogComponent },
    { path: 'cars/create', component: CarCreateComponent, canActivate: [authGuard] },

    { path: 'cars/:id', component: CarDetailsComponent },
    { path: 'cars/:id/edit', component: CarEditComponent, canActivate: [authGuard] },
    { path: 'cars/:id/add-fuel', component: CarAddFuelComponent, canActivate: [authGuard] },
    { path: 'cars/:id/edit-fuel/:fuelId', component: CarAddFuelComponent, canActivate: [authGuard] },
    { path: 'cars/:id/add-service', component: CarAddServiceComponent, canActivate: [authGuard] },
    { path: 'cars/:id/edit-service/:serviceId', component: CarAddServiceComponent, canActivate: [authGuard] },
    { path: 'cars/:id/add-document', component: CarAddDocumentComponent, canActivate: [authGuard] },
    { path: 'cars/:id/edit-document/:documentId', component: CarAddDocumentComponent, canActivate: [authGuard] },

    { path: '**', component: NotFoundComponent }

];
