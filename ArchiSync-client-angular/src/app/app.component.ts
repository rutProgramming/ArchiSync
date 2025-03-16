import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
    selector: 'app-root',
    imports: [RouterOutlet,MatDialogModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'courses';
}
