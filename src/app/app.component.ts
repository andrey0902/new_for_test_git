import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { ApiService } from './api.service';
import { NewsletterService } from './news-letter.service';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pwa';
  items: any[];
  readonly VAPID_PUBLIC_KEY = 'BM1Q85AzSvQd1TBcuttyVYiD7YQtLM5XpFZc6eMhPze3q3VdHZHNrMYEczoFpbDcpNZ3fB7QWsqkXwLSrNr0sbs';


  constructor(public  apiService: ApiService,
              private swPush: SwPush,
              private serviceNot: PushNotificationService) {}

  ngOnInit() {
    this.fetchData();
    this.subscriptionSMS();
    console.log('this.swPush.isEnabled',  this.swPush.isEnabled);
  }

  fetchData() {
    this.apiService.fetch().subscribe((data: Array<any>) => {
      console.log(data);
      this.items = data;
    }, (err) => {
      console.log(err);
    });
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.warn('success get data', sub);
        this.serviceNot.sendSubscriptionToTheServer(sub).subscribe();
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  subscriptionSMS() {
    // this.swPush.notificationClicks.subscribe((e) => {
    //
    // })
    this.swPush.subscription.subscribe((e) => {
      console.log('subscription', e);
      this.serviceNot.sendSubscriptionToTheServer(e).subscribe();
    });

    this.swPush.messages.subscribe((m) => {
      console.log('messages',  m);
    });
  }
  load() {
    this.serviceNot.sendSubscriptionToTheServer('test').subscribe();
  }
}


