/**
 * Represents a TODO list item.
 */
export interface TodoItem {
  /**
   * Unique ID of this item.
   */
  id: number;

  /**
   * A timestamp (in milliseconds from epoch) to indicate when this item was
   * created.
   */
  createdAt: number;

  /**
   * A timestamp (in milliseconds from epoch) to indicate when this item was
   * last updated.
   */
  lastUpdatedAt: number;

  /**
   * The title of this item. Defaults to an empty string.
   */
  title: string;

  /**
   * The priority of the item.
   */
  priority: 'low' | 'moderate' | 'high';

  /**
   * Indicates whether this item has been marked as done.
   */
  isDone: boolean;
}

/**
 * A type to pass information for creating a TODO item.
 */
export type CreateTodoItemRequest = Pick<TodoItem, 'title' | 'priority'>;

/**
 * A type to pass information for updating a TODO item.
 */
export type UpdateTodoItemRequest = Pick<
  TodoItem,
  'id' | 'title' | 'priority' | 'isDone'
>;
