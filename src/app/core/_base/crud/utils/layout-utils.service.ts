import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import {
  ActionNotificationComponent,
  DeleteEntityDialogComponent,
  FetchEntityDialogComponent,
  UpdateStatusDialogComponent
} from '../../../../views/partials/content/crud';

export enum MessageType {
  Create,
  Read,
  Update,
  Delete
}

@Injectable()
export class LayoutUtilsService {

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  showActionNotification(
    message: string,
    type: MessageType = MessageType.Create,
    duration: number = 10000,
    showCloseButton: boolean = true,
    showUndoButton: boolean = true,
    undoButtonDuration: number = 3000,
    verticalPosition: 'top' | 'bottom' = 'bottom'
  ) {
    const data = {
      message,
      snackBar: this.snackBar,
      showCloseButton,
      showUndoButton,
      undoButtonDuration,
      verticalPosition,
      type,
      action: 'Undo'
    };
    return this.snackBar.openFromComponent(ActionNotificationComponent, {
      duration,
      data,
      verticalPosition
    });
  }

  deleteElement(title: string = '', description: string = '', waitDescription: string = '') {
    return this.dialog.open(DeleteEntityDialogComponent, {
      data: { title, description, waitDescription },
      width: '440px'
    });
  }

  fetchElements(data: any) {
    return this.dialog.open(FetchEntityDialogComponent, {
      data,
      width: '600px'
    });
  }

  updateStatusForEntities(title, statuses, messages) {
    return this.dialog.open(UpdateStatusDialogComponent, {
      data: { title, statuses, messages },
      width: '600px'
    });
  }
}
