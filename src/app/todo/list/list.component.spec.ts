import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TodoDataStoreService, TodoItem } from '../shared';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storeService: TodoDataStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [TodoDataStoreService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    storeService = TestBed.inject(TodoDataStoreService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load items', () => {
      spyOn(storeService, 'getItems').and.returnValue(of([]));
      component.ngOnInit();
      expect(storeService.getItems).toHaveBeenCalled();
    });
  });

  describe('onFormSubmit', () => {
    const mockItem: TodoItem = {
      id: 1,
      createdAt: 0,
      lastUpdatedAt: 0,
      isDone: false,
      priority: 'low',
      title: '',
    };

    beforeEach(() => {
      spyOn(storeService, 'createItem').and.returnValue(of(mockItem));
      spyOn(storeService, 'getItems').and.returnValue(of([mockItem]));
    });

    it('does not add item if no value is specified', () => {
      component.itemLabelControl.setValue('');
      component.onFormSubmit();
      expect(storeService.createItem).not.toHaveBeenCalled();
    });

    it('calls service to save items', () => {
      component.itemLabelControl.setValue('new item');
      component.onFormSubmit();
      expect(storeService.createItem).toHaveBeenCalled();
    });

    it('updates component items', () => {
      component.items$.next([]);
      component.itemLabelControl.setValue('new item');
      component.onFormSubmit();
      expect(component.items$.value.length).toBe(1);
    });
  });
});
