const data = [{
  title: 'title14242',
  date: '1975-08-19T22:15:30.000Z',
},
{
  title: 'title2735',
  date: '1979-08-19T23:15:30.000Z',  
},
{
  title: 'title32427',
  date: '1975-09-19T23:15:30.000Z',  
},
{
  title: 'title1927',
  date: '1975-08-22T23:15:30.000Z',
},
{
  title: 'title2732',
  date: '1975-08-19T23:15:30.000Z',  
},
{
  title: 'title3225',
  date: '1975-08-19T22:30:30.000Z',  
}];

let sortedByTitle = false;
let sortedByDate = false;

function orderByTitle(){
  sortedByDate = false;
  if(!sortedByTitle){
    sortedByTitle = true;
    data.sort((x, y) => {
      if(x.title > y.title){
        return 1;
      } else if (x.title < y.title){
        return -1;
      } else return 0;
    });
  }
  else{
    sortedByTitle = false;
    data.sort((x, y) => {
      if(x.title > y.title){
        return -1;
      } else if (x.title < y.title){
        return 1;
      } else return 0;
    });
  }
  renderHTML();
}

function orderByDate(){
  sortedByTitle = false;
  if(!sortedByDate){
    sortedByDate = true;
    data.sort((x, y) => {
      const firstDate = new Date(x.date);
      const secondDate = new Date(y.date);
      if(firstDate > secondDate){
        return 1;
      } else if (firstDate < secondDate){
        return -1;
      } else return 0;
    });
  }
  else{
    sortedByDate = false;
    data.sort((x, y) => {
      const firstDate = new Date(x.date);
      const secondDate = new Date(y.date);
      if(firstDate > secondDate){
        return -1;
      } else if (firstDate < secondDate){
        return 1;
      } else return 0;
    });
  }
  renderHTML();
}

function showInfo(event){
  const parent = event.path[1];
  const info = {
    title: parent.children[0].innerHTML,
    date: parent.children[1].innerHTML,
  };
  console.log(info);
}

function appendZeroIfNeeded(number){
  if(number.length > 1){
    return number;
  } else {
    return '0'+number;
  }
}

function formDateString(date){
  return appendZeroIfNeeded(date.getDay().toString())+'.'+appendZeroIfNeeded(date.getMonth().toString())+'.'+
    date.getFullYear()+' '+appendZeroIfNeeded(date.getHours().toString())+':'+appendZeroIfNeeded(date.getMinutes().toString());
}

function formHTML(){
  const htmlString = data.map( x => {
    return '<li class="list-group-item"><div class="row"><div class="col-5">'+x.title+'</div><div class="col-3">'+formDateString(new Date(x.date))+'</div><div class="col-2" onclick="showInfo(event)">Preview</div><div class="col-2" onclick="showInfo(event)">Download</div></div></div></li>';
  }).join('');

  return htmlString;
}

function renderHTML(){
  document.querySelector('.item-list').innerHTML=formHTML();
}

document.onload=renderHTML();
const allTitleLabels=document.querySelectorAll('.label-title');
for (let index = 0; index < allTitleLabels.length; index++) {
  const element = allTitleLabels[index];
  element.onclick = orderByTitle;
}
const allDateLabels=document.querySelectorAll('.label-date');
for (let index = 0; index < allDateLabels.length; index++) {
  const element = allDateLabels[index];
  element.onclick = orderByDate;
}

