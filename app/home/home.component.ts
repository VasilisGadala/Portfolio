import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1000ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('1000ms ease-in-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  skills: string[] = ['Fullstack Engineer', 'Continuous Learner', 'Java Enthusiast'];
  currentSkill: string | null = null;
  currentIndex: number = 0;

  ngOnInit() {
    this.nextSkill();
  }

  nextSkill() {
    this.currentSkill = null;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.skills.length;
      this.currentSkill = this.skills[this.currentIndex];
    }, 0);

    setTimeout(() => this.nextSkill(), 5000);
  }
}
