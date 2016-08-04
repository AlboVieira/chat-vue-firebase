define(['firebase'], function (firebaseApp) {
    var db = firebaseApp.database();
    return Vue.extend({
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
});