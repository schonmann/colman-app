<template>
  <div id="collection">
    <div class="jumbotron light-primary-color">
      <label v-if="items.empty()" v-translate>EMPTY_COLLECTION</label>
			<span v-else-if="items.empty(i=>!i.hide)" v-translate>NO_MATCH_FILTERS</span>
			<div v-else>
      	<item v-for="i,idx in items" v-if="!i.hide" :me="i" @click.native="showItem(i)" ></item>
			</div>
    </div>
		<button class="btn btn-md" @click="addPlace" v-translate>ADD_PLACE</button>
		<button class="btn btn-md" @click="addPerson" v-translate>ADD_PERSON</button>
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
	watch: {
		items: {
			handler: function(a){
			}, deep: true
		}
	},
	methods: {
		addItem: function () {
			modalAddItem.show((item)=>{
				Http.post('insertItem', item, (ok)=>{
					this.items.push(item);
					DataPackage.items.push(item);
					App.refreshFilter();
				}, (x,s,e)=>{
					alert("Error: " + s);
				});
			});
		},
		addPlace: function(){
			modalAddPlace.show((place)=>{
				Http.post('insertPlace', place, (ok)=>{
					DataPackage.places.push(place);
				}, (x,s,e)=>{
					alert("Error: " + s);
				});
			});
		},
		addPerson: function(){
			modalAddPerson.show((person)=>{
				Http.post('insertPerson', person, (ok)=>{
					DataPackage.people.push(person);
				}, (x,s,e)=>{
					alert("Error: " + s);
				});
			});
		},
		showItem: function (item) {
			modalShowItem.show(item,
				this.deleteItem,
				this.startItemLoan,
				this.endItemLoan);
		},
		deleteItem: function(item) {
			Http.post('deleteItem',item,(ok)=>{
				this.items.seekAndDestroy(i=>i.id===item.id);
			}, (x,s,e)=>{
				alert("Error: " + s);
			});
		},
		startItemLoan: function(item) {
			modalLoanItem.show((person)=>{
				var now = new Date().getTime();
				//Send to Web API via HTTP POST.
				var data = {item:item,person:person,date:now};
				Http.post('startLoan', data, (ok)=>{
					var loan = {item_id:item.id,person_id:person.id,start_date:now};
					DataPackage.items.first(i=>i.id === item.id).loans.push(loan);
					App.refreshFilter();
				}, (x,s,e)=>{
					alert("Error: " + s);
				});
			});
		},
		endItemLoan: function(item) {
			var now = new Date();
			var last = item.loans.last();
			var person = DataPackage.people.first(p=>p.id === last.person_id);
			Http.post('endLoan', { item: item, person: person, end_date: now},(ok)=>{
				last.ended = true; last.end_date = now;
				App.refreshFilter();
			}, (x,s,e)=>{
				alert("Error: " + s);
			});
		},
		/*When user hit the gray area, the interface
		will pop-up a item add modal. This setups click
		listener by class.*/
		prepareGrayAreaClickListeners: function () {
			var triggerClass = 'jumbotron'; var me = this;
			$('.' + triggerClass).click(function (e) {
				if (e.toElement.className.includes(triggerClass))
					me.addItem();
			});
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
</style>
