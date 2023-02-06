import { Directive } from '@angular/core';
import {
  
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from "@angular/core";
@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective {

 constructor(private elementRef: ElementRef) { }

 @Output() public clickOutside = new EventEmitter<MouseEvent>();

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {
        if (!targetElement) return;
        const clickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) this.clickOutside.emit(event); 
    }

}
