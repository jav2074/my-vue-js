Vue.component('table-auto-comp', {
    //===============================================================================
    template: // html 
    `
    <div>
        <h1>{{ title }}</h1>
        <section v-if="errored">
            <p>Lo sentimos, no es posible obtener la información en este momento,
            por favor intente nuevamente mas tarde</p>
        </section>
        <section v-else>
            <div v-if="loading">Cargando...</div>
            <div v-else>

                <table class="table">
                    <thead>
                        <tr class="btn-dark">
                            <th>index</th>
                            <th v-for="column in items_name">
                                {{ column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data"  class="btn-secondary">
                            <td>{{index}}</td>
                            <td v-for="column in items_name">
                                {{ row[column] }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="btn-dark">
                            <th>index</th>
                            <th v-for="column in items_name">
                                {{ column }}
                            </th>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </section>
    </div>
    `,
    //===============================================================================
    data: function() {
        return {
            title: 'Titulo de la Tabla',
            data: [],
            loading: true,
            errored: false,
            items_name: [],
        }
    },
    //===============================================================================
    // props:['config'],
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
            this.items_name = keys;
            console.log("getJsonKeys");
            console.log(this.items_name);
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
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => {
                this.data = response.data.bpi; 
                this.data = this.json2array(this.data);
                this.getJsonKeys(this.data);
            })
            .catch(error => {this.errored = true; console.log(error);})
            .finally(() => this.loading = false);
    },
    //===============================================================================
});