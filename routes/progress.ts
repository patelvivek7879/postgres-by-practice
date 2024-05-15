import express, {
    Request,
    Response,
  } from "express";
  import { mustBeAuthenticated } from "../middleware/authetication";
  import { User } from "../types/User";
  import { prisma } from "../repository/User";
  
  const router = express.Router();

  router.get(
    "/api/v1/progress",
    mustBeAuthenticated,
    async (req: Request, res: Response) => {
      const { email } = req.user as User;
      try {
        const userProgress = await prisma.progress.findUnique({
          where: {
              user_email: email,
            }
        });

        res.status(200).json({
          status: 200,
          message: "Progress get successfully",
          email: email,
          userProgress
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
  
  // updating a module status or making functional to mark as completed functionality
  router.put(
    "/api/v1/progress",
    mustBeAuthenticated,
    async (req: Request, res: Response) => {
      const { email } = req.user as User;
      const { moduleName, status } = req.body;
      try {
        const updatedModuleProgress = await prisma.progress.update({
          where: {
              user_email: email,
            },
          data: {
            [moduleName]: status,
          },
        });

        res.status(200).json({
          status: 200,
          message: "Progress get successfully",
          email: email,
          updatedModuleProgress
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
  