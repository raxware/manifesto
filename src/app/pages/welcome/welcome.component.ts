import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [HeaderComponent, LoginComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})

export class WelcomeComponent {

  constructor(){
  }


}

