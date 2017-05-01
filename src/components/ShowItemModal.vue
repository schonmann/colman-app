<template>
    <div>
        <modal v-if="s" @close="hide">
            <label slot="header">
            Informações - {{item.name}}
            </label>
            <label slot="body">
            asdasdasdasdlt
            </label>
            <label slot="footer">
            asdasdasdasdasdasdsadasd
            </label>
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