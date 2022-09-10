import axios from "../../../axios";

const GetCategory=({setCatatege})=>{
     let request=(JSON.parse(localStorage.getItem('token')))  
       axios.get('job/jobcate/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setCatatege(res.data)  
    })
}
export default GetCategory;