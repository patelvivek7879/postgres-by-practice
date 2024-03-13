import express, {
  Express,
  Request,
  Response,
  Application,
  NextFunction,
} from "express";
import { mustBeAuthenticated } from "../middleware/authetication";
import { User } from "../types/User";
import { prisma } from "../repository/User";
import { rateLimiter } from "../middleware/rateLimiter";

const router = express.Router();

router.get(
  "/api/v1/feedback",
  // mustBeAuthenticated,
  async (req: Request, res: Response) => {
    const { offset, size, search } = req.query;

    try {
      const getCountWhereClause: any = () => {
        if (search && search.length && search !== "") {
          return {
            where: {
              message: {
                search: search,
              },
            },
          };
        } else {
          return {};
        }
      };

      const getSearchTermWhereClause: any = () =>{
        if(search && search !== "") {
          return {
            where: {
              message: {
                search: search as unknown as string,
              },
            }
          }
        }else{
          return {}
        }
      }

      const feedbackData: any = await prisma.$transaction([
        prisma.feedbacks.count(getCountWhereClause()),
        prisma.feedbacks.findMany({
          skip: Number(offset),
          take: Number(size),
          where: {
            message: {
              search: search as unknown as string,
            },
          }
        }),
      ]);

      const data = feedbackData[1].map((d: any) => ({
        ...d,
        createdAt: `${d.createdAt}`,
      }));

      res.status(200).json({
        status: 200,
        message: "Feedback data fetched successfully",
        data: data,
        total: feedbackData[0],
      });
    } catch (error) {
      console.error(" Error while inserting feedback ", error);
      res.status(500).json({
        status: 500,
        message: "Something went wrong, Fail to fetch feedback data",
      });
    }
  }
);

router.post(
  "/api/v1/feedback",
  mustBeAuthenticated,
  rateLimiter,
  async (req: Request, res: Response) => {
    const { message, time, from } = req.body;
    const { email, name } = req.user as User;

    try {
      const feedbackBody: any = {
        message: message,
        from: email,
        name: name,
        createdAt: Date.now(),
      };

      const feedbackData = await prisma.feedbacks.create({
        data: feedbackBody,
      });

      res.status(200).json({
        status: 200,
        message: "Feedback sent successfully",
      });
    } catch (error) {
      console.error(" Error while inserting feedback ", error);
      res.status(500).json({
        status: 500,
        message: "Something went wrong",
      });
    }
  }
);

export default router;
