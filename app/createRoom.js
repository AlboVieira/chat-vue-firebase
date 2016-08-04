
define(['firebase'], function (firebaseApp) {
    var db = firebaseApp.database();
    var rooms = [
        {id: "001", name: "PHP", description: "Sala PHP"},
        {id: "002", name: "JAVA", description: "Sala JAVA"},
        {id: "003", name: "PYTHON", description: "Sala PYTHON"},
        {id: "004", name: "JAVASCRIPT", description: "Sala JAVASCRIPT"},
        {id: "005", name: "RUBY", description: "Sala RUBY"}
    ];
    return Vue.extend({
        template: `
    <p>Salas Criadas:</p>
    <ul>
        <li v-for="r in rooms">
        {{r.name}}
        </li>
    </ul>
    `,

        firebase: {
            rooms: db.ref('chat/rooms')
        },

        ready: function () {
            var chatRef = db.ref('chat');
            var roomsRef = chatRef.child('rooms');

            //persist in firebase the array rooms
            rooms.forEach(function (room) {
                roomsRef.child(room.id).set({
                    name: room.name,
                    description: room.description
                })
            });

        }
    });
});