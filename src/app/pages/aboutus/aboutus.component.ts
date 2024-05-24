import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
  title = 'About Us' //No define el valor 'About Us' del header
}
