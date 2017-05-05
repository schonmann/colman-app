var ItemBusiness = (function () {
    var self = {};

    /**
        @method isAvailable
        @description Verify if a item is not currently allocated to a person.
        @param {Item} item Item.
        @return {Boolean} true, if it's not currently allocated.
    */

    self.isAvailable = function (item) {
        return item.loans.empty() || item.loans.last().ended;
    };

    /**
        @method getCurrentCarrier
        @description Get the current carrier of the item.
        @param {Item} item Target item.
        @param {Array} people Person list.
        @return {Person} returns the current carrier of the item, or null if it's not allocated to any person in the person's list.
    */
    
    self.getCurrentCarrier = function(item, people) {
        return self.isAvailable(item) ? null : people.first(p=>p.id === item.loans.last().person_id);
    };

    return self;
})();
module.exports = ItemBusiness;