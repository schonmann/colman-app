<template>
    <div style="padding-top:20px;padding-bottom:30px;">
        <div class="row" style="padding-bottom:10px;">
            <div class="col-lg-3" v-translate>ORDER_BY</div>
            <div class="col-lg-3" v-translate>TYPE</div>
            <div class="col-lg-3" v-translate>STATUS</div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <select class="form-control" v-model="filter.field" @change="onfilterchanged">
                    <option disabled><span v-translate>SELECT_ONE</span></option>
                    <option v-for="(v,k) in fields" v-bind:value="v"><span v-translate>{{k}}</span></option>
                </select>
            </div>
            <div class="col-lg-3">
                <select class="form-control" v-model.number="filter.type" @change="onfilterchanged">
                    <option selected value="-1"><span v-translate>ALL</span></option>
                    <option v-for="(t,i) in types" v-bind:value="i"><span v-translate>{{t}}</span></option>
                </select>
            </div>
            <div class="col-lg-3">
                <select class="form-control" v-model="filter.loaned" @change="onfilterchanged">
                    <option disabled><span v-translate>SELECT_ONE</span></option>
                    <option v-for="(v,k) in statuses" v-bind:value="v"><span v-translate>{{k}}</span></option>
                </select>
            </div>
            <div class="col-lg-3">
                <form id="sf" class="search-form">
                    <div class="form-group has-feedback">
                        <label for="search" class="sr-only">Search</label>
                        <input type="text" class="form-control" v-model="filter.search" @change="onfilterchanged" name="search" id="search" placeholder="search">
                        <span class="glyphicon glyphicon-search form-control-feedback"></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>



<script>
export default {
    'name': 'collection-filters',
    data() {
        return {
            filter: {},
            fields: [],
            statuses: [],
        }
    },
    'props': {types : {type:Array}},
    'methods': {
        //When any filter change is detected this method will be called, 
        //and a filter change event will be fired so that the parent 
        //component can handle it.
        onfilterchanged: function(){
            this.$emit('filterchange', this.filter);
        },
    },
    mounted() {
        this.fields = {
            "NAME": "Name",
            "DESCRIPTION": "Description",
            "TYPE": "Type",
        };
        this.statuses = {
            "NOT_LOANED": false,
            "LOANED": true,
        };
        //Set filter defaults.
        this.filter.loaned = this.statuses.NOT_LOANED;
        this.filter.field = this.fields.NAME
        this.filter.search = "";
        this.filter.type = -1;
    }
}
</script>

<style lang="css">
textarea {
    max-width: 100%;
}
</style>