"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dataAccess = () => {
    const uri = "mongodb+srv://vignesh:passw0rd@cluster0.75xal.mongodb.net/uc?retryWrites=true&w=majority";
    const client = new mongodb_1.MongoClient(uri);
    const dbName = 'uc';
    const executeQuery = async () => {
        let result;
        try {
            await client.connect();
            const db = await client.db(dbName);
            const collection = await db.collection("user");
            const cur = await collection.find({});
            //cur.forEach(console.dir);
            console.log("cur", cur);
            console.log('changed..');
            result = await cur.toArray();
            console.log('Array = ', result);
            // insertDocuments(collection,function(){
            // });
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
        return result;
    };
    const insertDocument = async (data) => {
        let result;
        try {
            await client.connect();
            const db = await client.db(dbName);
            const collection = await db.collection("user");
            console.log("id", data);
            // const insertDocuments = async function (collection, callback) {
            const out = await collection.insertOne(data, function (err, result) {
                console.log("Documents inserted =>", out);
                // callback(result);
            });
            // }
            // insertDocuments(collection, function () {
            // });
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
        return result;
    };
    const updateDocument = async (userId, data) => {
        let result;
        try {
            await client.connect();
            const db = await client.db(dbName);
            const collection = await db.collection("user");
            console.log("data == ", data);
            const result = await collection.updateOne({ _id: new mongodb_1.ObjectID(userId) }, { $set: data });
            // const out = await result.toArray();
            console.log("out ==> ", result);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
        return result;
    };
    const deleteDocument = async (data) => {
        let result;
        try {
            await client.connect();
            const db = await client.db(dbName);
            const collection = await db.collection("user");
            console.log("delete data == ", data);
            const result = await collection.deleteOne({ _id: new mongodb_1.ObjectID(data) });
            console.log("out ==> ", result);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
        return result;
    };
    const getDocumentById = async (data) => {
        let result;
        try {
            await client.connect();
            const db = await client.db(dbName);
            const collection = await db.collection("user");
            console.log("DATA", data);
            const result = await collection.findOne({ _id: new mongodb_1.ObjectID(data) });
            console.log("get value => ", result);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            await client.close();
        }
        return result;
    };
    return {
        get: executeQuery,
        insert: insertDocument,
        update: updateDocument,
        delete: deleteDocument,
        getId: getDocumentById
    };
};
exports.default = dataAccess;
//# sourceMappingURL=connection.js.map