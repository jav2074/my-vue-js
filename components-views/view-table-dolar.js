Vue.component('view-table-dolar', {
    template: // html 
    `
        <div>
            <h2>Tabla Dolar</h2>
            <comp-table-auto  v-bind:config="config_dolar"></comp-table-auto>
        </div>
    `,
    data: function() {
        return {
            config_dolar:
                {   
                    url_get:"https://mindicador.cl/api/dolar", 
                    response:"serie",
                    json2array: true,
                },
        }
    },
    methods:{
    }
});
