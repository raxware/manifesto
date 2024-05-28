import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {

    const user = await this.authService.register(this.credentials.value);

    if (user) {
      this.router.navigateByUrl('/private/home', { replaceUrl: true });
    } else {
      console.log('Registration failed', 'Please try again!');
    }
  }

  async login() {

    const user = await this.authService.login(this.credentials.value);

    if (user) {
      console.log('User', user);
      this.router.navigateByUrl('/private/home', { replaceUrl: true });
    } else {
      console.log('Login failed', 'Please try again!');
    }
  }

}