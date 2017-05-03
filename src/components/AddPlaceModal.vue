<template>
    <div class="container">
        <modal v-if="s" @close="hide">
            <div slot="header">
                <span v-translate>NEW_PLACE</span>
            </div>
            <div slot="body">
                <div class="form-group">
                    <label v-translate>NAME</label>
                    <input type="text" class="form-control" v-model="place.name">
                </div>
            </div>
            </label>
            <div slot="footer">
                <button class="btn btn-success" @click="add"><span v-translate>ADD</span></button>
                <button class="btn light-primary-color" @click="hide"><span v-translate>CLOSE</span></button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue'
export default {
    'name': 'add-place-modal',
    'components': { Modal },
    data() {
        return {
            s: false,
            place: {},
            types: [],
            places: [],
        }
    },
    'methods': {
        show: function(callback){ 
            this.s = true; 
            this.callback = callback; //Callback function to return fresh new place.
            this.place = new Place();
        },
        hide: function(){ this.s = false;},
        add: function() { 
            this.callback(this.place);
            this.hide();
        }
    },
    mounted() {
        window.modalAddPlace = this;
    }
}
</script>

<style lang="css">
textarea {
    max-width: 100%;
}
</style>