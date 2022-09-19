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
    
    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false)};
    const handleShow = () => {setShow(true)};


    const [errors,SetError]=useState(false)
// react
const [opens, setOpens] = useState(false);
const handleClicks = () => {
    setOpens(true);
  };
  
  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpens(false);
  };
  

    const Userlogin=async(email,password)=>{
        // e.preventDefault()
        console.log(email,password)
       await axios.post('user/login/',{email:email,password:password}).then((res)=>{
                console.log(res.data)
                console.log(res.data.message)

                if (res.data.token){
                 
                     localStorage.setItem('authToken',JSON.stringify(res.data))
                     localStorage.setItem('token',JSON.stringify(res.data.token))
                     setAuthToken(res.data)
                     setUser(res.data.token)                      
                     SetError(res.data.message)
                    navigate('/')
                }
             
              if(res.data.message){              
                SetError(res.data.message)
                handleShow()
                handleClicks()
                setTimeout(() => {
                    handleClose(false);
                       }, 5000);
              }

            }
            )  
        }
 

        
        let logOut=()=>{
            axios.post('user/logout/').then((res)=>{
                console.log(res.data)
            })
            localStorage.removeItem('authToken')
            localStorage.removeItem('token')
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
            errors:errors,       
            
            
            setShow:setShow,
            handleClose:handleClose,
            handleShow:handleShow,
            show:show,
            handleCloses:handleCloses,
            opens:opens,
           
          
          
        }
        return(
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        )
}
