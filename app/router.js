/**
 * Created by albo-vieira on 04/08/16.
 */
define('router', function () {

    //router
    var router = new VueRouter();
    router.map({
        '/chat/:room': {
            component: chatComponent
        },
        '/rooms': {
            component: roomsComponent
        },
        '/rooms/create': {
            component: roomsCreateComponent
        }
    });

    return router;
});