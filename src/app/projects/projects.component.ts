import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

interface Project {
  title: string;
  description: string;
  link?: string;
  backgroundImage?: string; // Optional property
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  projects: Project[] = [
    { 
      title: 'Personal Website',
      description: 'This website is written in Angular and hosted on GitHub Pages',
      link: 'https://github.com/VasilisGadala/PersonalWebsite',
      backgroundImage: '/assets/webpage.png'
    },
    { 
      title: 'AI Ant Simulator',
      description: 'Developed simulated ants with custom pheromone-based pathfinding. Used a genetic algorithm to optimize ant speed, size, and spawn rate within a colony',
      link: 'https://github.com/NathanMcGuire30/faux_formicidae',
      backgroundImage: '/assets/ai_ants.png'
    },
    { title: 'Photomosaic Generator',
       description: 'Built a C++ object-oriented program that constructs a mosaic of an image by loading 20k+ reference images and replacing subsections of the original image with the most similar reference image, determined by a custom pixel-comparison algorithm and AVL tree',
       link: 'https://github.com/Khoury-CS3520/23f-pa03-VasilisGadala',
       backgroundImage: '/assets/photomosaic.png'
    },
    { title: 'Housing Price Predictor',
       description: 'Designed program that compared 3 Machine Learning Models to predict Housing Prices in NYC within $250k. Performed tuning of ML Models and analyzed advantages of such models',
       link: 'https://github.com/VasilisGadala/NY_Housing_ML_Models',
       backgroundImage: '/assets/housing-predictor.png'
    },
    { title: 'Image Processor',
       description: 'Designed application capable of applying image filters through linear transformations. Implemented 14 operations to edit images, 2 involving image kernels. Developed visualization using Java Swing. Utilized design patterns for abstraction',
       link: 'https://github.com/VasilisGadala/Image_Processor',
       backgroundImage: '/assets/image-processing.png'
    },
    { title: 'Banner 2.0',
       description: 'Designed a MySQL database storing data similar to a college advising portal. Developed an application with a REST API and Flask to display a use-case of the database',
      link: 'https://github.com/VasilisGadala/Banner2.0',
      backgroundImage: '/assets/banner-project.png'
    },
    { title: 'Maze Generator/Solver',
       description: 'Built program that constructs and solves a maze, including visual representation of the traversal and solution. Implemented Kruskal’s algorithm in Java to create maze with a minimum spanning tree. Maze can be completed in depth first or breadth first search',
       backgroundImage: '/assets/maze-project.png'
    },
    { title: 'Graphics Engine',
      description: 'Developed a basic C++ graphic engine capable of loading, rendering, and manipulating 3D models. Additionally supports basic camera functionality through keyboard inputs',
      link: 'https://github.com/AdityaGupta03/GraphicsEngine',
      backgroundImage: '/assets/graphicsEngine.png'
    },
    { title: 'Audio Visualizer',
      description: 'Developed JavaScript application that displays frequencies of audio files, mapping them to a color spectrum. Developing audio reactive LEDs through Arduino control. Processing mp3 audio to frequency visualizer using JavaScript p5’s FFT library',
      link: 'https://github.com/VasilisGadala/AudioVisualizer',
      backgroundImage: '/assets/audio-processor.png'
    }
  ];

  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  private observer!: IntersectionObserver;
  private resizeSubscription!: Subscription;

  ngOnInit() {}

  /**
   * Determines the animation class based on the row index.
   * Even rows animate from the left, odd rows from the right.
   * @param index - The index of the project card.
   * @returns A string indicating the animation direction class.
   */
  getRowAnimationClass(index: number): string {
    let columns = 3; // Default number of columns

    if (window.innerWidth <= 480) {
      columns = 1; // Single column for extra small devices
    } else if (window.innerWidth <= 768) {
      columns = 1; // Single column for mobile devices
    } else if (window.innerWidth <= 1024) {
      columns = 2; // Two columns for tablets and small desktops
    }

    const row = Math.floor(index / columns);
    return row % 2 === 0 ? 'from-left' : 'from-right';
  }

  ngAfterViewInit() {
    const options = {
      root: null, // relative to the viewport
      rootMargin: '0px 0px -10% 0px', // Trigger 20% before the element enters the viewport
      threshold: 0// Trigger at 10% visibility
    };

    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          target.classList.add('visible');
          target.classList.remove('hidden');
        } else {
          target.classList.remove('visible');
          target.classList.add('hidden');
        }
      });
    };

    this.observer = new IntersectionObserver(callback, options);

    this.projectCards.forEach((card) => {
      this.observer.observe(card.nativeElement);
    });

    // Debounce window resize events
    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.onResize();
      });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }

  onResize() {
    // This method is called when the window is resized
    // You can add logic here to handle the resize event
  }
}
