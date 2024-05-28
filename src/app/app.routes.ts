import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { EditComponent } from './pages/edit/edit.component';
import { LoginComponent } from './pages/login/login.component';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['welcome']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['private/home']);

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'private', ...canActivate(redirectUnauthorizedToLogin), children: [
        { path: 'home', component: HomeComponent },
        { path: 'aboutus', component: AboutusComponent },
        { path: 'edit/:id', component: EditComponent },
    ]},
    { path: '**', redirectTo: 'welcome' }
];

/*
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['private/home']);

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome) },
    { path: 'private', ...canActivate(redirectUnauthorizedToLogin), children: [
        { path: 'home', component: HomeComponent },
        { path: 'aboutus', component: AboutusComponent },
        { path: 'edit/:id', component: EditComponent },
    ]},
    { path: '**', redirectTo: 'login' }
];

*/