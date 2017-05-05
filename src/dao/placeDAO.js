function PlaceDAO(){
}
PlaceDAO.prototype.getAll = (callback, fallback) => {
    Http.get("getAllPlaces", null, callback, fallback);
};
PlaceDAO.prototype.insert = (places, callback, fallback) => {
    Http.post("insertPlace", places, callback, fallback);
};
PlaceDAO.prototype.delete = (Places, callback, fallback) => {
    Http.post("deletePlace", places, callback, fallback);
};
module.exports = PlaceDAO;
