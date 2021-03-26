import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListItemComponent } from './list-item/list-item.component';
import { ListComponent } from './list/list.component';
import { TodoDataStoreService } from './shared';

@NgModule({
  declarations: [ListComponent, ListItemComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  exports: [ListComponent, ListItemComponent],
  providers: [TodoDataStoreService],
})
export class TodoModule {}
