import React, { useContext } from 'react'
import AuthContext from '../context/authcontext'
import {Navigate,Outlet,useNavigate}  from 'react-router-dom'

function CaseOfAdmin() {
    let {user}=useContext(AuthContext)
   const val= localStorage.getItem('adminAuthToken')
    return val ? <Navigate to='/admin'></Navigate>:<Outlet/>
    }
    


export default CaseOfAdmin