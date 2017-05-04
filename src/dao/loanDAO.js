function LoanDAO() {
}
LoanDAO.prototype.startLoan = (item, person, callback, fallback) => {
    var wrapper = {};
    wrapper.item = item;
    wrapper.person = person;
    wrapper.date = new Date();
    //Post data.
    Http.post('startLoan', wrapper, () => {
        var loan = {};
        loan.item_id = item.id;
        loan.person_id = person.id;
        loan.start_date = wrapper.Date;
        callback(loan);
    }, fallback);
};
LoanDAO.prototype.endLoan = (item, person, callback, fallback) => {
    var wrapper = {};
    wrapper.item = item;
    wrapper.person = person;
    wrapper.date = new Date();
    Http.post('endLoan', wrapper, callback, fallback);
};
LoanDAO.prototype.getByItem = (item,callback,fallback) => {
    Http.get("getLoansByItem", item.id, callback, fallback);
};
module.exports = LoanDAO;