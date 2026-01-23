import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIcon
           ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
  public loginForm!: FormGroup; //loginForm: Representa el formulario reactivo del login
  hide = signal(true);


  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }

  //se obtiene el usuario y la contraseña que proporcione el usuario
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: this.formBuilder.control(''),
      password: this.formBuilder.control('')
    });
  }


  login(): void {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    let auth: boolean = this.authService.login(username, password);//Se validan los parametros

    if (auth == true) {// si la authentificacion es exitosa manda al path de administrador
      this.router.navigateByUrl("/admin/home");
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}