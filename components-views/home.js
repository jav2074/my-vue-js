Vue.component('home-view', {
    template: // html 
    `
        <div>
            <h2>View Home</h2>
            <h4>{{message}}</h4>
            <message-comp></message-comp>
            <table-comp v-bind:items="items_home"></table-comp>
        </div>
    `,
    data: function() {
        return {
            message: 'Hola desde Home !!!',
            items_home:[
                {name:"Vero", descript:"HomeMusica", amount:2100, paid:false},
                {name:"Romy", descript:"HomeSecretaria", amount:1100, paid:false},
                {name:"Lu", descript:"HomeTetona", amount:4100, paid:true}
            ],
            appName: 'Iniciando con Vuejs2 desde Home',
            appNumber: 10
        }
    },
    methods:{
        incNumber: function(){
            this.appNumber++;
        },
    }
});