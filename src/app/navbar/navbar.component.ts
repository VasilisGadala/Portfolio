import { Component, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  activeSection: string = 'home';

  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.checkActiveSection();
  }

  checkActiveSection() {
    const sections = ['home', 'about', 'experience', 'projects'];
    const scrollPosition = window.scrollY;
    const offset = 100; // Adjust this value as needed

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop - offset;
        const offsetBottom = offsetTop + element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      let offset = 20; // Adjust this value to account for the navbar height
      let elementPosition: number;
      let offsetPosition: number;
      if (section == "about") {
        const childElement = element.querySelector('.about-content');
        if (childElement) {
          elementPosition = childElement.getBoundingClientRect().top;
        } else {
          elementPosition = 0
        }
      } else {
        elementPosition = element.getBoundingClientRect().top;
      }
      offsetPosition = elementPosition + window.pageYOffset - offset;


      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
