import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @Input() title = '';

}
