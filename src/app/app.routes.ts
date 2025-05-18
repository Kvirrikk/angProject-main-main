import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {
        path: "home",
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
     },
     {
        path: "main",
        loadComponent: () => import('./main/main.component').then(m => m.MainComponent)
     },
     {
        path: "about",
        loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent)
     },
     {
        path: "contact",
        loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent)
     },
     {  path: "register",
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent)
     },
     {  path: "logIn",
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
     }

];
