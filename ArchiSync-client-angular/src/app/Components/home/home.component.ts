import { Component } from '@angular/core';

import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HighlightDirective } from '../../Directives/Highlight.directive';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet,RouterLinkActive,RouterLink,HighlightDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
