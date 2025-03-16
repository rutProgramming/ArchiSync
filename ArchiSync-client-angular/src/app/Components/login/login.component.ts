import { Component } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Modules/User';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'; 
import { UserService } from '../../Services/UserService/user.service';
import { UserDetailsService } from '../../Services/userDetailsService/user-details.service';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [ReactiveFormsModule,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule,MatButtonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router,private dialogRef: MatDialogRef<LoginComponent>,private user:UserDetailsService) {
  }
  signInForm = new FormGroup({
    Password: new FormControl<string>('', [Validators.required]),
    UserName: new FormControl<string>('', [Validators.required])
  });
  
  private closeDialogAndNavigate() {
    this.dialogRef.close();
    setTimeout(() => this.router.navigate(['/home']), 100);
  }
  signIn() {
    if (this.signInForm.valid)
    {
      this.userService.signIn(this.signInForm.value as Partial<User>).subscribe({
        next: (response) => {
          this.user.setUser(response);
          this.closeDialogAndNavigate();
        },
        error: (err) => {
          alert("can't sign in");
        }
      });
    }
}}

