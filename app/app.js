//Initialize firebase
/*var config = {
    apiKey: "AIzaSyBZym3mHfq1cpm0Goax1oa_mTc13t4E0dU",
    authDomain: "chat-vuejs.firebaseapp.com",
    databaseURL: "https://chat-vuejs.firebaseio.com",
    storageBucket: "chat-vuejs.appspot.com"
};
var firebaseApp = firebase.initializeApp(config);*/

requirejs(['router','chat','room','createRoom'],
    function (router,chat,room,createRoom) {

        router.start(Vue.extend({}),"#app");
});
