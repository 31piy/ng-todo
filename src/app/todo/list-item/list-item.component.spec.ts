import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItem } from '../shared';

import { ListItemComponent } from './list-item.component';

const mockItem: TodoItem = {
  id: 1,
  createdAt: 0,
  lastUpdatedAt: 0,
  isDone: false,
  priority: 'low',
  title: 'mock item',
};

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemComponent);
    component = fixture.componentInstance;
    component.item = mockItem;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelectionCheckboxChange', () => {
    it('emits the toggleSelection event', () => {
      spyOn(component.toggleSelection, 'next');
      component.onSelectionCheckboxChange({ checked: true, source: null });
      expect(component.toggleSelection.next).toHaveBeenCalledWith(true);
    });
  });

  describe('onItemTitleDblClick', () => {
    beforeEach(() => {
      spyOn(window, 'setTimeout');
    });

    it('toggles the edit mode', () => {
      component.editMode = false;
      component.onItemTitleDblClick();

      expect(component.editMode).toBe(true);
      expect(component.itemLabelControl.value).toEqual(mockItem.title);
    });
  });

  describe('onFormSubmit', () => {
    it('emits the modified event', () => {
      component.itemLabelControl.setValue('test');
      spyOn(component.modified, 'next');
      component.onFormSubmit();
      expect(component.modified.next).toHaveBeenCalled();
    });

    it('does not emit modified event for empty values', () => {
      component.itemLabelControl.setValue('');
      spyOn(component.modified, 'next');
      component.onFormSubmit();
      expect(component.modified.next).not.toHaveBeenCalled();
    });

    it('creates item copy', () => {
      component.item = { ...mockItem };
      spyOn(component.modified, 'next');
      component.onFormSubmit();
      expect(component.modified.next).not.toHaveBeenCalledWith(component.item);
    });
  });

  describe('onPriorityToggleClick', () => {
    it('creates item copy', () => {
      component.item = { ...mockItem };
      spyOn(component.modified, 'next');
      component.onPriorityToggleClick();
      expect(component.modified.next).not.toHaveBeenCalledWith(component.item);
    });

    it('appropriately toggles item priority', () => {
      component.item = { ...mockItem };
      spyOn(component.modified, 'next');
      component.onPriorityToggleClick();

      expect(component.modified.next).toHaveBeenCalledWith({
        ...mockItem,
        priority: 'high',
      });
    });
  });

  describe('onMarkDoneToggleClick', () => {
    it('creates item copy', () => {
      component.item = { ...mockItem };
      spyOn(component.modified, 'next');
      component.onMarkDoneToggleClick();
      expect(component.modified.next).not.toHaveBeenCalledWith(component.item);
    });

    it('appropriately toggles the isDone flag', () => {
      component.item = { ...mockItem };
      spyOn(component.modified, 'next');
      component.onMarkDoneToggleClick();

      expect(component.modified.next).toHaveBeenCalledWith({
        ...mockItem,
        isDone: true,
      });
    });
  });

  describe('onDelete', () => {
    it('emits the delete event', () => {
      spyOn(component.deleted, 'next');
      component.onDelete();
      expect(component.deleted.next).toHaveBeenCalled();
    });
  });
});
