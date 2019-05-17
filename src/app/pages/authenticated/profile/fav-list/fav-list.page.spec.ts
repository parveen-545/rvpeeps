import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavListPage } from './fav-list.page';

describe('FavListPage', () => {
  let component: FavListPage;
  let fixture: ComponentFixture<FavListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
