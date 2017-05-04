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

    return self;
})();
module.exports = ItemBusiness;