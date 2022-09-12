import axios from "../../../axios";

const GetDistrict=({setDist})=>{
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.get('job/showdistrict/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setDist(res.data)
    })
  }
  
export default GetDistrict;