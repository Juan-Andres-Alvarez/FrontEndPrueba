import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'request',
        loadComponent: () => import('./pages/log-request/log-request.component').then(m => m.LogRequestComponent)
    },
    {
        path: 'albums',
        loadComponent: () => import('./pages/albums/albums.component').then(m => m.AlbumsComponent)
    },
    { path: '**', redirectTo: '/home' }
];
