import {setUser, setLoading, setError} from '../state/auth.slice.js'
import {register, login, getMe} from '../service/auth.api.js'
import {useDispatch, useSelector} from 'react-redux'

export const useAuth = () => {
    const dispatch = useDispatch()

 async function handleRegister({fullName, email, password, contact, isSeller = false} ) {
    const data = await register({fullName, email, password, contact, isSeller})
    dispatch(setUser(data.user))
    return data.user
  }

  async function handleLogin({email, password}) {
    const data = await login({email, password})
    dispatch(setUser(data.user))
    return data.user
  } 

  async function handleGetMe() {
    const data = await getMe()
    dispatch(setUser(data.user))
    return data.user
  }


  return {handleRegister, handleLogin, handleGetMe  }

}
