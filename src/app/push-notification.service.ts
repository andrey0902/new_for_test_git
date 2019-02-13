import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const SERVER_URL = 'https://172.16.101.142:3020/subscription';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: any) {
    return this.http.post(SERVER_URL, subscription);
  }
}
