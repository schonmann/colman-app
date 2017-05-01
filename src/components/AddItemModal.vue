<template>
    <div>
        <modal v-if="s" @close="hide"></modal>
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

<style lang="css">
</style>