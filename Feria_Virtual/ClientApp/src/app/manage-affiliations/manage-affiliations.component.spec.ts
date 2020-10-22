import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAffiliationsComponent } from './manage-affiliations.component';

describe('ManageAffiliationsComponent', () => {
  let component: ManageAffiliationsComponent;
  let fixture: ComponentFixture<ManageAffiliationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAffiliationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAffiliationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
