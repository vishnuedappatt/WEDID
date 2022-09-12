import axios from "../../../axios";

const GetCategory=({setCatege})=>{
  console.log('ethi8')
     let request=(JSON.parse(localStorage.getItem('token')))  
       axios.get('job/jobcate/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setCatege(res.data)  
    })
}
export default GetCategory;