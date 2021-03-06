<template>
	<div id="app" class="container">
		<div class="container">
			<div class="header">
				<h3 class="text-muted" style="display:inline-block;">
					<i class="fa fa-chevron-left secondary-text-color"></i>
						&nbsp<label v-translate>APP_TITLE</label>&nbsp
					<i class="fa fa-chevron-right secondary-text-color"></i>
				</h3>
				<div class="row" style="float:right;">
					<button class="btn btn-default btn-xs" @click="$translate.setLang('en');">EN</button>
					<button class="btn btn-default btn-xs" @click="$translate.setLang('pt');">PT</button>
				</div>
			</div>
			<collection-filters @filterchange="onFilterChanged" :types="types"></collection-filters>
			<collection @refreshfilter="refreshFilter" :items="items"></collection>
			<marketing></marketing>
			<div class="footer">
				<p>Developed by Antonio C. Schönmann Alves</p>
			</div>
		</div>
		<!-- Modals! [START] -->
		<add-person-modal></add-person-modal>
		<loan-item-modal></loan-item-modal>
		<add-item-modal></add-item-modal>
		<show-item-modal></show-item-modal>
		<add-place-modal></add-place-modal>
		<loan-item-modal></loan-item-modal>
		<!-- Modals! [END] -->
	</div>
</template>

<script>

import Collection from './components/Collection'
import AddItemModal from './components/AddItemModal'
import ShowItemModal from './components/ShowItemModal'
import AddPlaceModal from './components/AddPlaceModal'
import AddPersonModal from './components/AddPersonModal'
import LoanItemModal from './components/LoanItemModal'
import CollectionFilters from './components/CollectionFilters'
import Marketing from './components/Marketing'

export default {
	'components': { 
		Collection, 
		AddItemModal, 
		ShowItemModal, 
		AddPlaceModal, 
		AddPersonModal, 
		LoanItemModal, 
		CollectionFilters, 
		Marketing 
	},
	'data': function(){
		return {
			types: [],
			places: [],
			people: [],
			items: [],
			lastFilter: {},
		}	
	},
	'methods': {

		/**
			@method populateItemsLoans
			@description Iterate asynchronously through the item list, making AJAX calls
						 to the Web API in order to populate all it's loans info.
			@param {Array} itemList Item list.
		*/

		populateItemsLoans: function(itemList, callback, fallback) {
			itemList.asyncEach((item,next,stop)=>{
				new LoanDAO().getByItem(item, (loans)=>{
					item.loans = loans; next();
				}, fallback);
			}, callback);
		},
		
		/**
			@method getDatePackage
			@description Get relevant data from Web API through AJAX calls.
			@param {Function} callback success procedure.
			@param {Function} fallback failure procedure.
			@return {Object} Wrapper with all relevant data.
		*/

		getDataPackage: function(callback,fallback) {
			new InfoDAO().getAllTypes((types)=>{
				new PlaceDAO().getAll((places)=>{
					new PersonDAO().getAll((people)=>{
						new ItemDAO().getAll((items)=>{
							this.populateItemsLoans((items),()=>{
								var wrapper = {};
								wrapper.types = types;
								wrapper.places = places;
								wrapper.people = people;
								wrapper.items = items;
								callback(wrapper);
							},fallback);
						},fallback);
					},fallback);
				},fallback);
			},fallback);
		},
		
		/**
			@method doAjax
			@description Bind requested data to Vue instance data, and create a DataPackage reference to this data.
		*/

		doAjax: function(){
			this.getDataPackage((dto)=>{
				this.types = dto.types; 
				this.places = dto.places;
				this.people = dto.people; 
				this.items = dto.items;
				window.DataPackage = dto;
			}, (x,s,e)=>{
				alert("Error: " + s);
			});
		},

		/**
			@method onFilterChanged
			@description Method called after 'filterChanged' event get's fired.
						 Filter and sort the items based on UI filtering options.
			@param {Object} filters Wraps filtering options into an object.
		*/
		
		onFilterChanged: function(filters){
			this.lastFilter = filters;
			this.items.each((i)=>{
				//Type is set to 'All' or matches the current item type.
				var matchesType = filters.type === -1 || i.type === filters.type;
				//Filter matches the item loans status.
				var matchesLoanStatus = (filters.is_loaned == !ItemBusiness.isAvailable(i));
				//'All' status selected.
				matchesLoanStatus = matchesLoanStatus || filters.is_loaned === -1;
				//Search matches item name.
				var matchesSearch = i.name.toLowerCase().includes(filters.query.toLowerCase());
				//Search matches item description.
				matchesSearch = matchesSearch || i.description.toLowerCase().includes(filters.query.toLowerCase());
				//Search matches person attributes, if it is currently being carried by someone.
				var carrier = ItemBusiness.getCurrentCarrier(i, DataPackage.people);
				if(carrier && filters.query.length > 0){
					matchesSearch = matchesSearch || carrier.name.toLowerCase().includes(filters.query.toLowerCase());
					matchesSearch = matchesSearch || carrier.phone.toLowerCase().includes(filters.query.toLowerCase());
					matchesSearch = matchesSearch || carrier.email.toLowerCase().includes(filters.query.toLowerCase());
				}
				//Flag to show or hide item based on all the previous matches.
				if(!(matchesType && matchesLoanStatus && matchesSearch)) i.hide = true;
				else delete i.hide;
			});
			//Sort items based on chosen field.
			this.items.sort((a,b)=>{return a[filters.field] > b[filters.field]});
			this.items.refresh();
		},

		/**
			@method refreshFilter
			@description Refresh item list to filter newly added objects.
						 Filter and sort the items based on UI filtering options.
		*/
		
		refreshFilter: function() {
			console.log("Refresh filter!");
			this.onFilterChanged(CollectionFilter.filter);
		}
	},
	created() {
		this.doAjax();
		this.$on('filterChanged', this.onFilterChanged);
		this.$on('refreshFilter', this.refreshFilter);
	},
	mounted() {
		window.App = this;
	}
}
</script>

<style lang="sass">
	// Bootstrap
	$icon-font-path: '../node_modules/bootstrap-sass/assets/fonts/bootstrap/';
	$link-color: #42b983;
	$brand-success: #42b983;
	@import 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap';

	// font awesome
	$fa-font-path: '../node_modules/font-awesome/fonts/';
	@import 'node_modules/font-awesome/scss/font-awesome';
	p
		text-align: justify
</style>

<style type="scss">
.browserupgrade {
	margin: 0.2em 0;
	background: #ccc;
	color: #000;
	padding: 0.2em 0;
}

body {
	padding-top: 1.5rem;
	padding-bottom: 1.5rem;
}

.header,
.marketing,
.footer {
	padding-right: 1rem;
	padding-left: 1rem;
}

.header {
	margin-top: 3rem;
	padding-bottom: 1rem;
	border-bottom: .05rem solid #e5e5e5;
}

.header h3 {
	margin-top: 0;
	margin-bottom: 0;
	line-height: 3rem;
}

.divider {
	border-bottom: .05rem solid #e5e5e5;
}

.footer {
	padding-top: 1.5rem;
	color: #777;
	border-top: .05rem solid #e5e5e5;
}

@media (min-width: 48em) {
	.container {
		max-width: 66rem;
	}
}
.container-narrow > hr {
	margin: 2rem 0;
}
.marketing {
	margin: 3rem 0;
}
.marketing p + h4 {
	margin-top: 1.5rem;
}

/* Modal transition. */
.fade2 {
		transform: scale(0.95);
		opacity: 0;
		transition: all .2s linear;
}
.fade2.show {
		opacity: 1;
		transform: scale(1);
}

@media screen and (min-width: 48em) {
	.header,
	.marketing,
	.footer {
		padding-right: 0;
		padding-left: 0;
	}
	.header {
		margin-bottom: 2rem;
	}
}

.search-form .form-group {
  float: right !important;
  transition: all 0.35s, border-radius 0s;
  width: 32px;
  height: 32px;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
  border-radius: 25px;
  border: 1px solid #ccc;
}
.search-form .form-group input.form-control {
  padding-right: 20px;
  border: 0 none;
  background: transparent;
  box-shadow: none;
  display:block;
}
.search-form .form-group input.form-control::-webkit-input-placeholder {
  display: none;
}
.search-form .form-group input.form-control:-moz-placeholder {
  /* Firefox 18- */
  display: none;
}
.search-form .form-group input.form-control::-moz-placeholder {
  /* Firefox 19+ */
  display: none;
}
.search-form .form-group input.form-control:-ms-input-placeholder {
  display: none;
}
.search-form .form-group,
.search-form .form-group {
  width: 100%;
  border-radius: 4px 25px 25px 4px;
}
.search-form .form-group span.form-control-feedback {
  position: absolute;
  top: -1px;
  right: -2px;
  z-index: 2;
  display: block;
  width: 34px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  color: #3596e0;
  left: initial;
  font-size: 14px;
}

.dark-primary-color    { background: #455A64; }
.default-primary-color { background: #607D8B; }
.light-primary-color   { background: #CFD8DC; }
.text-primary-color    { color: #FFFFFF; }
.accent-color          { background: #FF5722; }
.primary-text-color    { color: #212121; }
.secondary-text-color  { color: #757575; }
.divider-color         { border-color: #BDBDBD; }

</style>