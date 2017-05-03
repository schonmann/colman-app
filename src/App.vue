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
			<collection :filtered="items"></collection>
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
	'components': { Collection, AddItemModal, ShowItemModal, AddPlaceModal, AddPersonModal, LoanItemModal, CollectionFilters, Marketing },
	'data': function(){
		return {
			types: [],
			places: [],
			people: [],
			items: [],
		}	
	},
	'methods': {
		orderBy: function(e) {
			var field = e.srcElement.value;
			this.items.sort((a,b) => a[field] > b[field]);
		},
		getTypeList: function (callback,fallback) {
			Http.get("getTypes", null, (types) => {
				callback(types);
			}, fallback);
		},
		getPlaceList: function (callback,fallback) {
			Http.get("getPlaces", null, (places) => {
				callback(places);
			}, fallback);
		},
		getPersonList: function(callback, fallback) {
			Http.get("getPeople", null, (people) => {
				callback(people);
			},fallback);
		},
		getItemList: function (callback,fallback) {
			Http.get('getAllItems', null, (items)=>{
				callback(items);
			}, fallback);
		},
		populateItemsLoans: function(itemList, callback, fallback) {
			itemList.asyncEach((item,next,stop)=>{
				Http.get("getLoansByItem",item.id,(loans)=>{
					item.loans = loans; next();
				}, fallback);
			}, callback);
		},
		getDataPackage: function(callback,fallback) {
			this.getTypeList((types)=>{
				this.getPlaceList((places)=>{
					this.getPersonList((people)=>{
						this.getItemList((items)=>{
							this.populateItemsLoans(items,()=>{
								var dto = {};
								dto.types = types;
								dto.places = places;
								dto.people = people;
								dto.items = items;
								callback(dto);
							}, fallback);
						}, fallback);
					},fallback);
				}, fallback);
			},fallback);
		},
		doAjax: function(){
			this.getDataPackage((dto)=>{
				this.types.replace(dto.types); 
				this.places.replace(dto.places);
				this.people.replace(dto.people); 
				this.items.replace(dto.items);
				window.DataPackage = dto;
			}, this.onAjaxFailure);
		},
		onFilterChanged: function(filters){
			Http.post('getByFilter', filters, (filteredItems)=>{
				this.populateItemsLoans(this.items, ()=>{
					this.items.replace(filteredItems);
					window.DataPackage.items.replace(filteredItems);
				}, this.onAjaxFailure);
			}, this.onAjaxFailure);
		},
		//Behavior on failure to get data package.
		onAjaxFailure: function(x,s,e) {
			alert("Error: " + s);
		}
	},
	created() {
		this.doAjax();
		this.$on('filterChanged', this.onFilterChanged);
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
.search-form .form-group:hover,
.search-form .form-group.hover {
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