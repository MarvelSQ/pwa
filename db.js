let DBOpenRequest = window.indexedDB.open('pwa',9);
let db;
DBOpenRequest.onupgradeneeded=function(event){
  let db = event.target.result;
  if(!db.objectStoreNames.contains('pwa')){
    let objectStore = db.createObjectStore('pwa',{keyPath: 'id'});
    objectStore.createIndex("name", "name", { unique: false });
    console.log('pwa created')
  }else{
    console.log('target',event.target);
    // let transaction = db.transaction('pwa','readwrite');
    // let os = transaction.objectStore('pwa');
    // os.keyPath = 'id';
  }
}
DBOpenRequest.onsuccess = event => {
  db = event.target.result;
}
DBOpenRequest.onerror = event => {
  alert(event.target.error);
}
setTimeout(()=>{
  console.log(db);
  let transaction = db.transaction('pwa','readwrite');
  let os = transaction.objectStore('pwa');
  console.log(os);
  let request = os.count();
  request.onsuccess = e=>{
    console.log(e);
  }
},1000);
