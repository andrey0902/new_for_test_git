const webpush = require('web-push');
const express = require('express');


const PUBLIC_VAPID = 'BPLerFn87xcT_mV2wI--H-wBH9aBEgbYDmKMbMTSYTOxT4tHpzlegdg17FkqdWhWV01YqEnQ_RyF-It_SRatS0A';
const PRIVATE_VAPID = 'WMb0u3CM4vDTFc3fVFsFpfKxljQrGlXQJkFXgVqeq30';
const cors = require('cors');
// Replace with your email
webpush.setVapidDetails('mailto:val@karpov.io', PUBLIC_VAPID, PRIVATE_VAPID);

const app = express();
app.use(cors());
app.use(require('body-parser').json());

app.get('/', (req, res) => {
  console.log(req);
  res.send({"data": "requst my"});
});

app.post('/subscription', (req, res) => {
  const subscription = req.body;
  console.log('req.body', req.body);
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is the body of the notification',
      icon: 'assets/icons/icon-512x512.png'
    }
  };
  res.status(201).json({});
  const payload = JSON.stringify(notificationPayload);

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.listen(4055, () => {
  console.log('Server started on port 3020');
});

