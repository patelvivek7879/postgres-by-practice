import express, {
    Request,
    Response,
  } from "express";
  import { mustBeAuthenticated } from "../middleware/authetication";
  import { User } from "../types/User";
  import { prisma } from "../repository/User";
  
  const router = express.Router();
  
  router.post(
    "/api/v1/progress/save",
    mustBeAuthenticated,
    async (req: Request, res: Response) => {
      const { progress } = req.body;
      const { email } = req.user as User;

      try {
        const updatedUser = await prisma.users.update({
            where: {
                email: email,
              },
            data: {
              progress: progress,
            //   modules: 
            },
          });

        res.status(200).json({
          status: 200,
          message: "Progress saved successfully",
        });
      } catch (error) {
        console.error(" Error while inserting feedback ", error);
        res.status(500).json({
          status: 500,
          message: "Something went wrong, while saving progress",
        });
      }
    }
  );
  
  export default router;
  