import React,{useContext} from 'react'
import {Navigate,Outlet}  from 'react-router-dom'
import AuthContext from '../context/authcontext'


function AdminPrivetRoute() {
    let {adminAuthToken}=useContext(AuthContext) 
   
    return adminAuthToken ? <Outlet /> : <Navigate to="/login"/> 
    }

export default AdminPrivetRoute