var data = [{
    title: "title14242",
    date: "date1426"
},
{
    title: "title2735",
    date: "date27417"  
},
{
    title: "title32427",
    date: "date3728"  
},
{
    title: "title1927",
    date: "date1729"
},
{
    title: "title2732",
    date: "date272732"  
},
{
    title: "title3225",
    date: "date31179"  
}]

var sortedByTitle=false;
var sortedByDate=false;

function orderByTitle(){
    sortedByDate=false;
    if(!sortedByTitle){
        sortedByTitle=true;
        data.sort((x,y) => {
            if(x.title>y.title){
                return 1;
            } else if (x.title<y.title){
                return -1;
            } else return 0;
        });
    }
    else{
        sortedByTitle=false;
        data.sort((x,y) => {
            if(x.title>y.title){
                return -1;
            } else if (x.title<y.title){
                return 1;
            } else return 0;
        });
    }
    renderHTML();
}

function orderByDate(){
    sortedByTitle=false;
    if(!sortedByDate){
        sortedByDate=true;
        data.sort((x,y) => {
            if(x.date>y.date){
                return 1;
            } else if (x.date<y.date){
                return -1;
            } else return 0;
        });
    }
    else{
        sortedByDate=false;
        data.sort((x,y) => {
            if(x.date>y.date){
                return -1;
            } else if (x.date<y.date){
                return 1;
            } else return 0;
        });
    }
    renderHTML();
}
function log(){
    console.log("!!!");
    this.pa
}

function showInfo(event){
    const parent=event.path[1];
    var info={
        title: parent.children[0].innerHTML,
        date: parent.children[1].innerHTML
    }
    console.log(info);
}
function formHTML(){
    var htmlString=data.map( x => {
        return '<li class="list-group-item"><div class="row"><div class="col-6">'+x.title+'</div><div class="col-2">'+x.date+'</div><div class="col-2" onclick="showInfo(event)">Preview</div><div class="col-2" onclick="showInfo(event)">Download</div></div></div></li>'
    }).join("");

    return htmlString;
}
function renderHTML(){
    document.getElementById("item_list").innerHTML=formHTML();
}
document.onload=renderHTML();
document.getElementById("label_title").onclick=orderByTitle;
document.getElementById("label_date").onclick=orderByDate;
function log(){
    console.log("!!!");
}