import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  Home() {
    this.router.navigate(['home']);
  }
  Login() {
    const tmp = {
      identifier: 'admin@gmail.com',
      password: 'admin123',
    };
    this.authService
      .loginUser(tmp)
      .pipe(
        finalize(() => {
          console.log('done');
        })
      )
      .subscribe((response: any) => {
        console.log('response 33', response);
        this.router.navigate(['/home']);
      });
  }
}
