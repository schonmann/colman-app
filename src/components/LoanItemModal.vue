<template>
    <div class="container">
        <modal v-if="s" @close="hide">
            <div slot="header">
                <span v-translate>LOAN_ITEM</span>
            </div>
            <div slot="body">
                <div class="row">
                    <div class="col-lg-2">
                        <span v-translate>NAME</span>
                    </div>
                    <div class="col-lg-8">
                        <div class="form-group">
                            <select class="form-control" v-model="person">
                            <option disabled><span v-translate>SELECT_ONE</span></option>
                            <option v-for="p,idx in people" v-bind:value="p"><span>{{p.name}}</span></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="person.id">
                    <div class="col-sm-4">
                        <div v-translate>PHONE</div>
                        <span>{{person.phone}}</span>
                    </div>
                    <div class="col-sm-8">
                        <div v-translate>EMAIL</div>
                        <span>{{person.email}}</span>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button class="btn btn-success" @click="doloan"><span v-translate>START_LOAN</span></button>
                <button class="btn light-primary-color" @click="hide"><span v-translate>CLOSE</span></button>
            </div>
        </modal>
    </div>
</template>

<script>
import Modal from './Modal.vue'
export default {
    'name': 'loan-item-modal',
    'components': { Modal },
    data() {
        return {
            s: false,
            person: {},
        }
    },
    'methods': {
        show: function(onloan){ 
            this.onloan = onloan; //Callback function to return fresh new item.
            this.people = DataPackage.people;
            this.s = true; 
        },
        hide: function(){ this.s = false;},
        doloan: function() {
            if(!this.person.id) return;
            this.onloan(this.person);
            this.hide();
        }
    },
    mounted() {
        window.modalLoanItem = this;
    }
}
</script>

<style lang="css">
textarea {
    max-width: 100%;
}
</style>