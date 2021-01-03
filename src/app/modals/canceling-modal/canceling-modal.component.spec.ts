import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelingModalComponent } from './canceling-modal.component';

describe('CancelingModalComponent', () => {
  let component: CancelingModalComponent;
  let fixture: ComponentFixture<CancelingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
