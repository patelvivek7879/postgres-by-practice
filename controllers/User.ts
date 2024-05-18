import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, getAllUsers, getUser, prisma, updateUser } from "../repository/User";
import { logger } from "../utils/logger";

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers()
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error});
    }
}

export const getUserByIdController = async (req: Request, res: Response)=>{
    logger.info(req.url)
    const {id } = req.params;
    const user = await getUser(id);
    res.status(200).json({user});
}

export const createUserController = async (req: Request, res: Response) => {
    logger.info(req.url)
    const userData = req.body;

    const users = await createUser(userData)
    res.status(200).json({users});
}

export const updateUserController = async (req: Request, res: Response) => {
    logger.info(req.url)
    const { email, currentPassword, newPassword } = req.body;

    const user: any = await prisma.users.findUnique({
        where:{
            email: email,
        }
      })

      console.log(currentPassword, user?.password);

    bcrypt.compare(currentPassword, user?.password, (err, isMatch) => {
        if (err) {
            res.status(500).json({ status: 500, message: "Current password do not match" });
        }
        if(isMatch){
            bcrypt.hash(newPassword, 10, async (err: any, hash: any) => {
                if (err) throw err;
                const newUser = {
                  email: email,
                  password: hash
                };
        
                const users = await updateUser(newUser)
                res.status(200).json({ status: 200, message: "Password updated successfully." });
              });
        }else {
            res.status(500).json({ status: 500, message: "Current password do not match" });
          }
      });
}