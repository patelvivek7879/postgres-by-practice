import dotenv from 'dotenv';
import config from 'config'
import { Client }   from "pg";

import {logger } from "./server"

dotenv.config();

const {
    databaseHost,
    databaseName,
    databaseUser,
    databasePassword,
    databasePort,
  } : any= config;
  
 export const client = new Client({
    host: databaseHost,
    port: databasePort,
    database: databaseName,
    user: databaseUser,
    password: databasePassword,
  });

export const connectToDatabase = async () => {
    try{
      await client.connect();
      logger.info("Connection established successfully ..."); 
  
    }catch(err){
        logger.error("Error connecting to PostgreSQL database", err);
    }
  }