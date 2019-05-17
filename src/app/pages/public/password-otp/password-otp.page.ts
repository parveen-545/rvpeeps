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
  selector: 'app-password-otp',
  templateUrl: './password-otp.page.html',
  styleUrls: ['./password-otp.page.scss']
})
export class PasswordOtpPage implements OnInit {
  error: string;
  otpform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private  storage: Storage,
  ) {}
  validationmessages = {
    otp: [{ type: 'required', message: 'OTP is required.' }]
  };

  ngOnInit() {
    this.otpform = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  submitOTP(formvalue) {
    this.storage.get('email').then(val => {
      let email = val;
      this.authService.sendOtp(formvalue.otp, email).subscribe(
        res => {
          this.router.navigateByUrl('reset-password');
        },
        error => {
          console.log(error);
          this.error = 'The username or password is incorrect. Try again. ';
        }
      );
    });
  }
}
