import * as express from "express";
import axios from "axios";

const router = express.Router();

// Function to fetch the latest tag label from a GitHub repository
async function getLatestTagLabel(owner: string, repo: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/tags`
    );
    const tags = await response.data;
    if (tags.length > 0) {
      return tags[0].name; // Return the name of the latest tag
    } else {
      throw new Error("No tags found for the repository");
    }
  } catch (error: any) {
    throw new Error(`${error?.message}`);
  }
}

router.get("/api/v1/version", async (req, res) => {
  try {
    const result = await getLatestTagLabel(
      "patelvivek7879",
      "postgres-by-practice"
    );
    res.status(200).json({
      status: 200,
      latestTag: result,
    });
  } catch (error: any) {
    res.status(500).json({
      status: 500,
      latestTag: null,
      message: error.message,
    });
  }
});

export default router;
