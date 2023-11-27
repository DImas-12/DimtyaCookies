import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  constructor(private router: Router, private authService: AuthService) {}
  hide = true;
  ngOnInit(): void {
    this.FormGroup();
  }
  FormGroup() {
    this.LoginForm = new FormGroup({
      identifier: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(null, Validators.required),
    });
  }
  get identifier() {
    return this.LoginForm.get('identifier') as FormControl;
  }
  getErrorMessage() {
    if (this.identifier.hasError('required')) {
      return 'You must enter a value';
    }

    return this.identifier.hasError('identifier') ? 'Not a valid email' : '';
  }
  Home() {
    this.router.navigate(['home']);
  }
  Login() {
    console.log('form login', this.LoginForm.value);

    const tmp = {
      identifier: 'admin@gmail.com',
      password: 'admin123',
    };
    this.authService
      .loginUser(tmp)
      // .loginUser(this.LoginForm.value)
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe(
        (response: any) => {
          console.log('response 33', response);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email dan Password Salah!',
          });
        }
      );
  }
}
