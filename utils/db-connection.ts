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
    publicDBURI,
  } : any= config;

  // admin clinet
  export const client = new Client(dbUri);
  export const publicClient = new Client(publicDBURI);
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
      await publicClient.connect();
      logger.info("Private and Public Connection established successfully!!!!");
    }catch(err){
        logger.error("Error connecting to PostgreSQL database");
        console.log("Error : ",err)
    }
  }