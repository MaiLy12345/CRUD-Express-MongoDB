const { ObjectId } = require('mongodb');

const createProduct = async (req, res, next) => {
    try {
        const body = req.body;
        const userId = body.userId;
        const userCollection = req.db.collection('users');
        const existedUser = await userCollection.findOne({_id: ObjectId(userId)});
        if (!existedUser) {
            return next(new Error('USER_NOT_FOUND'));
        }
        const productCollection = req.db.collection('products');
        // khi body nguoi dung truyen nhieu status k can thiet: name, price, isAvailable .... status1,23
        const models = ['name', 'userId', 'price', 'color','isAvailable','payload'];// phai tao array de luu status. nhuoc diem cua monggodb khi truyen nhieu status k can thiet
        const saveToProduct = {};
        for (const key of models) {
            saveToProduct[key] = body[key];
        }
        const data = await productCollection.insertOne(saveToProduct);
        return res.status(200).json({
            message: 'Create new product successfully',
            data
        });
    } catch (e) {
        return next(e);
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const result = await req.db.collection('products').findOneAndDelete({_id: ObjectId(productId)});
        if (!result.value) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }
        return res.status(200).json({
            message: 'Delete product succesfully',
            deletedProductData : result 
        });
    } catch (e) {
        return next(e);
    }
}

const getProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const data = await req.db.collection('products').findOne({_id: ObjectId(productId)});
        if (!data) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }
        const userOfProduct = await req.db.collection('users').find({_id: ObjectId(data.userId)}).toArray();
        data.users = userOfProduct;
        return res.status(200).json({
            message : 'Product of id : ' + productId ,
            data : data
        });
    } catch (e) {
        return next(e);
    }
};

const getListProduct = async (req, res, next) => {
    try {
        const products = await req.db.collection('products').find().toArray();
        if (!products) {
            return next(new Error('NOT_DATA'));
        }
        for (const product of products) {
            const users = await req.db.collection('users').find({_id: ObjectId(product.userId)}).toArray();
            if (users) {
                product.users = users;
            }
        }
        return res.status(200).json({
            message: 'List products',
            products
        });
    } catch (e) {
        return next(e);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const newValues = {$set : req.body};
        // name, price, 
        const result = await req.db.collection('products').findOneAndUpdate({productId}, newValues);
        if (!result.value) {
            return next(new Error('PRODUCT_NOT_FOUND'));
        }
        return res.status(200).json({
            message: 'Update product successfully',
            oldData: result,
            dataChanges: newValues
        });
    } catch (e) {
        return next(e);
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    getProduct,
    getListProduct,
    updateProduct
};