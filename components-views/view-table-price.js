Vue.component('view-table-price', {
    template: // html 
    `
        <div>
            <h2>Tabla Price</h2>
            <comp-table-auto  v-bind:config="config_price"></comp-table-auto>
        </div>
    `,
    data: function() {
        return {
            config_price:
                {   
                    url_get:"https://api.coindesk.com/v1/bpi/currentprice.json", 
                    response:"bpi",
                    json2array: true,
                },
        }
    },
    methods:{
    }
});
