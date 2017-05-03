function Loan(){
    this.id = Util.guid();
    this.person_id = "";
    this.item_id = "";
    this.start_date = null;
    this.end_date = null;
    this.ended = false;
}
Loan.prototype.setPersonId = function(person_id){
    this.person_id = person_id; return this;
};
Loan.prototype.setItemId = function(item_id){
    this.item_id = item_id; return this;
};
Loan.prototype.setStartDate = function(start_date){
    this.start_date = start_date; return this;
};
module.exports = Loan;