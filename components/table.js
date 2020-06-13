Vue.component('table-comp', {
    template: // html 
    `
    <table class="table">
        <thead>
            <tr class="btn-dark">
                <th></th>
                <th>Index</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Monto</th>
                <th>Pago</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr class="btn-dark">
                <td></td>
                <td></td>
                <td>
                    <input type="text" class="form-control" v-model="newItem.name">
                </td>
                <td>
                    <input type="text" class="form-control" v-model="newItem.descript">
                </td>
                <td>
                    <input type="number" class="form-control" v-model.number="newItem.amount">
                </td>
                <td>
                    <input type="checkbox" class="form-control" v-model="newItem.paid">
                </td>
                <td class="text-center">
                    <button 
                        v-on:click="addItem()"
                        class="btn btn-success btn-sm">
                        Add
                    </button>
                </td>
            </tr>

            <tr v-if="items.length === 0">
                <td colspan="4" class="text-center">
                    No hay Registros
                </td>
            </tr>

            <tr v-for="(item, index) in items" v-bind:class="item.paid ? 'btn-info':'btn-secondary'">
                <td>
                    <button 
                        v-on:click="removeItem(index)"
                        v-bind:title="'Delete'"
                        class="btn btn-danger btn-sm">
                        <i class="">X</i>
                    </button>
                </td>
                <td>{{index}}</td>
                <td>{{item.name}}</td>
                <td>{{item.descript}}</td>
                <td>{{item.amount.toFixed(2)}}</td>
                <td>{{item.paid}}</td>
                <td class="text-center" v-bind:title="item.paid ? 'SI' : 'NO'">
                    <button 
                    v-on:click="changeToPaid(item)"
                    v-bind:class="item.paid ? 'btn-primary' : 'btn-warning'"
                    class="btn btn-sm">
                        <i v-if="item.paid" class="">OK</i>
                        <i v-if="!item.paid" class="">NOK</i>
                    </button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="text-danger">
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right">Por pagar</td>
                <td>{{ totalAmount(0) }}</td>
                <td></td>
            </tr>
            <tr class="text-success">
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right">Pagado</td>
                <td>{{ totalAmount(1) }}</td>
                <td></td>
            </tr>
            <tr class="text-info">
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right">Total</td>
                <td>{{ totalAmount(2) }}</td>
                <td></td>
            </tr>
            </tfoot>
    </table>
    `,
    data: function() {
        return {
            newItem:{
                name:'',
                descript:'',
                amount:0,
                paid:false
            },
            // items:[
            //     {name:"Vero", descript:"Musica", amount:200, paid:false},
            //     {name:"Romy", descript:"Secretaria", amount:100, paid:false},
            //     {name:"Lu", descript:"Tetona", amount:400, paid:true}
            // ]
        }
    },
    props:['items'],
    methods:{
        removeItem: function(index){
            this.items.splice(index, 1);
        },
        addItem: function(){
            this.newItem.amount = parseFloat(this.newItem.amount);
            this.items.push(this.newItem);
            console.log(JSON.stringify(this.newItem));
            this.newItem = {name:'',descript:'',amount:0,paid:false};
        },
        changeToPaid: function(item){
            item.paid = !(item.paid);
        },
        totalAmount: function(paid){
            var total = this.items.reduce(function(a, b){
                switch(paid)
                {
                    case 0: return a + (!b.paid ? b.amount : 0);
                    case 1: return a + (b.paid ? b.amount : 0);
                    case 2: return a + b.amount;
                }
            },0);
            return total.toFixed(2);
        }
    }
});