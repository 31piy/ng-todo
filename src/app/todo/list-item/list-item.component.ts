import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { TodoItem } from '../shared';

/**
 * Renders a TODO List item and allows users to interact with it.
 *
 * @example
 *   <app-todo-list-item [item]="listItem"
 *     (toggleSelection)="onToggleSelection"
 *     (modified)="onModified"
 *     (deleted)="onDeleted"
 *   </app-todo-list-item>
 */
@Component({
  selector: 'app-todo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {
  /**
   * The TODO list item.
   */
  @Input() item: TodoItem;

  /**
   * Emits whenever this item is toggled by the user. The value determines
   * whether it is toggled on or off.
   */
  @Output() toggleSelection = new Subject<boolean>();

  /**
   * Emits whenever this item is modified by the user. The value emitted is
   * the updated item.
   */
  @Output() modified = new Subject<TodoItem>();

  /**
   * Emits whenever this item is deleted by the user.
   */
  @Output() deleted = new Subject();

  /**
   * A flag to indicate whether this component is in edit mode.
   */
  editMode = false;

  /**
   * Form control for the item's label. Used in edit mode only.
   */
  itemLabelControl = new FormControl();

  /**
   * Reference to the item title input element.
   */
  @ViewChild('itemTitleInput') private itemTitleInput: ElementRef;

  /**
   * Callback for the "dblclick" event on the item title.
   */
  onItemTitleDblClick(): void {
    this.itemLabelControl.setValue(this.item.title);
    this.editMode = true;

    // Allow change detector to run before focusing the input.
    window.setTimeout(() => {
      this.itemTitleInput.nativeElement.select();
      this.itemTitleInput.nativeElement.focus();
    }, 0);
  }

  /**
   * Callback for the "submit" event of the form.
   */
  onFormSubmit(): void {
    if (this.itemLabelControl.value?.trim()) {
      const newItem = { ...this.item };

      newItem.title = this.itemLabelControl.value;
      this.modified.next(newItem);

      this.editMode = false;
    }
  }

  /**
   * Callback for the "click" event on the priority toggle button.
   */
  onPriorityToggleClick(): void {
    const newItem = { ...this.item };

    newItem.priority = newItem.priority === 'low' ? 'high' : 'low';
    this.modified.next(newItem);
  }

  /**
   * Callback for the "click" event on the mark done toggle button.
   */
  onMarkDoneToggleClick(): void {
    const newItem = { ...this.item };

    newItem.isDone = !newItem.isDone;
    this.modified.next(newItem);
  }

  /**
   * Callback for the "click" event on the delete button.
   */
  onDelete(): void {
    this.deleted.next();
  }
}
