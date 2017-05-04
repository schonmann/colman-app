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
                <div class="row form-group">
                    <div class="col-lg-12">
                        <span class="form-title" v-translate>DESCRIPTION</span>
                        <span class="form-field">{{itemDTO.description}}</span>
                    </div>
                </div>

                <div v-if="currentlyLoaned()">
                    <div class="loanlabel">Dados de Empréstimo</div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="form-group">
                                <span class="form-title" v-translate>NAME</span>
                                <span class="form-field">{{person.name}}</span>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="form-group">
                                <span class="form-title" v-translate>PHONE</span>
                                <span class="form-field">{{person.phone}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="form-group">
                                <span class="form-title" v-translate>EMAIL</span>
                                <span class="form-field">{{person.email}}</span>
                            </div>
                        </div>
                        <!--<div class="col-lg-4">
                            <div class="form-group">
                                <span class="form-title" v-translate>Data</span>
                                <span class="form-field">{{lastloandate}}</span>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
            <div slot="footer">
                <button v-if="currentlyLoaned()" style="float:left" class="btn btn-success" @click="endloan"><span v-translate>END_LOAN</span></button>
                <button v-else style="float:left" class="btn btn-success" @click="loan"><span v-translate>LOAN_ITEM</span></button>
                <button class="btn btn-danger" @click="del"><span v-translate>DELETE</span></button>
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
            item: {},
            person: {},
        }
    },
    'computed':{
        lastloandate: function(){
            return this.item.loans.any() ? this.item.loans.last().start_date : null;
        }
    },
    'methods': {
        show: function(item, ondel, onloan, onendloan){
            this.ondel = ondel;
            this.onloan = onloan;
            this.onendloan = onendloan;
            this.item = item;
            //Build item DTO to display info properly.
            this.itemDTO.id = item.id;
            this.itemDTO.name = item.name;
            this.itemDTO.type = DataPackage.types[item.type];
            this.itemDTO.place = item.place_id ? DataPackage.places.first(p=>p.id===item.place_id).name : "N/A";
            this.itemDTO.description = item.description;
            
            if(this.currentlyLoaned()){
                var lastCarrierId = item.loans.last().person_id;
                this.person = DataPackage.people.first(p=>p.id === lastCarrierId)
            }
            //Show modal.
            this.s = true; 
        },
        hide: function(){ this.s = false;},
        del: function() {
            this.ondel(this.item);
            this.hide();
        },
        loan: function() {
            this.onloan(this.item);
            this.hide();
        },
        endloan: function() {
            this.onendloan(this.item);
            this.hide();
        },
        currentlyLoaned: function() {
            return !ItemBusiness.isAvailable(this.item);
        },
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
.loanlabel{
    color: #22AA11;
    margin-bottom:10px;
    margin-top:10px;
}
</style>