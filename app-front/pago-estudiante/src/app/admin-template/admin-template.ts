import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone:true,
  selector: 'app-admin-template',
  imports: [
    CommonModule,          
    RouterLink,            
    RouterOutlet,          
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './admin-template.html',
  styleUrl: './admin-template.css',
})
export class AdminTemplate {
constructor(public authService: AuthService){//inyecta el servicio de authService para tener acceso almetodo de cerrar sesion

  }
  logout(){
    this.authService.logout();
  }
}
