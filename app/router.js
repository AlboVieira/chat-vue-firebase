/**
 * Created by albo-vieira on 04/08/16.
 */
define(['chat','room','createRoom'], function (chat,room,createRoom) {

    //router
    var router = new VueRouter();
    router.map({
        '/chat/:room': {
            component: chat
        },
        '/rooms': {
            component: room
        },
        '/rooms/create': {
            component: createRoom
        }
    });

    return router;
});