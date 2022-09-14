import React, { useState ,useEffect, useContext } from 'react'
import './List.css'
import axios from '../../axios';
import { useNavigate,Link } from 'react-router-dom';
import ImageUrl from '../common/Image/Image';
 


function List() {
  const navigate = useNavigate()


  useEffect (()=>{
    getrentjob()
  },[]);


  // saving data
  const [data,setData]=useState([])

  // / getting all jobpost
  const getrentjob=()=>{
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.get('rent/all/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      console.log(res.data,'its the datass')  
      setData(res.data)    
    })
  }

  return (
<div>
{data ? data.map((obj,key)=>
 <div className='list mt-5 me-5 '>
   
      <img src={ImageUrl+obj.image} alt='noo' className='listImg'/>
      <div className='listDesc'>
      <span className='span'>Item :</span><h3 className='listTile'>{obj.title}</h3>
        <span className='listSize'><span className='span'>Category: </span>{obj.category.name} </span>
        <span className='listSize'><span className='span'>District: </span>{obj.district.district} </span>
        <span className='listSize'><span className='span'>City: </span>{obj.city.city} </span>
        <span className='listPrice'><span className='span'>Price: </span>{obj.rate} ₹</span>
      </div>
      <div className='BookingBtn'>
      <button className='bookbtn'>View and Book</button>
      
    </div>
    </div>):'' }
    </div>
  )
}

export default List
