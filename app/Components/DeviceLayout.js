const checkMark = document.getElementsByClassName('checkMark');
const buttons = document.getElementsByClassName('booking');

const deviceData = [{
  image: 'https://images-eu.ssl-images-amazon.com/images/I/612rXM6eMSL._SX385_.jpg',
  name: 'Apple iPad Pro 10.5", 256GB',
  identification_num: '0000000497',
  os: 'macOS High Sierra(version 10.13)',
  location: 'Kaunas',
}, {
  image: 'https://static.acer.com/up/Resource/Acer/Notebooks/AGW2%20Aspire%20V5/Photo%20Gallery/20130912/Aspire-V5-photogallery-01.png',
  name: 'Acer Aspire V5-573G 15.6 inches',
  identification_num: '0000000498',
  os: 'Windows',
  location: 'Kaunas',
}, {
  image: 'https://images-eu.ssl-images-amazon.com/images/I/612rXM6eMSL._SX385_.jpg',
  name: 'Apple iPad Pro 10.5", 256GB',
  identification_num: '0000000497',
  os: 'macOS High Sierra(version 10.13)',
  location: 'Kaunas',
}, {
  image: 'https://static.acer.com/up/Resource/Acer/Notebooks/AGW2%20Aspire%20V5/Photo%20Gallery/20130912/Aspire-V5-photogallery-01.png',
  name: 'Acer Aspire V5-573G 15.6 inches',
  identification_num: '0000000498',
  os: 'Windows',
  location: 'Kaunas',
},
];
function formHTML() {
  const htmlString = deviceData.map(x => {
    return '<div class="oneDevice"><img src=' + x.image + '><label class="checkMark">Available</label><h2>'
      + x.name + '</h2><li>Identification number: ' + x.identification_num + '</li><li>OS: ' + x.os + '</li><li>Location: '
      + x.location + '</li><div><button class="reserve" type="button">Reserve</button> <button class="booking" type="button">Book Device</button></div></div>';
  }).join('');

  return htmlString;
}

function renderHTML() {
  document.querySelector('.item-list').innerHTML = formHTML();
}
document.onload = renderHTML();

function findIndex() {
  for(let i=0; i<buttons.length; i++) {
    buttons[i].onclick=() => changeLabel(i);
  }
}
function changeLabel(index) {
  checkMark[index].innerHTML = 'Unavailable';
  checkMark[index].style.color = 'red';
  checkMark[index].style.backgroundColor = '#FF7F50';
  buttons[index].style.backgroundColor = '#E9E9E9';
  buttons[index].disabled = true;
}
findIndex();