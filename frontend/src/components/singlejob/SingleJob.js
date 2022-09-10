import axios from '../../axios';
import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import './singlejob.css'
import GetCategory from '../common/Category/Category';
import GetDistrict from '../common/District/District';
import GetCity from '../common/City/City';



function SingleJob() {
    const parms=useParams();
    let id=parms.id
   
const [job,setJob]=useState([])
// const values=AllDatas.getCategory(setCatatege)
const[catege,setCatatege]=useState([])
const[dist,setDistrict]=useState([])
const[city,setCity]=useState([])
    useEffect(() => {      
      getsinglejob()    
      // getCategory()
     GetCategory({setCatatege})
      // getDistrict()
      GetDistrict({setDistrict})
      // getcity()
      GetCity({setCity})
    
    },[])
    

    const getsinglejob=async()=>{
      let request=(JSON.parse(localStorage.getItem('token')))  
        await axios.get(`job/singlejob/${id}/`,{
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        if(res.status===200){
          setJob(res.data)
        }
      })
    }



// getting all category
// const getCategory=()=>{
//   let request=(JSON.parse(localStorage.getItem('token')))  
//   axios.get('job/jobcate/',{
//       headers: {
//           Authorization:'Bearer '+ request
//         }
//   }).then((res)=>{
//       console.log(res.data)
//       setCatatege(res.data)    
     
//   })
// }




// for getting all district
// const getDistrict=()=>{
//   let request=(JSON.parse(localStorage.getItem('token')))  
//   axios.get('job/showdistrict/',{
//       headers: {
//           Authorization:'Bearer '+ request
//         }
//   }).then((res)=>{
//         setDistrict(res.data)
//   })
// }


// get city
// const getcity=async(id)=>{
//   let request=(JSON.parse(localStorage.getItem('token')))  
//   await axios.get('job/allcity/',{
//       headers: {
//           Authorization:'Bearer '+ request
//       }
//   }).then((res)=>{
//     if (res.status===200){
//       setCity(res.data)
//     }    
//   }).catch((err)=>{
//       console.log(err.res.data)
//   })
//   }
  
  

  return (

  <div >      
       <Card style={{ backgroundColor:'black',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body> 
      <div style={{paddingLeft:'100px'}}>
      <span style={{color:'wheat',}}>CATEGORY</span> <h2 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{
              catege.map((obj,key)=>{              
                if(obj.id===job.category){               
                   return obj.name                      
                }
              }
              )
            }</h2>
      <span style={{color:'wheat',}}>DISTRICT</span> <h3 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{
              dist.map((obj)=>{             
                if(obj.id===job.district){
                   return obj.district                      
                }
              }
              )
            }</h3>      
      <span style={{color:'wheat',}}>CITY</span> <h3 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{
              city.map((obj)=>{               
                if(obj.id===job.city){                 
                   return obj.city                      
                }
              }
              )
            }</h3>      
      <span style={{color:'wheat',}}>DISCRIPTION</span> <h4 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.discriptions}</h4>
      <span style={{color:'wheat',}}>POST DATE</span> <h4 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{String(job.created_at).slice(0,10).split("-").reverse().join("-")}</h4>
      <span style={{color:'wheat',}}>VALID</span> <h4 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.valid_at}</h4>
        </div> 
      <div align='center'>
      <Button variant="dark" type=""    style={{textAlign:'center',height:'4rem',width:'15rem',}}>Make Payment </Button>
      </div>
    
      </Card.Body>
    </Card>
    
    </div>
  )
}

export default SingleJob