import './App.css'
import getGoogleOAuthURL from './auth/getGoogleOAuthURL'

function App() {

  return (
    <>
      <a href={getGoogleOAuthURL()}>
        Login with Google
      </a>
    </>
  )
}

export default App
