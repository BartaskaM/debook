
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
    '                    <table>'+
    '                            <tr><td class="detail-name">Custody of: </td> <td class="detail-info">'+x.custody_of+'<a href="#" data-toggle="tooltip" data-placement="bottom"  title="Request custody update"><i class="fas fa-flag"  style="color:red;"></i></a></td></tr>'+
    '                            <tr><td class="detail-name">Booked from:</td> <td class="detail-info">'+x.booked_from+' </td></tr>'+
    '                     </table>'+
    '                    </div>'+
    '                    <hr>'+
    '                    <b>ITEM DETAILS</b>'+
    '                    <hr>'+
    '                    <div class="row details">'+
    '                    <table>'+
    '                                <tr><td class="detail-name">ID#: </td> <td class="detail-info">'+x.identification_num+'</td> </tr>'+
    '                                <tr><td class="detail-name">Serial number: </td> <td class="detail-info">'+x.serial_num+'</td>  </tr>'+
    '                                <tr><td class="detail-name">OS:</td> <td class="detail-info">'+x.os+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Group: </td> <td class="detail-info">'+x.group+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Subgroup: </td> <td class="detail-info">'+x.subgroup+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Description: </td> <td class="detail-info">'+x.description+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Check-in due: </td><td class="detail-info">'+x.check_in_due+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Location: </td> <td class="detail-info">'+x.location+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Purchased on: </td> <td class="detail-info">'+x.purchased+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Vendor: </td><td class="detail-info">'+x.vendor+'</td>  </tr>'+
    '                                <tr><td class="detail-name">Tax Rate: </td><td class="detail-info">'+x.tax_rate+'</td>  </tr>'+                                 
    '                     </table>'+
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

(function renderHTMl(){document.querySelector('.item-container').innerHTML=formHTML();})();