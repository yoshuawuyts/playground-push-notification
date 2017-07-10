var applicationServerPublicKey = 'BJPMaDrbRiUzH8IeMvRMn7CcxFMIQzTEB1j62KngB5irgMhB9TPgcmMjwB7t1aRkUKDwzz9MMH3ASEKLKX_mqjk'

if (typeof window !== 'undefined' && 'serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported')

  window.navigator.serviceWorker.register('/sw.js')
    .then(function (swReg) {
      console.log('Service Worker is registered', swReg)
      swReg.pushManager.getSubscription()
        .then(function (subscription) {
          var isSubscribed = !(subscription === null)
          if (isSubscribed) console.log('User IS subscribed.')
          else console.log('User is NOT subscribed.')

          var opts = {
            userVisibleOnly: true,
            applicationServerKey: urlB64ToUint8Array(applicationServerPublicKey)
          }
          swReg.pushManager.subscribe(opts)
            .then(function (subscription) {
              console.log('User is subscribed.')
              isSubscribed = true
            })
            .catch(function (err) {
              console.log('Failed to subscribe the user: ', err)
            })
        })
    })
    .catch(function (error) {
      console.error('Service Worker Error', error)
    })
} else {
  console.warn('Push messaging is not supported')
}

function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
