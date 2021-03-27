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

  describe('onItemTitleDblClick', () => {
    it('toggles the edit mode', () => {
      component.editMode = false;
      component.onItemTitleDblClick();

      expect(component.editMode).toBe(true);
      expect(component.itemLabelControl.value).toEqual(mockItem.title);
    });
  });
});
