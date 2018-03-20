
const DeviceData = [{
  image:'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122',
  name: 'Apple iPad Pro 10.5", 256GB',
  identification_num: '0000000497',
  serial_num: '123456798ZXJC',
  os: 'macOS High Sierra(version 10.13)',
  group: 'ACC Computers LT',
  subgroup: 'Tablet APPLE',
  description: 'DAUG TEKSTO BAL BLALAD SALDsd j ldask daskd " asdksadla das',
  check_in_due: '',
  purchased: '',
  vendor: 'Mark IT',
  tax_rate: '10.0%',
  location: 'Kaunas',
},
];

function formHTML(){
  const htmlString = DeviceData.map( x => {
    return '<div class="row"> '+
    '                <div class="col-md-3">'+
    '                        <img class="img-fluid" src='+x.image+' alt="">'+
    '                </div>'+
    '                <div class="col-md-6 list-unstyled">'+
    '                    <h1>'+x.name+'</h1>'+
    '                    <div class="row custody "> '+
    '                        <div class="col-md-3 detail-name">'+
    '                            <li>Custody of:  </li>'+
    '                            <li>Booked from: </li>'+
    '                        </div>'+
    '                        <div class="col-md-9">'+
    '                            <li>\'Name Surname(name.surname@devbridge.com)\' <i class="fas fa-flag" style="color:red;"></i></li>'+
    '                            <li><script> document.write(new Date().toLocaleDateString()); </script></li>'+
    '                        </div>    '+
    '                    </div>'+
    '                    <hr>'+
    '                    <b>ITEM DETAILS</b>'+
    '                    <hr>'+
    '                    <div class="row details">'+
    '                        <div class="col-md-3 detail-name">'+
    '                                <li>ID#:  </li>'+
    '                                <li>Serial number: </li>'+
    '                                <li>OS: </li>'+
    '                                <li>Group: </li>'+
    '                                <li>Subgroup: </li>'+
    '                                <li>Description: </li>'+
    '                                <li>Check-in due: </li>'+
    '                                <li>Location: </li>'+
    '                                <li>Purchased on: </li>'+
    '                                <li>Vendor: </li>'+
    '                                <li>Tax Rate: </li>'+
    '                        </div>'+
    '                        <div class="col-md-9">'+
    '                            <li>'+x.identification_num+'</li>'+
    '                            <li>'+x.serial_num+'</li>'+
    '                            <li>'+x.os+'</li>'+
    '                            <li>'+x.group+'</li>'+
    '                            <li>'+x.subgroup+'</li>'+
    '                            <li>'+x.description+'</li>'+
    '                            <li>'+x.check_in_due+'</li>'+
    '                            <li>'+x.location+'</li>'+
    '                            <li>'+x.purchased+'</li>'+
    '                            <li>'+x.vendor+'</li>'+
    '                            <li>'+x.tax_rate+'</li>'+
    '                        </div>'+
    '                    </div>'+
    ''+
    '                       '+
    '                </div>'+
    '                <div class="col-md-3" style="background-color: #f6f6f6;">'+
    '                    <button type="button" class="btn btn-secondary btn-block"> <i class="fas fa-plus-circle"></i>  BOOK DEVICE</button>'+
    '                    <br>'+
    '                    <button type="button" class="btn btn-primary btn-block"> <i class="far fa-clock"></i> RESERVATION </button>'+
    '                    <br>                   '+
    '                    <button type="button" class="btn btn-primary btn-dark btn-block">  CHANGE LOCATION </button>'+
    '                    <br>'+
    '                    <br>'+
    '                    '+
    '                </div>'+
    '            </div>'
  }).join('');
  
  return htmlString;
}

function renderHTML(){
  document.querySelector('.item-container').innerHTML=formHTML();
}
document.onload=renderHTML();

