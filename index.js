console.log('index.js loaded');

let root = document.getElementById('root');

function genSpan(text) {
  let span = document.createElement('span');
  span.innerText = text;
  return span;
}

root.append(genSpan('test'));

fetch('ad.json').then(res=>{
  return res.json();
}).then(json=>console.log('json',json));
