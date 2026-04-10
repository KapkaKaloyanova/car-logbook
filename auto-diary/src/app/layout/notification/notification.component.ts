import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../shared/interfaces/notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit, OnDestroy {
  notificationService = inject(NotificationService);

  private subscription!: Subscription;

  currentMessage = signal<Notification | null>(null);

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$
      .subscribe(message => {
        this.currentMessage.set(message);
        setTimeout(() => {
          this.currentMessage.set(null)

        }, message.duration)
      })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
