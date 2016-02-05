/* new implementation */
/* first shot */

/*var pastConns = { 'one': undefined, 'two': undefined, 'three': undefined };*/

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

var pastConns = { 'minus2t': -1, 'minust': -1, 'now': -1 };
var pastMaxConns= { 'minus2t': -1, 'minust': -1, 'now': -1 };


//localStorage.removeItem('pastConns');
// Retrieve the object from storage
var retrievedObject = localStorage.getItem('pastConns');
var retrievedMaxObject = localStorage.getItem('pastMaxConns');




// Retrieve the object from storage
if (retrievedObject!=null){
	retrievedObject=JSON.parse(retrievedObject);
}else{
	retrievedObject=pastConns;
}

// Retrieve the object from storage
if (retrievedMaxObject!=null){
	retrievedMaxObject=JSON.parse(retrievedMaxObject);
}else{
	retrievedMaxObject=pastMaxConns;
}


	


//get MaxBusyconnections from Tomcat1
var conns = document.getElementsByTagName("table")[6].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[16].innerHTML;
var curconns = document.getElementsByTagName("table")[6].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td")[15].innerHTML;

console.log("Max: "+conns);
console.log("Current: "+curconns);


	//shift one
	retrievedObject.minus2t=retrievedObject.minust;
	retrievedObject.minust=retrievedObject.now;
	retrievedObject.now=curconns;

	retrievedMaxObject.minus2t=retrievedMaxObject.minust;
	retrievedMaxObject.minust=retrievedMaxObject.now;
	retrievedMaxObject.now=conns;




// Fire the alarm if one<two<three
if (retrievedMaxObject.minus2t < retrievedMaxObject.minust && retrievedMaxObject.minust < retrievedMaxObject.now && retrievedMaxObject.now <= curconns){
	 
	 var myAudio = new Audio();
	 myAudio.src = chrome.extension.getURL("ding.m4a");
	 myAudio.play();
	 Notification.requestPermission();
	 new Notification('Avatar Alarm', {
    		icon: chrome.extension.getURL('alert.png'),
    		body: 'Load balancer is having heavy traffic increases. Check now!'
  	});


}

// Put the object into storage
localStorage.setItem('pastConns', JSON.stringify(retrievedObject));
localStorage.setItem('pastMaxConns', JSON.stringify(retrievedMaxObject));


console.log("Last three MaxBusyConnections: "+JSON.stringify(retrievedMaxObject));
console.log("Last three BusyConnections: "+JSON.stringify(retrievedObject));
console.log('analyzed busy and current connections');