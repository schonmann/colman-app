function ItemDAO() {
}
ItemDAO.prototype.getAll = (callback, fallback) => {
    Http.get("getAllPlaces", null, callback, fallback);
};
ItemDAO.prototype.insert = (place, callback, fallback) => {
    Http.post("insertPlace", place, callback, fallback);
};
ItemDAO.prototype.delete = (place, callback, fallback) => {
};
module.exports = ItemDAO;
