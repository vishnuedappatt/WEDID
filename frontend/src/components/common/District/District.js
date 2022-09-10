import axios from "../../../axios";

const GetDistrict=({setDistrict})=>{
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.get('job/showdistrict/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
          setDistrict(res.data)
    })
  }
  
export default GetDistrict;