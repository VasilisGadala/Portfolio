import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Function to prevent zooming
function preventZoom(e: TouchEvent) {
  if (e.touches.length > 1) {
    e.preventDefault();
  }
}

// Function to reset zoom
function resetZoom() {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, minimum-scale=0.7, maximum-scale=1.2, user-scalable=no');
  }
}

// Add event listeners
document.addEventListener('touchstart', preventZoom, { passive: false });
document.addEventListener('touchmove', preventZoom, { passive: false });
window.addEventListener('resize', resetZoom);

// Initial reset
resetZoom();

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule)
  ]
}).catch(err => console.error(err));
