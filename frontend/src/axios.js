import  axios from 'axios'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'


const  instance=axios.create({
    baseURL:'https://wedid.sportsbasket.tk/',
    // baseURL:'http://127.0.0.1:8000/'
})

// let authToken = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
//  instance.interceptors.request.use(async req =>{
        
//     if(!authToken){
//       if (req.url === `user/login/`){
//         console.log("ki")
//         return req
//       }
//       console.log(req)
//       authToken = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
//       req.headers.Authorization =  `Bearer ${authToken?.token}`
      
//     }      
//     const user = jwt_decode(authToken.token)
//     console.log(user,"im user")
//     console.log(user.exp,"kkkkkk")
//     console.log(dayjs.unix(user.exp).diff(dayjs()),"difff")
//     const isExpired = dayjs.unix(user.exp).diff(dayjs()) <1 ;
//     console.log(isExpired,"tttt")
//     console.log(authToken.refresh,"refffff")
//     if (!isExpired) {return req}
//     else{
//       const response = await axios.post('user/refresh/',{
//         refresh:authToken.refresh
//       })  
//       localStorage.setItem('authTokens',JSON.stringify(response.data))
//       req.headers.Authorization =  `Bearer ${authToken?.token}`
//       return req 
//     } 
//   })

export default instance

