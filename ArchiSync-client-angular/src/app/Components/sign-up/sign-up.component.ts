import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Modules/User';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'; 
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../Services/UserService/user.service';
import { UserDetailsService } from '../../Services/userDetailsService/user-details.service';

@Component({
   standalone: true,
    selector: 'app-sign-up',
    imports: [ReactiveFormsModule,MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private userService: UserService,private router: Router,private dialogRef: MatDialogRef<SignUpComponent>,private user: UserDetailsService) {
}
  signUpForm = new FormGroup({
    UserName: new FormControl<string>('', [Validators.required]),
    Email: new FormControl<string>('', [Validators.required]),
    PasswordHash: new FormControl<string>('', [Validators.required]),
    RoleName: new FormControl<string>('', [Validators.required])
  });
    private closeDialogAndNavigate() {
      this.dialogRef.close();
      setTimeout(() => this.router.navigate(['/home']), 100);
    }
  
  signUp() {
    if (this.signUpForm.valid)
    {
      console.log(this.signUpForm.value);
      this.userService.signUp(this.signUpForm.value as Partial<User>).subscribe({
        next: (response:Partial<User>) => {
          console.log(response);
          this.user.setUser(response);
          this.closeDialogAndNavigate();
         
        },
        error: (err) => {
          alert(err);
          console.log(err);

        }
      });
    }
}
}