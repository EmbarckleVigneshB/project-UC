"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const util_1 = require("../utils/util");
const connection_1 = __importDefault(require("../connection"));
class UserService {
    // public async findAllUser(): void<User[]> 
    async findAllUser() {
        // const users: User[] = await dataAccess().exec();
        const result = await connection_1.default().get();
        this.users = result;
        // console.log(result);
        return result;
    }
    async findUserById(userId) {
        // const findUser: User = this.users.find(user => user.id === userId);
        // if (!findUser) throw new HttpException(409, "You are not user");
        const result = await connection_1.default().getId(userId);
        console.log("RE", result);
        this.users = result;
        return result;
        // return findUser;
    }
    async createUser(userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        // const findUser: User = this.users.find(user => user.email === userData.email);
        // if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);
        // const hashedPassword = await bcrypt.hash(userData.password, 10);
        // const createUserData: User = { id: this.users.length + 1,...userData, password: hashedPassword };
        const result = await connection_1.default().insert(userData);
        console.log("Inserted", result);
        this.users = result;
        return result;
        // return createUserData;
    }
    async updateUser(userId, userData) {
        if (util_1.isEmpty(userData))
            throw new HttpException_1.default(400, "You're not userData");
        // const findUser: User = this.users.find(user => user.id === userId);
        // if (!findUser) throw new HttpException(409, "You're not user");
        // const hashedPassword = await bcrypt.hash(userData.password, 10);
        // const updateUserData: User[] = this.users.map((user: User) => {
        //   if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
        //   return user;
        // });
        const result = await connection_1.default().update(userId, userData);
        this.users = result;
        console.log(result);
        return result;
    }
    async deleteUser(userId) {
        // const findUser: User = this.users.find(user => user.id === userId);
        // if (!findUser) throw new HttpException(409, "You're not user");
        const result = await connection_1.default().delete(userId);
        this.users = result;
        console.log("delete", result);
        return result;
        // const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
        // return deleteUserData;
    }
}
exports.default = UserService;
//# sourceMappingURL=users.service.js.map