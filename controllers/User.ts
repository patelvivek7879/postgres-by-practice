import { Request, Response } from "express";
import { createUser, getAllUsers, getUser } from "../repository/User";
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