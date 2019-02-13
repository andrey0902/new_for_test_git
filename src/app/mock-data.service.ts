import { Injectable } from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  messages = [{name: 'test0'}, {name: 'test1'}, {name: 'test2'}, {name: 'test3'}, {name: 'test4'}];
  timerId: Subscription;
  constructor(public localStorage: LocalStorage) { }

  sendMessage() {
    const tempMessage = [];
    this.timerId = interval(2000)
      .subscribe((i: number) => {
        if (this.messages[i]) {
          tempMessage.push(this.messages[i]);
          this.localStorage.setItem('messages', tempMessage).subscribe();
          console.log(this.messages[i]);
        }
      });
  }

  stopSendMessage() {
    if (this.timerId) {
      this.timerId.unsubscribe();
    }
  }

  statusNetworkHandler(isActive) {
    if (isActive) {
      return this.stopSendMessage();
    }
    this.sendMessage();
  }
}
