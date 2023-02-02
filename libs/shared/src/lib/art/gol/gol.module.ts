import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GolComponent } from './gol.component';

@NgModule({
  declarations: [GolComponent],
  imports: [CommonModule],
  exports: [GolComponent],
})
export class GolModule {}
