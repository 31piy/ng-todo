import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
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
  @Input() item: TodoItem = {
    id: 0,
    createdAt: 0,
    lastUpdatedAt: 0,
    title: '',
    isDone: false,
    priority: 'low',
  };

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
}
