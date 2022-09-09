import axios from '../../axios';
import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Table from  'react-bootstrap/Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom';
import './singlejob.css'
function SingleJob() {
    const parms=useParams();
    console.log(parms,'paramss')
    let id=parms.id
   
const [job,setJob]=useState([])

const[catege,setCatatege]=useState([])
const[dist,setDistrict]=useState([])
const[city,setCity]=useState([])
    useEffect(() => {      
      getsinglejob()    
      getCategory()
      getDistrict()
      getcity()
    
    },[])
    

    const getsinglejob=async()=>{
      let request=(JSON.parse(localStorage.getItem('token')))  
        await axios.get(`job/singlejob/${id}/`,{
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        if(res.status===200){
          console.log(res.data,'single')
          setJob(res.data)
        }
      })
    }



// getting all category
const getCategory=()=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
  axios.get('job/jobcate/',{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data)
      setCatatege(res.data)    
     
  })
}




// for getting all district
const getDistrict=()=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
  axios.get('job/showdistrict/',{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res)=>{
      console.log(res.data)
     
      setDistrict(res.data)
  })
}


// get city
const getcity=async(id)=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
  await axios.get('job/allcity/',{
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    if (res.status===200){
      console.log(res.data)
      setCity(res.data)
    }    
  }).catch((err)=>{
      console.log(err.res.data)
  })
  }
  
  

  return (

  <div >     
 
       <Card style={{ backgroundColor:'black',borderRadius:'2rem'}}>
      <Card.Img  />
      <Card.Body> 
      <div style={{paddingLeft:'100px'}}>
      <span style={{color:'wheat',}}>CATEGORY</span> <h1 style={{color:'white',marginLeft:'60px'}}>{
              catege.map((obj,key)=>{
                console.log(obj.id,job.category,'djflkjfkljldf')
                if(obj.id===job.category){
                  console.log(obj.name,'ites bak')
                   return obj.name                      
                }
              }
              )
            }</h1>
      <span style={{color:'wheat',}}>DISTRICT</span> <h3 style={{color:'white',marginLeft:'60px'}}>{
              dist.map((obj)=>{
                console.log(obj.id,job.district)
                if(obj.id===job.district){
                  console.log(obj.district,'ites bak')
                   return obj.district                      
                }
              }
              )
            }</h3>      
      <span style={{color:'wheat',}}>CITY</span> <h3 style={{color:'white',marginLeft:'60px'}}>{
              city.map((obj)=>{
                console.log(obj.id,job.city)
                if(obj.id===job.city){
                  console.log(obj.city,'ites bak')
                   return obj.city                      
                }
              }
              )
            }</h3>      
      <span style={{color:'wheat',}}>DISCRIPTION</span> <h3 style={{color:'white',marginLeft:'60px'}}>{job.discriptions}</h3>
      <span style={{color:'wheat',}}>POST DATE</span> <h3 style={{color:'white',marginLeft:'60px'}}>{job.created_at}</h3>
      <span style={{color:'wheat',}}>VALID</span> <h3 style={{color:'white',marginLeft:'60px'}}>{job.valid_at}</h3>
      <Button variant="dark" type=""    style={{textAlign:'center',height:'4rem',width:'15rem',}}>Make Payment </Button>
      
        </div> 
      
    
      </Card.Body>
    </Card>
    
    </div>
  )
}

export default SingleJob