<template>
    <div class="container">
        <modal v-if="s" @close="hide">
            <div slot="header">
                <span v-translate>NEW_PERSON</span>
            </div>
            <div slot="body">
                <div class="row">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <label v-translate>NAME</label>
                                <input type="text" class="form-control" v-model="person.name">
                            </div>
                            <div class="col-sm-6">
                                <label v-translate>PHONE</label>
                                <input type="text" class="form-control" v-model="person.phone">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <label v-translate>EMAIL</label>
                                <input type="text" class="form-control" v-model="person.email">
                            </div>
                        </div>
                    </div>
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
    'name': 'add-person-modal',
    'components': { Modal },
    data() {
        return {
            s: false,
            person: {},
            types: [],
            people: [],
        }
    },
    'methods': {
        show: function(onadd){
            this.onadd = onadd; //Callback function to return fresh new person.
            this.person = new Person();
            this.s = true;
        },
        hide: function(){ this.s = false;},
        add: function() { 
            this.onadd(this.person);
            this.hide();
        }
    },
    mounted() {
        window.modalAddPerson = this;
    }
}
</script>

<style lang="css">
textarea {
    max-width: 100%;
}
</style>