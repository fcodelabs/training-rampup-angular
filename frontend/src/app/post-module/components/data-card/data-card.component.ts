import { Component, Input } from '@angular/core';
import { environment } from "src/environments/environment"; 

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
})
export class DataCardComponent {
  @Input() title: any;
  @Input() description: any;
  @Input() username: any;
   isExpanded = false;
  public cardSrc: string = environment.cardSrc;
}
