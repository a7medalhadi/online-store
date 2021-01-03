import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemspinnerComponent } from './itemspinner.component';

describe('ItemspinnerComponent', () => {
  let component: ItemspinnerComponent;
  let fixture: ComponentFixture<ItemspinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemspinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
