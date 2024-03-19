import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { trigger, transition, style, animate } from '@angular/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule // Importa BrowserAnimationsModule aquí si no lo has hecho antes
  ],
  exports: [],
  providers: []
})
export class AnimacionesModule { }

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    animate('500ms', style({ opacity: 0 })),
  ]),
]);

export const transformacionAnimacion = trigger('transformacionAnimacion', [
    transition(':enter', [
      style({ transform: 'scale(0.5)', opacity: 0 }),
      animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 })),
    ]),
    transition(':leave', [
      style({ transform: 'scale(1)', opacity: 1 }),
      animate('500ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 })),
    ]),
  ]);
