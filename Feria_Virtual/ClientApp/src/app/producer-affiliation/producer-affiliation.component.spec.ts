import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerAffiliationComponent } from './producer-affiliation.component';

describe('ProducerAffiliationComponent', () => {
  let component: ProducerAffiliationComponent;
  let fixture: ComponentFixture<ProducerAffiliationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducerAffiliationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducerAffiliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
