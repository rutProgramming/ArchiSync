import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { LoginComponent } from '../login/login.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-connect',
  imports: [MatCardModule,MatDialogModule,MatButtonModule,MatDividerModule, MatIconModule],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.css'
})
export class ConnectComponent {
  private dialog = inject(MatDialog); 
  SignUp() {
    this.dialog.open(SignUpComponent);
  }
  SignIn() {
    this.dialog.open(LoginComponent);
  }
}
