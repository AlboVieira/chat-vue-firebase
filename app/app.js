//Initialize firebase
var config = {
    apiKey: "AIzaSyBZym3mHfq1cpm0Goax1oa_mTc13t4E0dU",
    authDomain: "chat-vuejs.firebaseapp.com",
    databaseURL: "https://chat-vuejs.firebaseio.com",
    storageBucket: "chat-vuejs.appspot.com"
};
var firebaseApp = firebase.initializeApp(config);

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
                margin-bottom: 15px;
                padding-bottom: 15px;
            }
            .chat li.left .chat-body{
                margin-left: 70px;
            }
            .chat li.right .chat-body{
                text-align: right;
                margin-right: 70px;
            }
            .panel-body{
                overflow-y: scroll;
                height: 400px;
            }
        </style>

        <div class="panel panel-primary">
            <div class="panel-heading">Chat</div>
            <div class="panel-body">
                <ul class="chat list-unstyled">

                    <li class="clearfix" v-bind:class="{left:!isUser(m.email) , right:isUser(m.email)}" v-for="m in chat.messages">
                        <span v-bind:class="{'pull-left':!isUser(m.email) , 'pull-right':isUser(m.email)}">
                            <img v-bind:src="m.photo" class="img-circle" />
                        </span>
                        <div class="chat-body">
                            <p>{{m.text}}</p>
                        </div>
                    </li>
                </ul>

                <div class="panel panel-footer">
                    <div class="input-group">
                        <input type="text" class="form-control input-md" placeholder="Digite sua mensagem">
                        <span class="input-group-btn">
                            <button class="btn btn-success btn-md">Enviar</button>
                        </span>
                    </div>
                </div>

            </div>
        </div>
        `,

    data: function () {
        return {
            user:{
                email: 'albovieira@gmail.com',
                name: 'Albo Vieira'
            },
            chat:{
                messages : [
                    {
                        text: 'Ola Albo',
                        name: 'Fulano',
                        email: 'fulano@gmail.com',
                        photo: 'http://placehold.it/50/000FFF/fff&text=YOU'
                    },
                    {
                        text: 'Ola fulano',
                        email: 'albovieira@gmail.com',
                        name: 'Albo',
                        photo: 'http://placehold.it/50/000FFF/fff&text=EU'
                    }
                ]
            }
        };
    },
    methods:{
        isUser: function (email) {
            return this.user.email == email;
        }
    }
});

//rooms
var roomsComponent = Vue.extend({
    template: `
        <div class="col-md-4" v-for="r in rooms">
            <div class="panel panel-primary">
                <div class="panel-heading">{{r.name}}</div>
                <div class="panel-body">
                    {{r.description}}
                    <br>
                    <a href="javascript:void(0)" @click="gotoChat(r)">Entrar</a>
                </div>
            </div>
        </div>

        <input type="text" v-model="text" @keyup.enter="insertData">
        <ul>
        <li v-for="i in array">
            {{i.text}}
        </li>
        </ul>
    `,

    firebase: {
        array: db.ref('array')
    },
    data : function () {

        return {
            rooms: [
                {id: "001", name: "PHP", description: "Sala PHP"},
                {id: "002", name: "JAVA", description: "Sala JAVA"},
                {id: "003", name: "PYTHON", description: "Sala PYTHON"},
                {id: "004", name: "JAVASCRIPT", description: "Sala JAVASCRIPT"},
                {id: "005", name: "RUBY", description: "Sala RUBY"}
            ]
        }
    },
    methods:{
        gotoChat: function (room) {
            this.$route.router.go('/chat/'+ room.id);
        },
        insertData: function () {
          this.$firebaseRefs.array.push({
              text: this.text
          });
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
    }
});

router.start(appComponent,"#app");