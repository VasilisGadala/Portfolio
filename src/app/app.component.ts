import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent} from "./home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import {TriangleGridComponent} from "./triangle-grid/triangle-grid.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, NavbarComponent, TriangleGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Portfolio';
}
