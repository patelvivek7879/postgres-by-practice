import { Button } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

const Login = () => {

    const googleOidcOptions = {
        redirect_uri: 'http://localhost:5000',
        client_id: '86207633715-lho3f9u9fq6lnrcrppp73nnhqg1gsbch.apps.googleusercontent.com',
        response_type: 'code',
        scope: 'openid profile email',
        post_logout_redirect_uri: 'http://localhost:5000/api/sessions/logout',
        access_type: 'offline',
        prompt: 'consent',
        max_age: 3600,
        ui_locales: 'en'
    }

    const loginwithgoogle = ()=>{
        window.open("http://localhost:5000/auth/google/callback","_self")
    }

  return (
   <Button onClick={()=> loginwithgoogle()} icon={<GoogleOutlined />}>
    Sign in with Google
   </Button>
  )
}

export default Login
