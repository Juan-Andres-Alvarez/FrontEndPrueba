import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav'
import { ToolbarComponent } from './include/toolbar/toolbar.component';
import { NavigationEnd, Route, Router, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { filter } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    ToolbarComponent,
    HttpClientModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  @ViewChild('sidenav') sidenav!: MatSidenav;

  menu = [
    { name: 'Home', link: '/home' },
    { name: 'Peticiones', link: '/request' },
    { name: 'Álbumes', link: '/albums' }
  ];

  constructor(private router: Router){
    this.router.events
    .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
    .subscribe((evt: NavigationEnd) => {
      this.close()
    });
  }

  close() {
    this.sidenav.close();
  }
}
