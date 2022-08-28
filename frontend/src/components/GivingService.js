import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './GivingService.css'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../axios'

function GivingService() {

    // for categorystate
    const [category,setCategory]=useState([])

    // for district
    const [district,setDistrict]=useState([])

    // for city
    const [city,setCity]=useState([])



  useEffect(() => {
    
    getCategory()
    getDistrict()
    return () => {
      
    }
  }, [])
  
// getting all category
  const getCategory=()=>{
   
    axios.get('job/jobcate/').then((res)=>{
        console.log(res.data)
        setCategory(res.data)

    
    })
  }

// for getting all district
  const getDistrict=()=>{
    axios.get('job/showdistrict/').then((res)=>{
        console.log(res.data)
        setDistrict(res.data)
    })
  }

 

//  getting category id and get and show

  const cityGetting=(id)=>{   
    axios.get(`job/showcity/${id}/`).then((res)=>{
        console.log(res.data)
        setCity(res.data)
        
    })
  }


  return (
    <div >       
        <h1 className='heading'>APPLY FOR MORE OPPERTUNITY</h1>
        <form className='main'>
            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                              CATEGORY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                                {category? category.map((obj)=>                            
                               
                                <Dropdown.Item href="#/action-1"  key={obj.id}  >{obj.name}</Dropdown.Item>  )   :' '}    
                              
                            </Dropdown.Menu>
                        </Dropdown>                    
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                               DISTRICT
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                            {district? district.map((obj)=>                            
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>cityGetting(obj.id)}>{obj.district}</Dropdown.Item>  )   :' '}  
                                
                            </Dropdown.Menu>
                        </Dropdown>   
                    </div>
                </div>
            </div>


            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                                CITY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                            {city? city.map((obj)=>                            
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  >{obj.city}</Dropdown.Item>  )   :' '}                                 
                               
                            </Dropdown.Menu>
                        </Dropdown>                    
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">                        
                        <input type="text" id="form6Example3" className="form-control" />
                        <label className="form-label" >Company name</label>
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form6Example3" className="form-control" />
                <label className="form-label">Company name</label>
            </div>


            <div className="form-outline mb-4">
                <input type="text" id="form6Example4" className="form-control" />
                <label className="form-label" >Address</label>
            </div>


            <div className="form-outline mb-4">
                <input type="email" id="form6Example5" className="form-control" />
                <label className="form-label" >Email</label>
            </div>


            <div className="form-outline mb-4">
                <input type="number" id="form6Example6" className="form-control" />
                <label className="form-label" >Phone</label>
            </div>


            <div className="form-outline mb-4">
                <textarea className="form-control" id="form6Example7" rows="4"></textarea>
                <label className="form-label" >Additional information</label>
            </div>


            <div className="form-check d-flex justify-content-center mb-4">
                <input className="form-check-input me-2" type="checkbox" value="" id="form6Example8"  />
                <label className="form-check-label" > Create an account? </label>
            </div>


            <button type="submit" className="btn btn-primary btn-block mb-4">Place order</button>
            </form>`
    </div>
  )
}

export default GivingService