define('firebase', function () {

    //Initialize firebase
    var config = {
        apiKey: "AIzaSyBZym3mHfq1cpm0Goax1oa_mTc13t4E0dU",
        authDomain: "chat-vuejs.firebaseapp.com",
        databaseURL: "https://chat-vuejs.firebaseio.com",
        storageBucket: "chat-vuejs.appspot.com"
    };

    return firebase.initializeApp(config);
}); 