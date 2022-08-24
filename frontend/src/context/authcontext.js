import { createContext,useState } from "react"
import axios  from '../axios'
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';


const AuthContext=createContext()
export default AuthContext;
export const AuthProvider=({children})=>{
    // const [user, setUser] = useState([])
 let [authToken,setAuthToken]=useState(()=>localStorage.getItem('authToken')? JSON.parse(localStorage.getItem('authToken')):null)
 let [user,setUser]=useState(()=>localStorage.getItem('authToken')? jwt_decode(localStorage.getItem('authToken')):null)

    const navigate=useNavigate()
    const Userlogin=async({...values})=>{
        // e.preventDefault()
       await axios.post('user/login/',{...values}).then((res)=>{
                console.log(res.data)
                if (res.data.token){
                    console.log('valuess are herer')
                     localStorage.setItem('authToken',JSON.stringify(res.data))
                     setAuthToken(res.data)
                     console.log(res.data)
                     setUser(res.data.token)
                     console.log(res.data.token)
                    navigate('/')

                }
                // setUser(res.data)

            }
            )  
        }

        let logOut=()=>{
            axios.post('user/logout/').then((res)=>{
                console.log(res.data)
            })
            localStorage.removeItem('authToken')
            setUser(null)
            setAuthToken(null)
            navigate('/login')
        }

        const [mobile,setMobile]=useState('')
        let contextData={
            user:user,
            Userlogin:Userlogin,
            logOut:logOut,
            authToken:authToken,
            mobile:mobile,
            setMobile:setMobile,
            
           
        }
        return(
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        )
}
