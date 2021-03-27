import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
  itemLabelControl = new FormControl();

  /**
   * An array of the subscriptions created inside this component. Will be used
   * to clean those up on component destroy.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Reference to the item label input.
   */
  @ViewChild('addItemInput') private addItemInput: ElementRef;

  constructor(
    private storeService: TodoDataStoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.getItems().subscribe((items) => this.items$.next(items))
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
   * Fetches the TODO items from the data store.
   *
   * @returns An observable of the TODO items.
   */
  getItems(): Observable<TodoItem[]> {
    return this.storeService.getItems();
  }

  /**
   * Callback for the "submit" event of the form.
   */
  onFormSubmit(): void {
    if (this.itemLabelControl.value.trim()) {
      const req: CreateTodoItemRequest = {
        title: this.itemLabelControl.value,
        priority: 'low',
      };

      this.subscriptions.push(
        this.storeService
          .createItem(req)
          .pipe(switchMap(() => this.getItems()))
          .subscribe((items) => {
            this.items$.next(items);
            this.itemLabelControl.setValue('');
          })
      );
    }
  }

  /**
   * Callback for the "modified" event on the list item.
   *
   * @param newItem A copy of the item modified.
   */
  onItemModified(newItem: TodoItem): void {
    this.subscriptions.push(
      this.storeService
        .updateItem(newItem)
        .pipe(switchMap(() => this.getItems()))
        .subscribe((items) => this.items$.next(items))
    );
  }

  /**
   * Callback for the "deleted" event on the list item.
   *
   * @param item The item which was deleted.
   */
  onItemDeleted(item: TodoItem): void {
    this.subscriptions.push(
      this.storeService
        .deleteItem(item.id)
        .pipe(switchMap(() => this.getItems()))
        .subscribe((items) => this.items$.next(items))
    );
  }
}
