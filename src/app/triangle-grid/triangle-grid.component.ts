import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Renderer2, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-triangle-grid',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <canvas #canvas class="fixed inset-0 w-full h-full"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
    }
  `]
})
export class TriangleGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private triangles: { x: number; y: number; rotation: number; targetRotation: number }[] = [];
  private triangleSize = 20;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setupCanvas();
    this.createTriangles();
  }

  ngOnDestroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private setupCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.renderer.setAttribute(canvas, 'width', window.innerWidth.toString());
    this.renderer.setAttribute(canvas, 'height', window.innerHeight.toString());
  }

  private createTriangles() {
    const cols = Math.ceil(window.innerWidth / this.triangleSize);
    const rows = Math.ceil(window.innerHeight / this.triangleSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.triangles.push({
          x: i * this.triangleSize,
          y: j * this.triangleSize,
          rotation: 0,
          targetRotation: 0,
        });
      }
    }
  }

  private drawTriangle(x: number, y: number, size: number, rotation: number) {
    this.ctx.save();
    this.ctx.translate(x + size / 2, y + size / 2);
    this.ctx.rotate(rotation);
    this.ctx.beginPath();
    this.ctx.moveTo(-size / 2, size / 2);
    this.ctx.lineTo(0, -size / 2);
    this.ctx.lineTo(size / 2, size / 2);
    this.ctx.closePath();
    this.ctx.fillStyle = '#241714';
    this.ctx.fill();
    this.ctx.restore();
  }

  private drawVignette() {
    const canvas = this.canvasRef.nativeElement;
    const gradient = this.ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      Math.max(canvas.width, canvas.height) / 2
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.triangles.forEach((triangle) => {
      triangle.rotation += (triangle.targetRotation - triangle.rotation) * 0.1;
      this.drawTriangle(triangle.x, triangle.y, this.triangleSize, triangle.rotation);
    });

    this.drawVignette();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  onMouseMove(event: MouseEvent) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    this.triangles.forEach((triangle) => {
      const dx = mouseX - (triangle.x + this.triangleSize / 2);
      const dy = mouseY - (triangle.y + this.triangleSize / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.triangleSize * 2) {
        triangle.targetRotation = Math.PI;
      } else {
        triangle.targetRotation = 0;
      }
    });
  }

  onResize() {
    const canvas = this.canvasRef.nativeElement;
    this.renderer.setAttribute(canvas, 'width', window.innerWidth.toString());
    this.renderer.setAttribute(canvas, 'height', window.innerHeight.toString());
    this.triangles = [];
    this.createTriangles();
  }

  ngAfterViewInit() {
    this.animate();
    this.renderer.listen('window', 'mousemove', (event) => this.onMouseMove(event));
    this.renderer.listen('window', 'resize', () => this.onResize());
  }
}
