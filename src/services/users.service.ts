import bcrypt from 'bcrypt';
import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import { isEmpty } from '../utils/util';
import dataAccess from '../connection';

class UserService {
  public users;

  // public async findAllUser(): void<User[]> 
 

  public async findAllUser(): Promise<User> {

// const users: User[] = await dataAccess().exec();

    const result=await dataAccess().get();

    
    this.users = result;
    // console.log(result);

    return result;

  }

  public async findUserById(userId: string): Promise<User> {
    // const findUser: User = this.users.find(user => user.id === userId);
    // if (!findUser) throw new HttpException(409, "You are not user");

    const result=await dataAccess().getId(userId);

    console.log("RE",result);

    this.users=result;
    return result;


    // return findUser;





  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // const findUser: User = this.users.find(user => user.email === userData.email);
    // if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    // const createUserData: User = { id: this.users.length + 1,...userData, password: hashedPassword };

    const result=await dataAccess().insert(userData);

    console.log("Inserted",result);

    this.users = result;

    return result;

    // return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User[]> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    // const findUser: User = this.users.find(user => user.id === userId);
    // if (!findUser) throw new HttpException(409, "You're not user");

    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    // const updateUserData: User[] = this.users.map((user: User) => {
    //   if (user.id === findUser.id) user = { id: userId, ...userData, password: hashedPassword };
    //   return user;
    // });

    const result=await dataAccess().update(userId,userData);

    
    this.users = result;
     console.log(result);

    return result;
  }

  public async deleteUser(userId: string): Promise<User[]> {

    // const findUser: User = this.users.find(user => user.id === userId);
    // if (!findUser) throw new HttpException(409, "You're not user");


const result=await dataAccess().delete(userId);

this.users=result;
console.log("delete",result);
return result;


    // const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
    // return deleteUserData;
  }
}

export default UserService;
