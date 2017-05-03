function Item(json){
    if(json) {
        this.id = json.id ? json.id : Util.guid();
        this.name = json.name;
        this.description = json.description;
        this.type = json.type;
        this.place_id = json.place_id;
        this.loans = json.loans;
    } else {
        this.id = Util.guid();
        this.name = "";
        this.description = "";
        this.type = 0;
        this.place_id = "";
        this.loans = [];
    }
}
module.exports = Item;