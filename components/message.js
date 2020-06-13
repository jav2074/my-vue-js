Vue.component('message-comp', {
    template: // html 
    `
        <div>
            <h2>Componente message-comp</h2>
            appName = {{ $parent.appName }}
            <br>
            appNumber = {{ $parent.appNumber }}
            <button 
                v-on:click="incParentNumber()"
                v-bind:class="'btn-primary'"
                class="btn btn-sm">
                +
            </button>
            <br>
            appNumber = {{ appNumber }}
            <button 
                v-on:click="incNumber()"
                v-bind:class="'btn-primary'"
                class="btn btn-sm">
                +
            </button>


            <div class="row">
                <div class="col-sm-4 p-3">
                    <input type="text" class="form-control" v-model="message">
                </div>
                <div class="col-sm-4 p-3 text-center">
                    <button 
                        v-on:click="moveMSG(message)"
                        v-bind:title="'Move'"
                        class="btn btn-info">
                        Move
                    </button>
                </div>
                <div class="col-sm-4 p-3">
                    {{ msg_moved }}
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            message: 'Hola Mundo !!!',
            msg_moved: '',
            appNumber: this.$parent.appNumber
        }
    },
    methods:{
        moveMSG: function(msg){
            this.msg_moved = msg;
        },
        incNumber: function(){
            this.appNumber++;
        },
        incParentNumber: function(){
            this.$parent.appNumber++;
        }
    }
});