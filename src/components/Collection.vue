<template>
  <div id="collection">
    <div class="jumbotron light-primary-color">
      <label v-if="items.empty()" v-translate>EMPTY_COLLECTION</label>
			<span v-else-if="items.empty(i=>!i.hide)" v-translate>NO_MATCH_FILTERS</span>
			<div v-else>
      	<item v-for="i,idx in items" v-if="!i.hide" :me="i" @click.native="showItem(i)" ></item>
			</div>
    </div>
	<div class="row" align="center">
		<div class="col-sm-6">
			<button style="float:right;" class="btn btn-sm cbtn btn-success" @click="addPlace" v-translate>ADD_PLACE</button>
		</div>
		<div class="col-sm-6">
			<button style="float:left;"  class="btn btn-sm cbtn btn-success" @click="addPerson" v-translate>ADD_PERSON</button>
		</div>
	</div>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
	components: { Item },
	name: 'collection',
	props: {
		items: { type: Array },
	},
	methods: {

		/**
			@method addItem
			@description Open modal to add a new item.
		*/

		addItem: function () {
			modalAddItem.show((item)=>{
				new ItemDAO().insert(item, ()=>{
					DataPackage.items.push(item);
					/* Emit refresh filter event to parent vue instance. */
					this.$emit('refreshfilter');
				}, this.onAjaxError);
			});
		},

		/**
			@method addPlace
			@description Open modal to add a new place.
		*/

		addPlace: function(){
			modalAddPlace.show((place)=>{
				new PlaceDAO().insert(place, ()=>{
					DataPackage.places.push(place);
				}, this.onAjaxError);
			});
		},

		/**
			@method addPerson
			@description Open modal to add a new user.
		*/

		addPerson: function(){
			modalAddPerson.show((person)=>{
				new PersonDAO().insert(person, ()=>{
					DataPackage.people.push(person);
				}, this.onAjaxError);
			});
		},

		/**
			@method showItem
			@description Show item info modal.
			@param {Object} item Target item.
		*/

		showItem: function (item) {
			modalShowItem.show(item,
				this.deleteItem,
				this.startItemLoan,
				this.endItemLoan);
		},

		/**
			@method deleteItem
			@description Callback function when user click's the delete button (item info modal).
			@param {Object} item Target item.
		*/

		deleteItem: function(item) {
			new ItemDAO().delete(item, ()=>{
				DataPackage.items.seekAndDestroy(i=>i.id===item.id);
			}, this.onAjaxError);
		},

		/**
			@method startItemLoan
			@description Callback function when user click's the start loan button (item info modal).
			@param {Object} item Target item.
		*/

		startItemLoan: function(item) {
			modalLoanItem.show((person)=>{
				new LoanDAO().startLoan(item,person,()=>{
					var loan = {item_id:item.id,person_id:person.id,start_date:new Date()};
					DataPackage.items.first(i=>i.id === item.id).loans.push(loan);
					/* Emit refresh filter event to parent vue instance. */
					this.$emit('refreshfilter');
				}, this.onAjaxError);
			});
		},

		/**
			@method endItemLoan
			@description Callback function when user click's the end loan button (item info modal).
			@param {Object} item Target item.
		*/

		endItemLoan: function(item) {
			var last = item.loans.last();
			var person = DataPackage.people.first(p=>p.id === last.person_id);
			new LoanDAO().endLoan(item, person,()=>{
				last.ended = true; 
				last.end_date = new Date();
				/* Emit refresh filter event to parent vue instance. */
				this.$emit('refreshfilter');
			}, this.onAjaxError);
		},
		
		/**
			@method prepareGrayAreaClickListeners
			@description When user hit the gray area, the interface will
						 pop-up a item add modal. This setups click listener by class
		*/

		prepareGrayAreaClickListeners: function () {
			var triggerClass = 'jumbotron'; var me = this;
			$('.' + triggerClass).click(function (e) {
				if (e.toElement.className.includes(triggerClass))
					me.addItem();
			});
		},
		onAjaxError: (x,s,e)=>{
			alert("Error: " + s);
		}
	},
	mounted() {
		this.prepareGrayAreaClickListeners();
		window.Collection = this;
	}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  h1
    color: #42b983
  .jumbotron
    text-align: center
    border-bottom: .05rem solid #e5e5e5
  .jumbotron .btn
    padding: .75rem 1.5rem
    font-size: 1.5rem
  label
    color: gray
  .cbtn
    box-shadow: 2px 3px 3px #AAA
</style>
