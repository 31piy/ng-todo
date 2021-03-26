import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';

import {
  CreateTodoItemRequest,
  TodoDataStoreService,
  TodoItem,
} from '../shared';

/**
 * A component to render a TODO list. The list is loaded using the data store
 * service.
 *
 * @example
 *   <app-todo-list></app-todo-list>
 */
@Component({
  selector: 'app-todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * A subject of the current TODO items in the list.
   */
  items$ = new BehaviorSubject<TodoItem[]>([]);

  /**
   * Form control for the item label input.
   */
  itemLabelControl = new FormControl(null, Validators.required);

  /**
   * An array of the subscriptions created inside this component. Will be used
   * to clean those up on component destroy.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Reference to the item label input.
   */
  @ViewChild('addItemInput') addItemInput: ElementRef;

  constructor(
    private storeService: TodoDataStoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.storeService.getItems().subscribe((items) => this.items$.next(items))
    );
  }

  ngAfterViewInit(): void {
    // Auto focus the item label input.
    this.addItemInput.nativeElement.focus();
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (!sub.closed) {
        sub.unsubscribe();
      }
    });
  }

  /**
   * Callback for the "submit" event of the form.
   */
  onFormSubmit(): void {
    if (this.itemLabelControl.valid) {
      const req: CreateTodoItemRequest = {
        title: this.itemLabelControl.value,
        priority: 'low',
      };

      this.subscriptions.push(
        this.storeService.createItem(req).subscribe((item) => {
          const currentItems = this.items$.value;
          this.items$.next([...currentItems, item]);
        })
      );
    }
  }
}
