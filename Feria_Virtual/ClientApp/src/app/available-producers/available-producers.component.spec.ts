import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableProducersComponent } from './available-producers.component';

describe('AvailableProducersComponent', () => {
  let component: AvailableProducersComponent;
  let fixture: ComponentFixture<AvailableProducersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableProducersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
