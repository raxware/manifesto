import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output () outputtingUserEmail = new EventEmitter<string>();

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
    this.userWitness(this.credentials);
  }

  async login() {

    const user = await this.authService.login(this.credentials.value);

    if (user) {
      this.router.navigateByUrl('/private/home', { replaceUrl: true });
    } else {
      console.log('Login failed', 'Please try again!');
    }
    this.userWitness(this.credentials);
  }

  userWitness(credentials: any){
    const userEmail = credentials.value.email;
    this.outputtingUserEmail.emit(userEmail);
    console.log('valor emitido: ', userEmail);
  }

}
