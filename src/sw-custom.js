(function () {
  'use strict';

  console.warn('additional file');

  self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'Push Codelab';
    const options = {
      "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "assets/icons/icon-72x72.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    };



    // const options = {
    //   body: 'Yay it works.',
    //   icon: 'images/icon.png',
    //   badge: 'images/badge.png'
    // };

    event.waitUntil(self.registration.showNotification(title, options));
  });

  let key = null;

  key = setInterval(() => {

    const title = 'Push Codelab';
    const options = {
      "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "assets/icons/icon-72x72.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
  }, 2000);

  setTimeout(() => {
    clearInterval(key);
  }, 10000)

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    console.log('notification details: ', event.notification);
  });
}());
