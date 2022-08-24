import  axios from 'axios'
// import { useContext } from 'react';
// import {AuthContext} from '../context/authcontext';

const  instance=axios.create({
    baseURL:'http://127.0.0.1:8000/',
})
export default instance

// let {authToken}=useContext(AuthContext)

// export const withHeader=axios.create({
    
//     baseURL:'http://127.0.0.1:8000/',
//     headers:{'Authorization':'Bearer ' +authToken.token}
// })


