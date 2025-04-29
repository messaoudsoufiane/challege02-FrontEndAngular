import { Routes } from '@angular/router';
import { LoginComponent } from './auth/auth-components/login/login.component';
import { SignupComponent } from './auth/auth-components/signup/signup.component';

export const routes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
      title: 'Login Page',
    },
    {
      path: 'register',
      component: SignupComponent,
      title: 'Register Page',
    },
    {
      path: 'admin',
      loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
      title: 'Admin Dashboard',
    },
    {
      path: 'customer',
      loadChildren: () => import('./modules/costumer/costumer.module').then((m) => m.CostumerModule),
      title: 'Customer Dashboard',
    },
    
    {
      path: '',
      redirectTo: '/login', // Redirection par défaut vers la page de login
      pathMatch: 'full',
    }
   
  ];