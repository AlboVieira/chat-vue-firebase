//Initialize firebase
/*var config = {
    apiKey: "AIzaSyBZym3mHfq1cpm0Goax1oa_mTc13t4E0dU",
    authDomain: "chat-vuejs.firebaseapp.com",
    databaseURL: "https://chat-vuejs.firebaseio.com",
    storageBucket: "chat-vuejs.appspot.com"
};
var firebaseApp = firebase.initializeApp(config);*/

requirejs(['firebase'], function (firebaseApp) {

    /** db instance */
    var db = firebaseApp.database();

    //chat
    var chatComponent = Vue.extend({
        template:`

        <style scoped>
            .chat{
                padding: 0;
            }
            .chat li{
                margin-bottom: 10px;
                padding-bottom: 10px;
            }
            .chat li.left .chat-body{
                margin-left: 100px;
            }
            .chat li.right .chat-body{
                text-align: right;
                margin-right: 100px;
            }
            .panel-body{
                overflow-y: scroll;
                height: 400px;
            }
        </style>

        <div class="panel panel-primary">
            <div class="panel-heading">{{roomName}}</div>
            <div class="panel-body">
                <ul class="chat list-unstyled">

                    <li class="clearfix" v-bind:class="{left:!isUser(m.email) , right:isUser(m.email)}" v-for="m in messages">
                        <span v-bind:class="{'pull-left':!isUser(m.email) , 'pull-right':isUser(m.email)}">
                            <img v-bind:src="m.photo" class="img-circle" />
                        </span>
                        <div class="chat-body">
                            <strong>{{m.name}}</strong>
                            <p>{{m.text}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="panel panel-footer">
                    <div class="input-group">
                        <input type="text" class="form-control input-md" v-model="message"
                        placeholder="Digite sua mensagem" @keyup.enter="send">
                        <span class="input-group-btn">
                            <button class="btn btn-success btn-md" @click="send">Enviar</button>
                        </span>
                    </div>
                </div>
        </div>
        `,

        //created could be used before ready
        created: function(){
            //mount the ref room from url
            var roomRef = 'chat/rooms/' + this.$route.params.room;

            // get the name of the chat
            var chat = this;
            db.ref(roomRef).child('description').once("value", function(data) {
                chat.roomName = data.val();
            });

            //force a bind with firebase
            this.$bindAsArray('messages', db.ref(roomRef +'/messages'));

        },

        data: function () {
            return {
                user:{
                    email: localStorage.getItem('email'),
                    name: localStorage.getItem('name'),
                    photo: localStorage.getItem('photo')
                },
                message: '',
                roomName:''
            };
        },
        methods:{
            isUser: function (email) {
                return this.user.email == email;
            },
            send: function(){
                this.$firebaseRefs.messages.push({
                    name: this.user.name,
                    email: this.user.email,
                    text: this.message,
                    photo: this.user.photo
                });

                this.message = '';
            }
        }
    });

    //rooms
    var rooms = [
        {id: "001", name: "PHP", description: "Sala PHP"},
        {id: "002", name: "JAVA", description: "Sala JAVA"},
        {id: "003", name: "PYTHON", description: "Sala PYTHON"},
        {id: "004", name: "JAVASCRIPT", description: "Sala JAVASCRIPT"},
        {id: "005", name: "RUBY", description: "Sala RUBY"}
    ];
    var roomsCreateComponent = Vue.extend({
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

    var roomsComponent = Vue.extend({
        template: `
        <div class="col-md-4" v-for="r in rooms">
            <div class="panel panel-primary">
                <div class="panel-heading">{{r.name}}</div>
                <div class="panel-body">
                    {{r.description}}
                    <br>
                    <a href="javascript:void(0)" @click="openModal(r)">Entrar</a>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modalLogin" role="dialog">
            <div class="modal-dialog">

              <!-- Modal content-->
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 style="color:red;"><span class="glyphicon glyphicon-lock"></span> Login</h4>
                </div>
                <div class="modal-body">
                  <form role="form">
                    <div class="form-group">
                      <label for="email"><span class="glyphicon glyphicon-user"></span> Email</label>
                      <input v-model="email" type="text" class="form-control" id="email" placeholder="Email">
                    </div>
                    <div class="form-group">
                      <label for="name"><span class="glyphicon glyphicon-eye-open"></span> Nome</label>
                      <input v-model="name" type="text" class="form-control" id="name" placeholder="Nome">
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-default btn-default pull-left" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Fechar</button>
                  <button @click="login" type="submit" class="btn btn-default btn-success btn-block"><span class="glyphicon glyphicon-off"></span> Login</button>
                </div>
              </div>
            </div>
        </div>

    `,

        firebase: {
            rooms: db.ref('chat/rooms')
        },
        data : function () {

            return {
                rooms: [
                    {id: "001", name: "PHP", description: "Sala PHP"},
                    {id: "002", name: "JAVA", description: "Sala JAVA"},
                    {id: "003", name: "PYTHON", description: "Sala PYTHON"},
                    {id: "004", name: "JAVASCRIPT", description: "Sala JAVASCRIPT"},
                    {id: "005", name: "RUBY", description: "Sala RUBY"}
                ],
                name: '',
                email: '',
                room: null
            }
        },

        methods:{
            login: function (room) {
                //setando the active user
                localStorage.setItem('name',this.name);
                localStorage.setItem('email',this.email);
                localStorage.setItem('photo','http://www.gravatar.com/avatar/' + md5(this.email)+'.jpg');

                $('#modalLogin').modal('hide');

                this.$route.router.go('/chat/'+ this.room.id);
            },
            openModal: function (room) {
                this.room = room;
                $('#modalLogin').modal('show');
            }
        }

    });

    //app
    var appComponent = Vue.extend({});

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

    router.start(appComponent,"#app");

});
