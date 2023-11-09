self.addEventListener('activate', async () => { });

self.addEventListener('push', event => {

  const { body, title, image } = event.data.json();

  const options = { body, icon: image, sound: '/success-fanfare-trumpets-6185.mp3' };

  event.waitUntil(self.registration.showNotification(title, options));

  self.clients.matchAll().then(clients => {
    clients.forEach(client => client.postMessage({ action: 'playAudio' }));
  });
});
