console.log('register sw');

if (navigator.serviceWorker != null) {
  navigator.serviceWorker.register('sw.js')
  .then(function(registration) {
    console.log('Registered events at scope: ',new Date(), registration.scope);
  });
}