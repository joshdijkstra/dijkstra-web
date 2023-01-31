import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SphericalGeometryComponent } from './spherical-geometry.component';

describe('SphericalGeometryComponent', () => {
  let component: SphericalGeometryComponent;
  let fixture: ComponentFixture<SphericalGeometryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SphericalGeometryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SphericalGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
