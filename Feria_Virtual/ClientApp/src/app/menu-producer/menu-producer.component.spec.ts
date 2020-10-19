import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuProducerComponent } from './menu-producer.component';

describe('MenuProducerComponent', () => {
  let component: MenuProducerComponent;
  let fixture: ComponentFixture<MenuProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
