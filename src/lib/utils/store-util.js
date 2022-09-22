const { calculateDistance } = require('./google-address');


/**
 * @param {number} lat latitude
 * @param {number} lng longitude
 * @param {number} requiredRadius requiredRadius
 * @param {stores} stores stores
 * @returns {array} list of stores
 */
function searchStoresInRadius(lat, lng, requiredRadius, stores) {
    let foundStores = [];
    let tempStores = [];
    const radius = requiredRadius * 1.60934; // convert miles to kms

    tempStores = stores.map((store) => {
        const tempLat = Number(store.geoCodeLattitude || store.store.geoCodeLattitude);
        const tempLng = Number(store.geoCodeLongitude || store.store.geoCodeLongitude);
        const distance = calculateDistance(lat, lng, tempLat, tempLng);
        const distanceInKm = Math.ceil((distance) * 0.001);

        return {
            distance: distanceInKm,
            tempStore: store
        };
    }).filter((store) => {
        return store.distance <= radius;
    });

    tempStores.sort((store1, store2) => {
        return store1.distance - store2.distance;
    });

    foundStores = tempStores.map((store) => store.tempStore.store.storeId);

    return foundStores;
}

module.exports = {
    searchStoresInRadius
};
