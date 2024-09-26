import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import ScrollReveal from 'scrollreveal';

interface Skill {
  name: string;
  logo: string;
}

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skills-container">
      <div class="skills-wall">
        <div *ngFor="let row of skillRows; let rowIndex = index" class="skill-row">
          <div *ngIf="rowIndex % 2 === 0" class="skill-box spacer"></div>
          <div *ngFor="let skill of row" class="skill-box">
            <img [src]="skill.logo" [alt]="skill.name + ' logo'" class="skill-logo">
            <span class="skill-text">{{ skill.name }}</span>
          </div>
          <div *ngIf="rowIndex % 2 !== 0" class="skill-box spacer"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .skills-container {
      min-height: 100vh;
      background-color: black;
      padding: 2rem;
      box-sizing: border-box;
    }
    .skills-title {
      font-size: 2.5rem;
      font-weight: bold;
      color: white;
      margin-bottom: 2rem;
      text-align: center;
    }
    .skills-wall {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
    }
    .skill-row {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 1rem;
    }
    .skill-box {
      background-color: #241714;
      padding: 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: calc(20% - 1rem);
      margin: 0 0.5rem;
      transition: all 0.3s ease;
    }
    .skill-box.spacer {
      background-color: transparent;
      box-shadow: none;
      width: calc(10% - 0.5rem);
    }
    .skill-box:not(.spacer):hover {
      transform: scale(1.05);
      filter: brightness(1.2);
    }
    .skill-logo {
      width: 50px;
      height: 50px;
      margin-bottom: 0.5rem;
    }
    .skill-text {
      color: white;
      font-size: 1rem;
      font-weight: 600;
      text-align: center;
    }
    @media (max-width: 1200px) {
      .skill-box {
        width: calc(25% - 1rem);
      }
      .skill-box.spacer {
        width: calc(12.5% - 0.5rem);
      }
    }
    @media (max-width: 768px) {
      .skills-wall {
        flex-direction: column;
      }
      .skill-row {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-bottom: 0;
      }
      .skill-box {
        width: calc(50% - 1rem);
        margin: 0.5rem;
      }
      .skill-box.spacer {
        display: none;
      }
    }
    @media (max-width: 480px) {
      .skill-box {
        width: calc(50% - 0.5rem);
        margin: 0.25rem;
      }
    }
  `]
})
export class SkillsPageComponent implements OnInit, AfterViewInit {
  skills: Skill[] = [
    { name: "Java", logo: "/assets/logos/java-svgrepo-com.svg" },
    { name: "Python", logo: "/assets/logos/python-svgrepo-com.svg" },
    { name: "C++", logo: "/assets/logos/c-plus-plus-svgrepo-com.svg" },
    { name: "TypeScript", logo: "/assets/logos/typescript-svgrepo-com.svg" },
    { name: "JavaScript", logo: "/assets/logos/javascript-svgrepo-com.svg" },
    { name: "SQL", logo: "/assets/logos/sql-svgrepo-com.svg" },
    { name: "HTML", logo: "/assets/logos/html-5-svgrepo-com.svg" },
    { name: "CSS", logo: "/assets/logos/css-3-svgrepo-com.svg" },
    { name: "Git", logo: "/assets/logos/git-svgrepo-com.svg" },
    { name: "Docker", logo: "/assets/logos/docker-svgrepo-com.svg" },
    { name: "Angular", logo: "/assets/logos/angular-svgrepo-com.svg" },
    { name: "React", logo: "/assets/logos/react-svgrepo-com.svg" }
  ];

  skillRows: Skill[][] = [];

  constructor() {
    this.skillRows = this.chunkArray(this.skills, 4);
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    ScrollReveal().reveal('.skill-box:not(.spacer)', {
      delay: 100,
      distance: '50px',
      origin: 'left',
      interval: 100,
      duration: 2000, // Increased duration for slower animation
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      reset: true, // This makes the animation repeat every time the element enters the viewport
      viewFactor: 0.2 // This triggers the animation when 20% of the element is in view
    });
  }

  chunkArray(array: Skill[], size: number): Skill[][] {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }
}