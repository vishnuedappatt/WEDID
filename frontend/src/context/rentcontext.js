import { createContext,useState } from "react"
import axios  from '../axios'


const RentContext=createContext()
export default RentContext;
export const RentProvider=({children})=>{
    const [data,setData]=useState([])
     // / getting all jobpost
    const getrentjob=()=>{
      let request=(JSON.parse(localStorage.getItem('token')))  
      axios.get('rent/all/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        console.log(res.data,'its the datass')  
        setData(res.data)    
      })
    }


  // empty
  const [empty, setEmpty]=useState(false)
  const [searchimage,setSearchImage]=useState(false)

        let contextData={
            getrentjob:getrentjob,
            setData:setData,
            data:data,
            setEmpty:setEmpty,
            empty:empty,
            setSearchImage:setSearchImage,
            searchimage:searchimage,

          
          
        }
        return(
            <RentContext.Provider value={contextData}>
                {children}
            </RentContext.Provider>
        )
}
