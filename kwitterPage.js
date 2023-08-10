const firebaseConfig = {
    apiKey: "AIzaSyDGNLEle1-7fhLwqoillPDbQZ-CSxi3dmU",
    authDomain: "kwitter-8c063.firebaseapp.com",
    databaseURL: "https://kwitter-8c063-default-rtdb.firebaseio.com",
    projectId: "kwitter-8c063",
    storageBucket: "kwitter-8c063.appspot.com",
    messagingSenderId: "215839942018",
    appId: "1:215839942018:web:8e6e499701773fb5871b9b"
  };
  
  firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("roomName");

function send(){
    msg = document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message: msg,
        like:0
    });
    document.getElementById("msg").value = "";
}

function getData(){
    firebase.database().ref("/"+room_name).on('value', function(snapshot)
    {document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot)
    {childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
        firebaseMessageId =childKey;
        messageData = childData;

        console.log(firebaseMessageId);
        console.log(messageData);
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>"+message+"</h4>";
        like_button = "<button class= 'btn btn-warning' id="+firebaseMessageId+" value="+like+"onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = nameWithTag + messageWithTag+like_button+spanWithTag;
        document.getElementById("output").innerHTML = row;


    }
    });

});

}

getData();

    function updateLike(messageId){
        console.log("botão de like pressionado -"+ messageId);
        buttonId = messageId;
        likes = document.getElementById(buttonId).value;
        updatedLikes = Number(likes) + 1;
        console.log(updatedLikes);

        firebase.database().ref(room_name).child(messageId).update({
            like: updatedLikes
        });
    }
    function logout(){
        localStorage.removeItem("username");
        localStorage.removeItem("roomName");
        window.location.replace("index.html");
    }


