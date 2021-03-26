import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoDataStoreService } from '../shared';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storeService: TodoDataStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
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
      spyOn(storeService, 'getItems').and.callThrough();
      component.ngOnInit();
      expect(storeService.getItems).toHaveBeenCalled();
    });
  });

  describe('onFormSubmit', () => {
    beforeEach(() => {
      spyOn(storeService, 'createItem').and.callThrough();
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
