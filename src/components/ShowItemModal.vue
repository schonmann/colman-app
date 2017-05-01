<template>
    <div class="container">
        <modal v-if="s" @close="hide">
            <div slot="header">
                <span v-translate>ITEM_INFO</span>
            </div>
            <div slot="body">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label v-translate>NAME</label>
                            <input type="text" class="form-control" v-model="item.name">
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label v-translate>TYPE</label>
                            <select class="form-control" v-model="item.type">
                            <option disabled><span v-translate>SELECT_ONE</span></option>
                            <option v-for="type,idx in types" v-bind:value="idx"><span v-translate>{{type}}</span></option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label v-translate>PLACE</label>
                            <select class="form-control" v-model="item.place_id">
                            <option disabled><span v-translate>SELECT_ONE</span></option>
                            <option>N/A</option>
                            <option v-for="p in places" v-bind:value="p.id">{{p.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label v-translate>DESCRIPTION</label>
                    <textarea class="form-control" v-model="item.description"></textarea>
                </div>
            </div>
            </label>
            <div slot="footer">
                <button class="btn btn-warning" @click="del"><span v-translate>DELETE</span></button>
                <button class="btn light-primary-color" @click="hide"><span v-translate>CLOSE</span></button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue'
export default {
    'name': 'show-item-modal',
    'components': { Modal },
    data() {
        return {
            s: false,
            item: {
                name: "",
                description: "",
            },
        }
    },
    'methods': {
        show: function(item){ 
            this.item.id = item.id;
            this.item.name = item.name;
            this.item.description = item.description;
            //Show modal.
            this.s = true; 
        },
        hide: function(){ this.s = false;},
        addItem: function() { 
            $emit('insertItem', item) && this.hide(); 
        }
    },
    mounted() {
        window.modalShowItem = this;
    }
}
</script>

<style lang="css">
</style>