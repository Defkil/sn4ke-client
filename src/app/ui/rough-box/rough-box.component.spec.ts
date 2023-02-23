import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoughBoxComponent } from './rough-box.component';

describe('RoughBoxComponent', () => {
  let component: RoughBoxComponent;
  let fixture: ComponentFixture<RoughBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoughBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoughBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
