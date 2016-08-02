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

//app
var appComponent = Vue.extend({});

Vue.component('my-chat',chatComponent);

//router
var router = new VueRouter();
router.map({
    '/chat': {
        component: chatComponent
    }
});

router.start(appComponent,"#app");