<template>
    <div class="container">
        <modal v-if="s" @close="hide">
            <div slot="header">
                <span v-translate>ITEM_INFO</span>
            </div>
            <div slot="body">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="form-group">
                            <span class="form-title" v-translate>NAME</span>
                            <span class="form-field">{{itemDTO.name}}</span>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="form-group">
                            <span class="form-title" v-translate>TYPE</span>
                            <span class="form-field" v-translate>{{itemDTO.type}}</span>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="form-group">
                            <span class="form-title" v-translate>PLACE</span>
                            <span class="form-field">{{itemDTO.place}}</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <span class="form-title" v-translate>DESCRIPTION</span>
                    <span class="form-field">{{itemDTO.description}}</span>
                </div>
            </div>
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
            itemDTO: new Item(),
            item: {}
        }
    },
    'methods': {
        show: function(item, callback){
            this.callback = callback;
            this.item = item;
            //Build DTO to display data properly.
            this.itemDTO.id = item.id;
            this.itemDTO.name = item.name;
            this.itemDTO.type = DataPackage.types[item.type];
            this.itemDTO.place = DataPackage.places.first(p=>p.id===item.place_id);
            this.itemDTO.description = item.description;
            //Show modal.
            this.s = true; 
        },
        hide: function(){ this.s = false;},
        del: function() {
            this.callback(this.item);
            this.hide();
        }
    },
    mounted() {
        window.modalShowItem = this;
    }
}
</script>

<style lang="css">
.form-title{
    display:block;
    color:gray;
}
.form-field {
    color: gray;
    word-break: break-all;
}
</style>