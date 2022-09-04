import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import './jobshow.css'
import Table from 'react-bootstrap/Table';
// import Button from '@mui/material/Button';
import axios from '../../axios'
import Button from 'react-bootstrap/Button';


function Jobshow() {

  // all job post data
  const[alldata,setAllData]=useState([])
  const[catege,setCatatege]=useState([])
  const[dist,setDistrict]=useState([])

  useEffect(() => {
    getalljob()
    getCategory()
    getDistrict()

    return () => {    
    }
  }, [])
  

  // / getting all jobpost
  const getalljob=()=>{
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.get('job/all_job/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        console.log(res.data)
        setAllData(res.data)    
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


  return (
    <div>       
      <div align='center ' style={{backgroundColor:'gray'}}>
      <p >wedidsolutions@gmail.com</p>
            <h4>IF OPPURTUNITY DOESN'T KNOCK , BUILD A DOOR</h4>
            <p className='wedid'>WEDID</p>
            <Button className='ms-5 w-25' variant="outline-dark" >PROFILE</Button>
        {/* <Button variant="outlined" color="success">
          <p style={{color:'black'}}>SEARCH</p>        
      </Button> */}
      </div>
    {alldata ? alldata.map((obj,key)=>
    <div  className='main-div m-5'>   
     <Table striped borderless hover>
      <thead>
        <tr style={{backgroundColor:'gray'}}>          
          <th style={{marginLeft:'3rem'}}>CATEGORY</th>
          <th>DISTRICT</th>
          <th>TITLE OF ROLE</th>
          <th>RATE</th>
          <th>VIEW </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{height:'8rem',}}>
            <td  style={{color:'white'}} className='column pt-5 '>{
              catege.map((objs)=>{
                console.log(objs.id,obj.category,'djflkjfkljldf')
                if(objs.id===obj.category){
                  console.log(objs.name,'ites bak')
                   return objs.name                      
                }
              }
              )
            }
             </td>
          <td  style={{color:'white'}}  className='column pt-5 '> {
              dist.map((objs)=>{
                console.log(objs.id,obj.district)
                if(objs.id===obj.district){
                  console.log(objs.district,'ites bak')
                   return objs.district                      
                }
              }
              )
            }</td>
          <td  style={{color:'white'}}    className='column pt-5 bg-danger'>{obj.title}</td>
          <td  style={{color:'white'}}  className='column pt-5 '>{obj.rate}</td>
         <td className=' pay-btn pt-5 '> <Button variant="outline-success">view and pay</Button></td> 
        </tr>
        
      </tbody>
    </Table>
       </div>)
        :"" }
     
    
    </div>
  )
}

export default Jobshow