import React ,{useContext} from 'react'
import axios from 'axios'
import {UserContext}  from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const UserLogout =()=>{
    const {token,clearUser} = useContext(UserContext);
    const navigate = useNavigate()
    axios.get(`${import.meta.env.VITE_API_URL}/users/logout`,{
        headers:{
            Authorization:'Bearer ${token}'
        }
    }).then((response)=>{
            if(response.status===200){
                const {user,token}=response.data
                clearUser(user,token)
                navigate('/UserLogin')
            }
        })

    return(
        <div>UserLogout</div>
    )
}

export default UserLogout