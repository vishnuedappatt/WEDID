import axios from "../../../axios";

const GetCity=async({setCity})=>{
    let request=(JSON.parse(localStorage.getItem('token')))  
    await axios.get('job/allcity/',{
        headers: {
            Authorization:'Bearer '+ request
        }
    }).then((res)=>{
      if (res.status===200){
        setCity(res.data)
      }    
    }).catch((err)=>{
        console.log(err.res.data)
    })
}
export default GetCity;