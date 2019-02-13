var reminders = [];
var lastReminderTime;


self.addEventListener('message', function(event) {
  reminders = event.data;
});

setInterval(function() {
  var reminder = getMatchingReminder(reminders);

  if (!reminder && lastReminderTime) {
    lastReminderTime = '';
  }

  if (reminder && reminder.Time !== lastReminderTime) {
    showReminder(reminder);
  }
}, 1000);

function showReminder(reminder) {
  lastReminderTime = reminder.Time;
  var title = 'It\'s ' + reminder.Time + '!';
  self.registration.showNotification(title, { body: reminder.Name, icon: './assets/alarm-icon.png' })
}

function formatTime(unit) {
  return unit > 10 ? unit.toString() : '0' + unit;
}

function getMatchingReminder(reminders) {
  var date = new Date();
  var nowHour = date.getHours();
  var nowMinute = date.getMinutes();
  var nowTime = formatTime(nowHour) + ':' + formatTime(nowMinute);

  for (var i = 0; i < reminders.length; i++) {
    if (reminders[i].Time === nowTime) {
      return reminders[i];
    }
  }

  return null;
}
