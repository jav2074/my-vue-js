Vue.component('view-table-covid-19', {
    template: // html 
    `
        <div>
            <h2>Tabla Covid-19</h2>
            <comp-table-auto2  v-bind:data="data"></comp-table-auto2>
        </div>
    `,
    data: function() {
        return {
            data:
            {            
                loading: true,
                errored: false,
                items_data: [],
                items_name: [],
            },
        }
    },
    //===============================================================================
    methods:{
        //-----------------------------------------------------------------------
        json2array: function(json){
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function(key){
                result.push(json[key]);
            });
            console.log("json2array");
            console.log(result);
            return result;
        },
        getJsonKeys: function (json){
            var keys = Object.keys(json[0]);
            console.log("getJsonKeys");
            console.log(keys);
            return keys;
        },
        //-----------------------------------------------------------------------
    },
    //===============================================================================
    filters: {
    },
    //===============================================================================
    mounted () {
        axios
            .get("https://api.thevirustracker.com/free-api?countryTimeline=AR")
            .then(response => {
                this.data.items_data = response.data.countrytimelinedata;
                this.data.items_data = this.json2array(this.data.items_data);
                this.data.items_name = this.getJsonKeys(this.data.items_data);
            })
            .catch(error => {this.data.errored = true; console.log(error);})
            .finally(() => this.data.loading = false);
    },
    //===============================================================================
});
