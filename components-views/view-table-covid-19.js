Vue.component('view-table-covid-19', {
    template: // html 
    `
        <div>
            <h2>Tabla Covid-19</h2>
            <comp-table-auto  v-bind:config="config_covid19"></comp-table-auto>
        </div>
    `,
    data: function() {
        return {
            config_covid19:
                {   
                    url_get:"https://api.thevirustracker.com/free-api?countryTimeline=AR", 
                    response:"countrytimelinedata",//"timelineitems",//"data",//"data[timelineitems]",
                    json2array: true,
                },
        }
    },
    methods:{
    }
});
