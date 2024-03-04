import express, { Request, Response } from 'express';
import qs from 'querystring';
import config from 'config';
import axios from 'axios';


console.log("************************************************************************************************ 1");

const router = express.Router();

const getGoogleOAuthTokens = async ({code}: {code:string}) =>{
    const url = `https://oauth2.googleapis.com/token`

    const values = {
        code,
        client_id: config.get('googleClientId') as string,
        client_secret: config.get('googleClientSecret') as string,
        redirect_uri: config.get('googleOAuthRedirectUri') as string,
        grant_type: 'authorization_code',
    }

     try {
        const res = await axios.post(url, qs.stringify(values),{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data
     } catch (error) {
        console.log(" Failed to get google auth tokens +==>>> ",error);
     }
} 

const googleOAuthHandler = async (req: Request, res: Response) =>{
    // get the code from qs
    const code = req.query.code as string;

    console.log("******************************************************* 2")

    const { id_token, access_token} = await getGoogleOAuthTokens({code})

    console.log("________________________________________________________")
    console.log(id_token, access_token)
    console.log("________________________________________________________")

    // get the redirect_uri from qs
    const redirect_uri = req.query.redirect_uri as string;
    // get the client_id from qs
    const client_id = process.env.GOOGLE_CLIENT_ID as string;
    // get the client_secret from qs
    const client_secret = process.env.GOOGLE_CLIENT_SECRET as string;
    // get the access_type from qs
    const access_type = "offline";
    // get the scope from qs
    const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
    // get the grant_type from qs
    const grant_type = "authorization_code";
    // get the url
}

router.get('/api/sessions/oauth/google', googleOAuthHandler);

export default router