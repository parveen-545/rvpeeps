import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/providers/auth.service';
import { PasswordValidator } from 'src/app/core/validators/password.validator';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss']
})
export class ResetPasswordPage implements OnInit {
  resetPasswordform: FormGroup;
  matchingPasswordsGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private storage: Storage
  ) {}
  validationmessages = {
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 5 characters long.'
      },
      {
        type: 'pattern',
        message:
          'Your password must contain at least one uppercase, one lowercase, and one number.'
      }
    ],
    confirm_password: [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    matching_passwords: [{ type: 'areEqual', message: 'Password mismatch.' }]
  };

  ngOnInit() {
    this.matchingPasswordsGroup = new FormGroup(
      {
        password: new FormControl(
          '',
          Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$'
            )
          ])
        ),
        confirm_password: new FormControl('', Validators.required)
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      }
    );

    this.resetPasswordform = this.formBuilder.group({
      matchingPasswords: this.matchingPasswordsGroup
    });
  }

  resetPassword(formValues) {
    this.storage.get('email').then(val => {
      let email = val;
      this.authService
        .updatePassword(formValues.matchingPasswords.password,email)
        .subscribe(res => {
          this.router.navigateByUrl('login');
        });
    });
  }
}
