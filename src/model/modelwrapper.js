function ModelWrapper(){
}
ModelWrapper.prototype.setPerson = function(person){
    this.person = person; return this;
};
ModelWrapper.prototype.setItem = function(item){
    this.item = item; return this;
};
ModelWrapper.prototype.setPlace = function(place){
    this.place = place; return this;
};
ModelWrapper.prototype.setDate = function(date){
    this.date = date; return this;
};
module.exports = ModelWrapper;