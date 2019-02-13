import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent, Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';

declare let askUserToUpdate;

export  interface  Item {
  name:  string;
  description:  string;
  url:  string;
  html:  string;
  markdown:  string;
}

@Injectable({
  providedIn:  'root'
})

export  class  ApiService {
  private  dataURL  =  'https://www.techiediaries.com/api/data.json';
  promptEvent;
  constructor(private  httpClient:  HttpClient,
              private swUpdate: SwUpdate) {
    this.update();
    fromEvent(window, 'online')
      .pipe(pluck('navigator'))
      .subscribe(event => {
        if (event) {

        }
        console.log('online', event);
      });
    fromEvent(window, 'offline')
      .pipe(pluck('navigator'))
      .subscribe(event => {
        if (event) {

        }
        console.log('oflline', event);
      })

    swUpdate.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    swUpdate.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    fromEvent(window, 'beforeinstallprompt').subscribe((event) => {
      console.warn('\'beforeinstallprompt\'', event);
      this.promptEvent = event;
    });
    window.addEventListener('beforeinstallprompt', event => {
      this.promptEvent = event;
    });
  }

  fetch():  Observable<Item[]> {
    return this.httpClient.get(this.dataURL)
      .pipe(map((data: any) => {
        return (data as Item[] );
      }));
  }

  update() {
    this.swUpdate.available.subscribe(event => {
      if (askUserToUpdate()) {
        window.location.reload();
      }
    });
  }
}
