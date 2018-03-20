
const DeviceData = [{
  image:'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/i/pa/ipad/cell/ipad-cell-select-spacegray-201703?wid=470&hei=556&fmt=png-alpha&.v=1507581905122',
  name: 'Apple iPad Pro 10.5", 256GB',
  custody_of: 'Name Surname (name.surname@devbridge.com)',
  booked_from: '2018-03-20',
  identification_num: '0000000497',
  serial_num: '123456798ZXJC',
  os: 'macOS High Sierra(version 10.13)',
  group: 'ACC Computers LT',
  subgroup: 'Tablet APPLE',
  description: 'DAUG TEKSTO BAL BLALAD SALDsd j ldask daskd " asdksadla das dsah;sa ahd ahpd hsad ajh pahsdpah uahs daspj',
  check_in_due: '2018-03-01',
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
    '                <div class="col-md-6 list-unstyled ">'+
    '                    <h1>'+x.name+'</h1>'+
    '                    <div class="row custody "> '+
    '                            <li><span class="detail-name">Custody of: </span><span class="detail-info">'+x.custody_of+' <i class="fas fa-flag"  style="color:red;"></i></span> </li>'+
    '                            <li><span class="detail-name">Booked from:</span><span class="detail-info">'+x.booked_from+' </span></li>'+
    '                    </div>'+
    '                    <hr>'+
    '                    <b>ITEM DETAILS</b>'+
    '                    <hr>'+
    '                    <div class="row details">'+
    '                                <p><span class="detail-name">ID#: </span> <span class="detail-info">'+x.identification_num+'</span> </p>'+
    '                                <p><span class="detail-name">Serial number: </span> <span class="detail-info">'+x.serial_num+'</span>  </p>'+
    '                                <p><span class="detail-name">OS:</span> <span class="detail-info">'+x.os+'</span>  </p>'+
    '                                <p><span class="detail-name">Group: </span> <span class="detail-info">'+x.group+'</span>  </p>'+
    '                                <p><span class="detail-name">Subgroup: </span> <span class="detail-info">'+x.subgroup+'</span>  </p>'+
    '                                <p><span class="detail-name">Description: </span> <span class="detail-info">'+x.description+'</span>  </p>'+
    '                                <p><span class="detail-name">Check-in due: </span><span class="detail-info">'+x.check_in_due+'</span>  </p>'+
    '                                <p><span class="detail-name">Location: </span> <span class="detail-info">'+x.location+'</span>  </p>'+
    '                                <p><span class="detail-name">Purchased on: </span> <span class="detail-info">'+x.purchased+'</span>  </p>'+
    '                                <p><span class="detail-name">Vendor: </span><span class="detail-info">'+x.vendor+'</span>  </p>'+
    '                                <p><span class="detail-name">Tax Rate: </span><span class="detail-info">'+x.tax_rate+'</span>  </p>'+                                 
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

