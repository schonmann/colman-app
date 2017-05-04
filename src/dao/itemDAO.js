function ItemDAO() {
}
ItemDAO.prototype.getAll = (callback, fallback) => {
    Http.get("getAllItems", null, callback, fallback);
};
ItemDAO.prototype.insert = (item, callback, fallback) => {
    Http.post("insertItem", item, callback, fallback);
};
ItemDAO.prototype.delete = (item, callback, fallback) => {
    Http.post("deleteItem", item, callback, fallback);
};
module.exports = ItemDAO;
