/**
 * Created by albo-vieira on 04/08/16.
 */
define(['firebase'], function (firebaseApp) {
    var db = firebaseApp.database();
    return Vue.extend({
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
});