const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');


const deleteUser = async (req, res, next) => {
    try {
        const deletingUserId = req.params.id;
        const userDelete = await req.db.collection('users').findOneAndDelete({_id: ObjectId(deletingUserId)});
        if (!userDelete.value) {
            return next(new Error('user_not_found'));
        }
        return res.status(200).json({
            message : 'delete user successful',
            data: userDelete
        });
    } catch (e) {
        return next(e);
    }
};

const addUser = async (req, res, next) => {
    try {
        const newUser = req.body;
        const collection = req.db.collection('users');
        const userFind = await collection.findOne({username: req.body.username});
        if (userFind) {
            return next(new Error('user_already_exists'));
        } 
        const userAdd = await collection.insertOne(newUser);
        if (!userAdd) {
            return next(new Error('creat_user_not_successful'));
        }
        return res.status(201).json({
            message: "create user successfull",
            data: userAdd.ops[0]  // yeu cau in ra 1 user nen ops[0] 
        });
    } catch (e) {
        return next(e);
    }
};

const getListUser = async (req, res, next) => {
    try {
        const users = await req.db.collection('users').find().toArray();
        if (!users) {
            return next(new Error('No_data'));
        }
        return res.status(200).json({
            message: 'List users',
            data: users
        });
    } catch (e) {
        return next(e);
    }
};

const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await req.db.collection('users').findOne({_id: ObjectId(userId)});        
        if (!user) {
            return next(new Error('User_not_found'));
        }
        return res.status(200).json({
            message: 'User',
            data: user
        });
    } catch (e) {
        return next(e);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const newValues = {$set: req.body};
        const userUpdate = await req.db.collection('users').findOneAndUpdate({_id: ObjectId(userId)}, newValues);
        if (!userUpdate.value) {
            return next(new Error('user_not_found'));
        }
        return res.status(200).json({
            message : 'update successful',
            data: userUpdate,
            data_update: newValues 
        });
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    deleteUser,
    addUser,
    getListUser,
    getUser,
    updateUser
};