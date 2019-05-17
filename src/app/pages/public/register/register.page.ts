import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/providers/auth.service';
import { Router } from '@angular/router';
import { PasswordValidator } from '../../../core/validators/password.validator';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userform: FormGroup;
  matching_passwords_group: FormGroup;

  constructor( public formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  validationmessages = {
    'first_name': [
      { type: 'required', message: 'First name is required.' }
    ],
    'last_name': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ]
  };
  ngOnInit() {
    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });


    this.userform = this.formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group
    });
  }

  register(form) {
    const user: any = {
                  first_name: form.first_name,
                  last_name: form.last_name,
                  email: form.email,
                  password: form.matching_passwords.password
                };
    this.authService.register(user).subscribe((res) => {
      this.router.navigateByUrl('login');
    });
  }

}
