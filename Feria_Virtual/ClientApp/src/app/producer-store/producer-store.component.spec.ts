import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerStoreComponent } from './producer-store.component';

describe('ProducerStoreComponent', () => {
  let component: ProducerStoreComponent;
  let fixture: ComponentFixture<ProducerStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
