import axios from "../../../axios";

const GetRentCategory=({setRentCatege})=>{
  console.log('ethi8')
     let request=(JSON.parse(localStorage.getItem('token')))  
       axios.get('rent/rentcategory/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setRentCatege(res.data)  
    })
}
export default GetRentCategory;