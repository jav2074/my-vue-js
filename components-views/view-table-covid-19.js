Vue.component('view-table-covid-19', {
    template: // html 
    `
        <div>
            <h2>{{title}}</h2>
            <comp-table-auto2 v-bind:data="data"></comp-table-auto2>
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
            title: "Tabla Covid-19",
            get_url: "https://api.thevirustracker.com/free-api?countryTimeline=AR",
        }
    },
    //===============================================================================
    methods:{
        //-----------------------------------------------------------------------
        json2array: function(json)
        {
            var result = [];
            var keys = Object.keys(json);
            keys.forEach(function(key)
            {
                //----------------------------------------------------------
                var aux = key.split('/');
                for(var i=0; i<aux.length; i++)
                {
                    aux[i] = parseInt(aux[i]);
                    aux[i] = aux[i] < 10 ? '0' + aux[i] : aux[i];
                };
                var date = "20"+aux[2]+"/"+aux[0]+"/"+aux[1];
                json[key].date = date;
                //----------------------------------------------------------
                result.push(json[key]);
                // debugger;
            });
            // Eliminando el último elemento
            result.pop();
            // console.log("json2array");
            // console.log(result);
            return result;
        },
        //-----------------------------------------------------------------------
        getJsonKeys: function (json)
        {
            var keys = Object.keys(json[0]);
            keys.sort();
            // console.log("getJsonKeys");
            // console.log(keys);
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
            .get(this.get_url)
            .then(response => {
                this.data.items_data = response.data.timelineitems;//countrytimelinedata;
                this.data.items_data = this.json2array(this.data.items_data[0]);
                this.data.items_name = this.getJsonKeys(this.data.items_data);
            })
            .catch(error => {this.data.errored = true; console.log(error);})
            .finally(() => this.data.loading = false);
    },
    //===============================================================================
});
