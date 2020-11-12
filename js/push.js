const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BP9-q7wGGsSWppLj3z9mbFvYbK4npk_fqbspcS5PqbkcSh5PYJa_b4QvXn9yM4ExcGDnIpWOjOOQTL211EVfxRQ',
  privateKey: 'R25uokEIyAyShISuuHJ4uenFKsebE4g3OLQgvA7bR50',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://sg2p.notify.windows.com/w/?token=BQYAAABRlRuy%2fcnYowOF%2f4ws7oEN9azbyTkuRiAPZeL2Geven2A3fZEUiB00X%2fsXT2ChLFkloN%2b%2bq8WmCV4Mo%2bDVtjraBgMHsYehUTkwyzSwnllQFOPyEhCgc%2bhkHi%2f7FZQS0RljrzpWFfOmZnCkrdZ4re5tY1HKiDxivAqDkD1QQNKWnRpuIYVS3FGvynqvkxMnItOPwZvitcRC6UPBZ4gmbSdTiq5uMCFsy4szUB8HXm60NERO1T%2fc8B3USDyvjeY%2fHR9WEBYm1%2bVlmC2iN4zXmsmEhY%2f3BKhrSx0QgVB1Y6ALVtITDhLtv%2fK%2fGV4Outmx8Q4%3d',
  keys: {
    p256dh: 'BKfadt1FDeM1Qb6XD/IhygQSCtrNkMoXi8vE8SwygM9eRkkFBdhRjt/FOdCkmR800pq+EBx5GraprndzQ9M55uY=',
    auth: 'OxNJ/AGYm+DWFYkzTRU6vA==',
  },
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
const options = {
  gcmAPIKey: '476030140029',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
