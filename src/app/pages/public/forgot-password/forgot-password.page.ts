import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/providers/auth.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  forgotPassowrdform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {}

  validationmessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ]
  };

  ngOnInit() {
    this.forgotPassowrdform = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])
      )
    });
  }

  async forgotPassword(form) {
    await this.storage.set('email', form.email);
    this.authService.forgotPassowrd(form).subscribe(res => {
      this.router.navigateByUrl('password-otp');
    });
  }
}
