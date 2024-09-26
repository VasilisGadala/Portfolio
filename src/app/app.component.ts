import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { TriangleGridComponent } from './triangle-grid/triangle-grid.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from "./about/about.component";
import { SkillsPageComponent } from './skills-page/skills-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoadingScreenComponent,
    TriangleGridComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    SkillsPageComponent
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = true;

  onLoadingComplete() {
    this.isLoading = false;
  }
}
