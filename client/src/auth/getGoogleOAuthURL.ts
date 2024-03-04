function getGoogleOAuthURL(): string {

    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    console.log(import.meta.env.REDIRECT_URI);

    const options = {
        redirect_uri: import.meta.env.VITE_REDIRECT_URI as string,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID as string,
        scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
    }

    console.log({options});

    const qs = new URLSearchParams(options);

    console.log({ qs });

    return `${rootUrl}?${qs.toString()}`

}


export default getGoogleOAuthURL;