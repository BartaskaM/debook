var checkmark = document.getElementById("checkmark");
var button = document.getElementById("booking");


button.onclick = function() {
    checkmark.innerHTML = "Unavailable";
    checkmark.style.color="red";
    checkmark.style.backgroundColor = "#FF7F50";
    button.style.backgroundColor = "#E9E9E9";
    
    
    button.disabled=true;
}