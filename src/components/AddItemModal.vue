<template>
    <div class="container">
        <modal v-if="s" @close="hide">
            <div slot="header">
                <span v-translate>NEW_ITEM</span>
            </div>
            <div slot="body">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label v-translate>NAME</label>
                            <input type="text" class="form-control" v-model="item.name">
                        </div>
                    </div>
                    <div class="col-lg-4" v-if="!editing">
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
                            <option value="">N/A</option>
                            <option v-for="p in places" v-bind:value="p.id">{{p.name}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="form-group">
                            <label v-translate>IMG_URL</label>
                            <input type="text" class="form-control" v-model="item.img">
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
                <button class="btn btn-success" @click="add"><span v-translate>OK</span></button>
                <button class="btn light-primary-color" @click="hide"><span v-translate>CLOSE</span></button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue'
export default {
    'name': 'add-item-modal',
    'components': { Modal },
    data() {
        return {
            s: false,
            item: {},
            types: [],
            places: [],
        }
    },
    'methods': {
        show: function(callback, itemToEdit){ 
            this.s = true; 
            this.callback = callback; //Callback function to return fresh new item.
            this.types = DataPackage.types;
            this.places = DataPackage.places;
            this.editing = typeof(itemToEdit) !== 'undefined';
            this.item = this.editing ? itemToEdit : new Item();
        },
        hide: function(){ this.s = false;},
        add: function() {
            this.callback(this.item);
            this.hide();
        }
    },
    mounted() {
        window.modalAddItem = this;
    }
}
</script>

<style lang="css">
textarea {
    max-width: 100%;
}
</style>