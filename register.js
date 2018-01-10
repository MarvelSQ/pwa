console.log('register sw');

if (navigator.serviceWorker != null) {
  navigator.serviceWorker.register('sw.8.js')
  .then(function(registration) {
    console.log(registration);
    console.log('Registered events at scope: ',new Date(), registration.scope);
  });
}