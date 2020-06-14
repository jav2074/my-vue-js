Vue.component('comp-table-auto2', {
    //===============================================================================
    template: // html 
    `
    <div>
        <section v-if="data.errored">
            <p>Lo sentimos, no es posible obtener la información en este momento,
            por favor intente nuevamente mas tarde</p>
        </section>
        <section v-else>
            <div v-if="data.loading">Cargando...</div>
            <div v-else>

                <table class="table">
                    <thead>
                        <tr class="btn-dark">
                            <th>index</th>
                            <th v-for="column in data.items_name">
                                {{ column }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in data.items_data"  class="btn-secondary">
                            <td>{{index}}</td>
                            <td v-for="column in data.items_name">
                                {{ row[column] }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr class="btn-dark">
                            <th>index</th>
                            <th v-for="column in data.items_name">
                                {{ column }}
                            </th>
                        </tr>
                    </tfoot>
                </table>

                {{ data }}

            </div>
        </section>
    </div>
    `,
    //===============================================================================
    data: function() {
        return {
            // tdata:      this.data,
        }
    },
    //===============================================================================
    props:['data'],
    //===============================================================================
    methods:{
    },
    //===============================================================================
    filters: {
    },
    //===============================================================================
});