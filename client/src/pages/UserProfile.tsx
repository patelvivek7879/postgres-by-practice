import { useAuthContext } from '@/AuthProvider';
import React from 'react'

const UserProfile = ({...props}: any) => {

    const { loggedInUser }: any = useAuthContext();

    // TODO: user can create / update password 

  return (
    <div>
      {loggedInUser?.username}
    </div>
  )
}

export default UserProfile
