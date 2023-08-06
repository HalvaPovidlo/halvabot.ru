import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Notification, NotificationType} from "../../models/notification.model";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnDestroy {
  notifications: Notification[] = [];
  private _subscription: Subscription;

  // constructor(private notificationService: NotificationService) {
  // }

  close(notification: Notification) {
    this.notifications = this.notifications.filter((item) => item.id !== notification.id)
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  className(notification: Notification): string {
    let style: string;

    switch (notification.type) {
      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  private _addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }
}
