<template>
  <div id="collection">
    <div class="jumbotron light-primary-color ">
      <label v-if="items.empty()" v-translate>EMPTY_COLLECTION</label>
      	<item v-else v-for="i,idx in items" :me="i" @click.native="showItem(i)" ></item>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
	components: { Item },
	name: 'collection',
	data() {
		return {
			items: [] 
		}
	},
	methods: {
		addItemToCollection: function () {
			modalAddItem.show((item)=>{
				Http.post('insertItem', item, (ok)=>{
					this.items.push(item);
				}, (x,s,e)=>{
					alert("Error: " + s);
				});
			});
		},
		showItem: function (item) {
			modalShowItem.show(item,(item)=>{
				Http.post('deleteItem',item,(ok)=>{
					this.items.seekAndDestroy(i=>i.id===item.id);
				}, (x,s,e)=>{
					alert("Error: " + s);
				});
			});
		},
	/*Ajax Web API service to get collection items.*/
		populateItemList: function () {
			var context = this;
			Http.get('getAllItems', function (items) {
				if (items.any()) context.items = items;
			});
		},
	/*When user hit the gray area, the interface
	will pop-up a item add modal. This setups click
	listener by class.*/
		prepareGrayAreaClickListeners: function () {
			var triggerClass = 'jumbotron'; var me = this;
			$('.' + triggerClass).click(function (e) {
				if (e.toElement.className.includes(triggerClass))
					me.addItemToCollection();
			});
		}
	},
	mounted() {
		this.populateItemList();
		this.prepareGrayAreaClickListeners();
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
