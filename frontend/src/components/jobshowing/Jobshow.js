import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import './jobshow.css'
import Table from 'react-bootstrap/Table';
import Button from '@mui/material/Button';
import axios from '../../axios'

function Jobshow() {

  // all job post data
  const[alldata,setAllData]=useState([])

  useEffect(() => {
    getalljob()
  
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
  
  return (
    <div>       
      <div align='center ' style={{backgroundColor:'gray'}}>
      <p >wedidsolutions@gmail.com</p>
            <h4>IF OPPURTUNITY DOESN'T KNOCK , BUILD A DOOR</h4>
            <p className='wedid'>WEDID</p>
        <Button style={{width:'10rem',marginBottom:'3rem',border:'3px green solid'}} variant="outlined" color="success">
          <p style={{color:'black'}}>SEARCH</p>        
      </Button>
      </div>
    {alldata? <div  className='main-div m-5'>   
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
          <td style={{textDecoration:'None',color:'white '}} className='pt-5 '>1</td>
          <td style={{textDecoration:'None',color:'white '}} className='pt-5 '> Mark</td>
          <td style={{textDecoration:'None',color:'white '}}  className='pt-5 '>Otto</td>
          <td style={{textDecoration:'None',color:'white '}} className='pt-5 '>@mdo</td>
         <td className='pt-5 '><Link to='' style={{textDecoration:'None',color:'white '}}>View and Pay</Link></td> 
        </tr>
        
      </tbody>
    </Table>


       </div> :''}
     
    
    </div>
  )
}

export default Jobshow