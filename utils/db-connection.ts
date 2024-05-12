import dotenv from 'dotenv';
import config from 'config'
import { Client }   from "pg";

// local files imports
import {logger } from "./logger"

dotenv.config();

const {
    databaseHost,
    databaseName,
    databaseUser,
    databasePassword,
    databasePort,
    dbUri,
  } : any= config;
  
  console.log(" Database URI =====>>>>> ",dbUri);

  export const client = new Client(dbUri);
  // {
  //   host: databaseHost,
  //   port: databasePort,
  //   database: databaseName,
  //   user: databaseUser,
  //   password: databasePassword,
  // }

export const connectToDatabase = async () => {
    try{
      await client.connect();
      logger.info("Connection established successfully ..."); 
    }catch(err){
        logger.error("Error connecting to PostgreSQL database");
        console.log("Error : ",err)
    }
  }