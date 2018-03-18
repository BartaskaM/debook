const checkmark = document.getElementsByClassName('checkmark');
const button = document.getElementsByClassName('booking');

const DeviceData = [{
    image:'https://images-eu.ssl-images-amazon.com/images/I/612rXM6eMSL._SX385_.jpg',
    name: 'Apple iPad Pro 10.5", 256GB',
    identification_num: '0000000497',
    os: 'macOS High Sierra(version 10.13)',
    location: 'Kaunas',
  },{
    image:'https://static.acer.com/up/Resource/Acer/Notebooks/AGW2%20Aspire%20V5/Photo%20Gallery/20130912/Aspire-V5-photogallery-01.png',
    name: 'Acer Aspire V5-573G 15.6 inches',
    identification_num: '0000000498',
    os: 'Windows',
    location: 'Kaunas',
  }, {
    image:'https://images-eu.ssl-images-amazon.com/images/I/612rXM6eMSL._SX385_.jpg',
    name: 'Apple iPad Pro 10.5", 256GB',
    identification_num: '0000000497',
    os: 'macOS High Sierra(version 10.13)',
    location: 'Kaunas',
  },{
    image:'https://static.acer.com/up/Resource/Acer/Notebooks/AGW2%20Aspire%20V5/Photo%20Gallery/20130912/Aspire-V5-photogallery-01.png',
    name: 'Acer Aspire V5-573G 15.6 inches',
    identification_num: '0000000498',
    os: 'Windows',
    location: 'Kaunas',
  },
];

function formHTML(){
    const htmlString = DeviceData.map( x => {
      return '<div class="oneDevice"><img src='+x.image+'><label class="checkmark">Available</label><h2>'
      +x.name+'</h2><li>Identification number: '+x.identification_num+'</li><li>OS: '+x.os+'</li><li>Location: '
      +x.location+'</li><div><button class="reserve" type="button">Reserve</button> <button class="booking" type="button">Book Device</button></div></div>'
    }).join('');
  
    return htmlString;
}

function renderHTML(){
  document.querySelector('.item-list').innerHTML=formHTML();
}
document.onload=renderHTML();

$('.booking').click(function(){
  var buttonIndex = $(this).closest('.booking').index('.booking');
  console.log(buttonIndex);
  changeLabel(buttonIndex)

});

function changeLabel(index) {
    checkmark[index].innerHTML = 'Unavailable';
    checkmark[index].style.color='red';
    checkmark[index].style.backgroundColor = '#FF7F50';
    button[index].style.backgroundColor = '#E9E9E9';
    button[index].disabled=true;
}