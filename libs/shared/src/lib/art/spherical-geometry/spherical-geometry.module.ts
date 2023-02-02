import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SphericalGeometryComponent } from './spherical-geometry.component';

@NgModule({
  declarations: [SphericalGeometryComponent],
  imports: [CommonModule],
  exports: [SphericalGeometryComponent],
})
export class SphericalGeometryModule {}
