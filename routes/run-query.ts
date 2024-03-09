import express, { Request, Response, NextFunction } from "express";
import { client } from "../utils/db-connection";
import { mustBeAuthenticated } from "../middleware/authetication";

const router = express.Router();

router.post(
  "/api/v1/execute/query",
  mustBeAuthenticated,
  express.text(),
  async (req, res, next) => {
    const query = req.body;

    try {
      const result = await client.query(query);
      
      let operationFor = "Table";

      if (query.toLowerCase().includes("database")) {
        operationFor = "Database";
      }

      if (result.command === "DROP") {
        res.status(200).json({
          success: true,
          message: `${operationFor} successfully dropped`,
        });
      } else if (result.command === "CREATE") {
        res.status(200).json({
          success: true,
          message: `${operationFor} successfully created`,
        });
      } else if (result.command === "UPDATE") {
        res.status(200).json({
          success: true,
          message: `${operationFor} successfully updated`,
        });
      } else if (result.command === "INSERT") {
        res.status(200).json({
          success: true,
          message: `Record successfully inserted`,
        });
      } else if (result && result.rows && result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: "Query executed successfully",
          data: result.rows,
        });
      } else {
        res.status(500).json({
          message: `Query execution failed, ${result.error}`,
          success: false,
          status: 500,
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `${err}`,
        success: false,
        status: 500,
      });
    }
  }
);

export default router;
