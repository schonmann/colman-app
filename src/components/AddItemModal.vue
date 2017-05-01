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
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label v-translate>TYPE</label>
                            <select class="form-control" v-model="item.type">
                            <option disabled value=""><span v-translate>SELECT_ONE</span></option>
                            <option v-for="type,idx in typeList" v-bind:value="idx">{{type}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <label v-translate>PLACE</label>
                            <select class="form-control" v-model="item.place_id">
                            <option disabled value=""><span v-translate>SELECT_ONE</span></option>
                            <option>N/A</option>
                            <option v-for="p in placeList" v-bind:value="p.id">{{p.name}}</option>
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
                <button class="btn light-primary-color" @click="hide"><span v-translate>ADD</span></button>
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
        }
    },
    'methods': {
        show: function(){ this.s = true; },
        hide: function(){ this.s = false;},
        addItem: function() { 
            $emit('insertItem', item) && this.hide(); 
        }
    },
    mounted() {
        window.modalAddItem = this;
    }
}
</script>
