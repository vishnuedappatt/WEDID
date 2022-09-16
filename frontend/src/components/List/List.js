import React, { useState ,useEffect, useContext } from 'react'
import './List.css'
import axios from '../../axios';
import { useNavigate,Link } from 'react-router-dom';
import ImageUrl from '../common/Image/Image';
import RentContext from '../../context/rentcontext';
import Badge from 'react-bootstrap/Badge';

function List({currentpage}) {
  const navigate = useNavigate()
 const {getrentjob,setData,data,setEmpty,empty,searchimage}=useContext(RentContext)

  useEffect (()=>{
    getrentjob()
  },[]);


  
  return (
   
<div style={{backgroundColor:'blue'}} className='main-list  m-1'>
{currentpage ? currentpage.map((obj,key)=>
<div>
 <div className='list mt-5 me-5 '>
   <div align='center'>

   { searchimage ? <img src={obj.image} alt='noo' className='listImg'/> : 
      <img src={ImageUrl +obj.image} alt='noo' className='listImg'/> }
   </div>      
      <div className='listDesc'>
      <span className='span'>Item :</span><h3 className='listTile'>{obj.title}</h3>
        <span className='listSize'><span className='span'>Category: </span>{obj.category.name} </span>
        <span className='listSize'><span className='span'>District: </span>{obj.district.district} </span>
        <span className='listSize'><span className='span'>City: </span>{obj.city.city} </span>
        <span className='listPrice'><span className='span'>Price: </span>{obj.rate} ₹</span>
        {/* <span className='listPrice'><span className='span'> <Badge bg="info">{obj.rate} ₹</Badge>{' '} </span></span> */}
       
        <span className='listSize'><span className='span'>valid up to: </span>{obj.valid_at} </span>
      </div>
      <div align='center' className='BookingBtn'>
      <button className='bookbtn' onClick={()=>navigate(`rentsingle/${obj.id}`)}>View and Book</button>
      </div>
    </div>
    </div>):
    <div align='center'>
          <h3 style={{color:'white'}}>No matches found</h3>
      </div> }
    {empty &&  <div className='nofound' align='center'>
        <h1>No matches found</h1>
      </div>
        }
    </div>
    
  )
}

export default List
