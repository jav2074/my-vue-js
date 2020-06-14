Vue.component('view-table-price', {
        template: // html 
        `
        <div>
            <h2>{{title}}</h2>

            <section v-if="errored">
                <br>
                <b-alert show variant="danger">
                    <p>Lo sentimos, no es posible obtener la información en este momento,
                    por favor intente nuevamente mas tarde</p>
                    <p>{{errorMsg}}</p>
                </b-alert>
            </section>
            <section v-else>

                <b-row>
                    <b-col sm="6" class="my-3">
                        <b-form-group
                            label="Filter"
                            label-cols-sm="3"
                            label-cols-ms="2"
                            label-cols-lg="1"
                            label-align-sm="left"
                            label-size="sm"
                            label-for="filterInput"
                            class="mb-0">
                            <b-input-group size="sm">
                                <b-form-input
                                    v-model="filter"
                                    type="search"
                                    id="filterInput"
                                    placeholder="Type to Search">
                                </b-form-input>
                            </b-input-group>
                        </b-form-group>
                    </b-col>            
                    <b-col sm="6" class="my-3">
                    </b-col>
                </b-row>

                <b-table responsive 
                    :sticky-header="stickyHeader"
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
                    :table-variant="tableVariant"
                    :no-footer-sorting="true"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    :filter="filter"
                    :current-page="currentPage"
                    :per-page="perPage"
                    :busy.sync="loading">
                </b-table>

                <b-row>
                    <b-col sm="4" class="my-3">
                        <b-form-group
                            label="Per page"
                            label-cols-sm="6"
                            label-cols-ms="4"
                            label-cols-lg="3"
                            label-align-sm="left"
                            label-size="sm"
                            label-for="perPageSelect"
                            class="mb-0">
                            <b-form-select
                                v-model="perPage"
                                id="perPageSelect"
                                size="sm"
                                :options="pageOptions">
                            </b-form-select>
                        </b-form-group>
                    </b-col>                
                    <b-col sm="6" class="my-3">
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            size="sm"
                            class="my-0">
                        </b-pagination>
                    </b-col>
                    <b-col sm="2" class="my-3">
                        <b-button 
                            size="sm"
                            class="float-right"
                            block
                            variant="primary"
                            v-b-toggle.collapse-1 >
                            Config Table
                        </b-button>
                    </b-col>
                </b-row>

                <b-collapse id="collapse-1" class="mt-2">
                    <b-form-group label="Table Options" label-cols-lg="2">
                        <b-form-checkbox v-model="sortHab" inline>Sort</b-form-checkbox>
                        <b-form-checkbox v-model="stickyHeader" inline>Sticky Header</b-form-checkbox>
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
                </b-collapse>
            </section>
        </div>
        `,
        data: function() {
            return {
                data:
                {            
                    
                },
                title: "Tabla Price",
                get_url: "https://api.coindesk.com/v1/bpi/currentprice.json",
                loading: true,
                errored: false,
                errorMsg: '',
                fields: [],
                items:  [],
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
                stickyHeader: false,
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
                sortBy: '',
                sortDesc: false,
                sortHab: true,
                filter: null,
                totalRows: 1,
                currentPage: 1,
                perPage: 1,
                pageOptions: [1, 2, 5, 10, 15],
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
                return result;
            },
            getJsonKeys: function (json, sortHab){
                var result = [];
                var keys = Object.keys(json[0]);
                keys.sort();
                keys.forEach(function(item)
                {
                    result.push({ key: item, sortable: sortHab });
                });
                return result;
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
                    this.items = response.data.bpi;
                    this.items = this.json2array(this.items);
                    this.fields = this.getJsonKeys(this.items, this.sortHab);
                    // Pagination: Set the initial number of items
                    this.totalRows = this.items.length
                })
                .catch(error => {
                    this.errored = true;
                    this.errorMsg = error;  
                    console.log(error);
                })
                .finally(() => this.loading = false);
        },
        //===============================================================================
    });
    