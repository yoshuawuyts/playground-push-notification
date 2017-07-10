/* global self */

var applicationServerPublicKey = 'BH8-hIchXKMI6AKSee8gD0hhPThRqaEhIEtMJwcTjEQhiOKdG-_2tTIO-6hOAK4kwg5M9Saedjxp4hVE-khhWxY'

self.addEventListener('push', function (event) {
  var title = 'Push Codelab'
  var options = {
    body: 'Yay it works.',
    data: 'https://developers.google.com/web/'
    // icon: 'images/icon.png',
    // badge: 'images/badge.png'
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(self.clients.openWindow(event.notification.data))
})

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log('[Service Worker]: \'pushsubscriptionchange\' event fired.')
  var opts = {
    userVisibleOnly: true,
    applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
  }
  var reg = self.registration.pushManager.subscribe(opts)
    .then(function (newSubscription) {
      // TODO: Send to application server
      console.log('[Service Worker] New subscription: ', newSubscription)
    })
  event.waitUntil(reg)
})

function urlB64ToUint8Array (base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4)
  var base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  var rawData = window.atob(base64)
  var outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
