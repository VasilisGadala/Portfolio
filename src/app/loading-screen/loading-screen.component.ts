import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [@loadingAnimation]="animationState" class="loading-screen">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <g *ngFor="let index of [0, 1, 2]">
          <path
            [attr.d]="'M 100 100 m 0 -' + (70 - index * 20) + ' a ' + (70 - index * 20) + ' ' + (70 - index * 20) + ' 0 1 0 0 ' + (2 * (70 - index * 20)) + ' a ' + (70 - index * 20) + ' ' + (70 - index * 20) + ' 0 1 0 0 -' + (2 * (70 - index * 20))"
            [attr.stroke]="['#111111', '#222222', '#333333'][index]"
            [attr.stroke-width]="[12, 10, 8][index]"
            stroke-linecap="round"
            fill="none"
          >
            <animate
              attributeName="stroke-dasharray"
              [attr.values]="'0 ' + (2 * Math.PI * (70 - index * 20)) + ';' + (2 * Math.PI * (70 - index * 20)) + ' 0'"
              [attr.dur]="0.5 + index * 0.2 + 's'"
              repeatCount="1"
              fill="freeze"
            />
          </path>
        </g>
      </svg>
    </div>
  `,
  styles: [`
    .loading-screen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
      z-index: 9999;
    }
  `],
  animations: [
    trigger('loadingAnimation', [
      state('initial', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'scale(1)'
      })),
      transition('zoomed => hidden', [
        animate('0.2s ease-out')
      ])
    ])
  ]
})
export class LoadingScreenComponent implements OnInit, OnDestroy {
  @Output() loadingComplete = new EventEmitter<void>();

  animationState: 'initial' | 'zoomed' | 'hidden' = 'initial';
  private zoomTimer: any;
  private hideTimer: any;
  Math = Math;

  ngOnInit() {
    this.zoomTimer = setTimeout(() => {
      this.animationState = 'zoomed';
      this.hideTimer = setTimeout(() => {
        this.animationState = 'hidden';
        setTimeout(() => {
          this.loadingComplete.emit();
        }, 100); // Emit event slightly after hiding animation
      }, 300);
    }, 1000);
  }

  ngOnDestroy() {
    if (this.zoomTimer) {
      clearTimeout(this.zoomTimer);
    }
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
    }
  }
}