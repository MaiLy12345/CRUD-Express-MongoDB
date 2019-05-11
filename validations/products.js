const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const createProduct = () => {
    return {
        body: {
            name: Joi.string().alphanum().min(3).max(30).required(),
            userId: Joi.objectId().required(),
            price: Joi.number().required(),
            color: Joi.array().required(),
            isAvailable: Joi.boolean().required(),
            payload: {
                expiredAt: Joi.date().required(),
                releaseAt: Joi.date().required()
            }
        }
    }
}
const deleteProduct = () => {
    return {
        params: {
            id: Joi.objectId().required()
        }
    }
}
const getProduct = () => {
    return {
        params: {
            id: Joi.objectId().required()
        }
    }
}
const updateProduct = () => {
    return {
        body: {
            name: Joi.string().alphanum().min(3).max(30).required(),
            userId: Joi.objectId().required(),
            price: Joi.number().required(),
            color: Joi.array().required(),
            isAvailable: Joi.boolean().required(),
            payload: {
                expiredAt: Joi.date().required(),
                releaseAt: Joi.date().required()
            }
        },
        params: {
            id: Joi.objectId().required()
        }
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct
};