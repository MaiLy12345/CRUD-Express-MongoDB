const Joi =  require('joi');


// const schema = Joi.object().keys({
//     username: Joi.string().alphanum().min(3).max(30).required(),
//     password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    // access_token: [Joi.string(), Joi.number()],
    // birthyear: Joi.number().integer().min(1900).max(2013),
    // email: Joi.string().email({ minDomainSegments: 2 })
// }).with('username', 'birthyear').without('password', 'access_token');

    
const creatUser = () => {
    return {
        body: {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        }
    }   
}
const updateUser = () => {
    return {
        body: {
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
        },
        params: {
            id: Joi.objectId().required()
        }
    }
};

const getUser = () => {
    return {
        params: {
            id: Joi.objectId().required()
        }
    }
}

const deleteUser = (req, res, next) => {
    return {
        params: {
            id: Joi.objectId().required()
        }
    }
};

module.exports = {
    creatUser,
    updateUser,
    getUser,
    deleteUser
}