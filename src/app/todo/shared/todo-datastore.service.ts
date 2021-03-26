import { Observable, of, throwError } from 'rxjs';
import {
  CreateTodoItemRequest,
  TodoItem,
  UpdateTodoItemRequest,
} from './models';

/**
 * The prefix to use to store TODO items.
 */
const storeKeyPrefix = 'ng-todo';

/**
 * The key to store/retrieve items to/from the local storage.
 */
export const todoItemsKey = `${storeKeyPrefix}.items`;

/**
 * The data store for the TODO items. Uses local storage API to persist the
 * items on the browser.
 */
export class TodoDataStoreService {
  /**
   * Returns the list of TODO items in the data store.
   *
   * @returns An observable of the TODO items.
   */
  getItems(): Observable<TodoItem[]> {
    const items: TodoItem[] = JSON.parse(this.read());
    return of(items);
  }

  /**
   * Creates a TODO item.
   *
   * @param req The request parameters to create a new item.
   * @returns An observable of the newly created TODO item.
   */
  createItem(req: CreateTodoItemRequest): Observable<TodoItem> {
    const newItem: TodoItem = {
      id: Date.now(),
      createdAt: Date.now(),
      lastUpdatedAt: Date.now(),
      title: req.title,
      priority: req.priority,
      isDone: false,
    };

    // Update the data store.
    const storeItems: TodoItem[] = JSON.parse(this.read());
    storeItems.push(newItem);
    this.write(JSON.stringify(storeItems));

    return of(newItem);
  }

  updateItem(req: UpdateTodoItemRequest): Observable<TodoItem> {
    const storeItems: TodoItem[] = JSON.parse(this.read());
    const existingItem = storeItems.find((item) => item.id === req.id);

    if (!existingItem) {
      return throwError(`No TODO item with ID ${req.id} was found.`);
    }

    // Mutate the item and update the store
    existingItem.title = req.title;
    existingItem.isDone = req.isDone;
    existingItem.lastUpdatedAt = Date.now();
    this.write(JSON.stringify(storeItems));

    return of(existingItem);
  }

  deleteItem(itemId: TodoItem['id']): Observable<null> {
    const storeItems: TodoItem[] = JSON.parse(this.read());
    const itemIndex = storeItems.findIndex((item) => item.id === itemId);

    if (itemIndex === -1) {
      return throwError(`No TODO item with ID ${itemId} was found.`);
    }

    // Update the store
    storeItems.splice(itemIndex, 1);
    this.write(JSON.stringify(storeItems));

    return of(null);
  }

  /**
   * Returns the currently stored value of the data store.
   */
  private read(): string {
    return localStorage.getItem(todoItemsKey) || JSON.stringify([]);
  }

  /**
   * Writes a new value to the data store.
   */
  private write(newValue: string = JSON.stringify([])): void {
    localStorage.setItem(todoItemsKey, newValue);
  }
}
