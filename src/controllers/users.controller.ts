import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import userService from '../services/users.service';




class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User = await this.userService.findAllUser();

      console.log("findAllUsersData",findAllUsersData);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {

      next(error);

      
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);



      const findOneUserData: User = await this.userService.findUserById(userId);

      console.log("findOneUserData",findOneUserData);


      res.status(200).json({ data: findOneUserData, message: 'findOne' });


    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;

console.log("userData",userData);

      const createUserData: User = await this.userService.createUser(userData);

console.log("created",createUserData);
      res.status(201).json({ data: createUserData, message: 'created' });

    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const userData: User = req.body;
console.log("update user",userData);

      const updateUserData: User[] = await this.userService.updateUser(userId, userData);

console.log("updated users",updateUserData);


      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
 console.log("USER ID",userId);

      const deleteUserData: User[] = await this.userService.deleteUser(userId);
      console.log("deleteUserID",deleteUserData);


      res.status(200).json({ data: deleteUserData, message: 'deleted' });


      
    } 
    catch (error) 
    {
      next(error);
    }
  };
}

export default UsersController;
