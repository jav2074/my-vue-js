Vue.component('view-table-price', {
        template: // html 
        `
            <div>
                <h2>{{title}}</h2>
                <comp-table-auto2 v-bind:data="data"></comp-table-auto2>

                <br>
                <div>
                <b-form-group label="Table Options" label-cols-lg="2">
                    <b-form-checkbox v-model="striped" inline>Striped</b-form-checkbox>
                    <b-form-checkbox v-model="bordered" inline>Bordered</b-form-checkbox>
                    <b-form-checkbox v-model="borderless" inline>Borderless</b-form-checkbox>
                    <b-form-checkbox v-model="outlined" inline>Outlined</b-form-checkbox>
                    <b-form-checkbox v-model="small" inline>Small</b-form-checkbox>
                    <b-form-checkbox v-model="hover" inline>Hover</b-form-checkbox>
                    <b-form-checkbox v-model="dark" inline>Dark</b-form-checkbox>
                    <b-form-checkbox v-model="fixed" inline>Fixed</b-form-checkbox>
                    <b-form-checkbox v-model="footClone" inline>Foot Clone</b-form-checkbox>
                    <b-form-checkbox v-model="noCollapse" inline>No border collapse</b-form-checkbox>
                </b-form-group>
                <b-form-group label="Head Variant" label-cols-lg="2">
                    <b-form-radio-group v-model="headVariant" class="mt-lg-2">
                        <b-form-radio :value="null" inline>None</b-form-radio>
                        <b-form-radio value="light" inline>Light</b-form-radio>
                        <b-form-radio value="dark" inline>Dark</b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <b-form-group label="Table Variant" label-for="table-style-variant" label-cols-lg="2">
                    <b-form-select
                        v-model="tableVariant"
                        :options="tableVariants"
                        id="table-style-variant">
                        <template v-slot:first>
                            <option value="">-- None --</option>
                        </template>
                    </b-form-select>
                </b-form-group>
            
                <b-table
                    :striped="striped"
                    :bordered="bordered"
                    :borderless="borderless"
                    :outlined="outlined"
                    :small="small"
                    :hover="hover"
                    :dark="dark"
                    :fixed="fixed"
                    :foot-clone="footClone"
                    :no-border-collapse="noCollapse"
                    :items="items"
                    :fields="fields"
                    :head-variant="headVariant"
                    :table-variant="tableVariant">
                </b-table>
                </div>

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
                title: "Tabla Price",
                get_url: "https://api.coindesk.com/v1/bpi/currentprice.json",

                fields: [],
                items:  [],
                // fields: ['first_name', 'last_name', 'age'],
                // items: [
                //     { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                //     { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                //     { age: 89, first_name: 'Geneva', last_name: 'Wilson' }
                // ],
                tableVariants: [
                    'primary',
                    'secondary',
                    'info',
                    'danger',
                    'warning',
                    'success',
                    'light',
                    'dark'
                ],
                striped: false,
                bordered: false,
                borderless: false,
                outlined: false,
                small: false,
                hover: false,
                dark: false,
                fixed: false,
                footClone: false,
                headVariant: null,
                tableVariant: '',
                noCollapse: false,
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
                // console.log("json2array");
                // console.log(result);
                return result;
            },
            getJsonKeys: function (json){
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
                    this.data.items_data = response.data.bpi;
                    this.data.items_data = this.json2array(this.data.items_data);
                    this.data.items_name = this.getJsonKeys(this.data.items_data);

                    this.fields = this.data.items_name;
                    this.items = this.data.items_data;
                })
                .catch(error => {this.data.errored = true; console.log(error);})
                .finally(() => this.data.loading = false);
        },
        //===============================================================================
    });
    