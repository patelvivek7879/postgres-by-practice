import express, { Request, Response } from 'express';
import { Get, Route } from "tsoa";

import { logger } from '../utils/logger';
import { createUser, getAllUsers, getUser } from "../repository/User";
import { createUserController, getAllUsersController, getUserByIdController, updateUserController } from '../controllers/User';

const router = express.Router();

// get all users
router.get('/users/getAllUsers', getAllUsersController)

router.get('/users/:id', getUserByIdController);

// create a new user
router.post('/users/create', createUserController);

// Update user details
router.put('/api/v1/users/update', updateUserController);

// If have to delete a user
// router.delete('/users/create', async (req: Request, res: Response) => {})

export default router;