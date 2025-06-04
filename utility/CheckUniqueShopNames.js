const UserModel =require("../models/UserModel");

const CheckUniqueShopNames = async (shops) => {
    const allUsers = await UserModel.find({});
    const allShops = new Set();
    allUsers.forEach(user => user.shops.forEach(shop => allShops.add(shop)));
    for (const shop of shops) {
        if (allShops.has(shop)) {
            return false;
        }
    }
    return true;
}

module.exports =  CheckUniqueShopNames;