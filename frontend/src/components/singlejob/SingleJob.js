import axios from '../../axios';
import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Table from  'react-bootstrap/Table'
import './singlejob.css'
function SingleJob() {
    const parms=useParams();
    console.log(parms,'paramss')
    let id=parms.id
   
const [job,setJob]=useState()

    useEffect(() => {      
      getsinglejob()    
    
    },[])
    

    const getsinglejob=async()=>{
      let request=(JSON.parse(localStorage.getItem('token')))  
        await axios.get(`job/singlejob/${id}/`,{
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        if(res.status===200){
          console.log(res.data)
          setJob(res.data)
        }
      })
    }

  return (

  <div className='table' >     
  <Table className='table m-5 ' style={{maxWidth:'90%'}}  size="sm">
  <tbody  style={{'lineHeight':'10vh',color:'white',}}>
    <h2 ><u>Details</u></h2>
    <tr >         
      <th>Name</th>
      {/* <td  >{posts.name}</td> */}
      <th>jdfklnlfdlmjfl</th>
      <th>Address</th>
      {/* <td>{posts.address}</td> */}
      </tr>

      <tr>
      <th>Address</th>
      {/* <td>{posts.address}</td> */}
      </tr>

      <tr>
      <th>City</th>
      {/* <td>{posts.city}</td> */}
      </tr>

      <tr>
      <th>State</th>
      {/* <td>{posts.state}</td>   */}
      </tr>

      <tr>
      <th>Email Address</th>
      {/* <td>{posts.email}</td> */}
      </tr>

      <tr>
      <th>Phone number</th>
      {/* <td>{posts.mobile}</td> */}
      </tr>

      <tr>
      <th>Company Name</th>
      {/* <td>{posts.company_name}</td> */}
      </tr>

      <tr>
      <th>About Team</th>
      {/* <td>{posts.team_description}</td>    */}
      </tr>

      <tr>
      <th>About Products</th>
      {/* <td>{posts.product_description}</td>  */}
      </tr>

      <tr>
      <th>Problem</th>
      {/* <td>{posts.problem_description}</td> */}
    </tr>
  </tbody>

    </Table>
    </div>
  )
}

export default SingleJob