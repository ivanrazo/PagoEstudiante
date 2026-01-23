import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MatCardModule,CommonModule,MatDividerModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
