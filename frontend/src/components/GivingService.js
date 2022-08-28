import React,{useEffect,useState,} from 'react'
import Button from 'react-bootstrap/Button';
import './GivingService.css'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../axios'


function GivingService() {

    // taking authtoken

    // for categorystate
    const [category,setCategory]=useState([])

    // for district
    const [district,setDistrict]=useState([])

    // for city
    const [city,setCity]=useState([])
    const [view,setView]=useState(false)
    const [counts,setCount]=useState('')
  


  useEffect(() => {      

    getCategory()
    getDistrict()   
    userData()
 
    

    return () => {
      
    }
  }, [])



  const userData=()=>{
   
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.get('user/profile/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        // setUser(res.data)
        console.log(res.data,'evide work ann')
        setCount(3-res.data.count)
        if(res.data.count>2){
            setView(true)
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
        setCategory(res.data)

    
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

 

//  getting category id and get and show

  const cityGetting=async(id)=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.get(`job/showcity/${id}/`,{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
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
                        <input type="text" id="form6Example3"placeholder="This number is not same as you registerd" className="form-control" />
                        
                        <label className="form-label"  >Alternative Mobile Number </label>
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form6Example3" placeholder='Titile of you job' className="form-control" />
                <label className="form-label">Title</label>
            </div>


            <div className="form-outline mb-4">
                {/* <input  type="textarea" id="form6Example4" placeholder='describe about your job role' className="form-control" /> */}
                <textarea className='text' placeholder='describe about your job role'></textarea>
                <label className="form-label" >Discription</label>
            </div>
            
            <div className="form-outline mb-4">
                <input type="text" id="form6Example6"  placeholder='Enter your Address ' className="form-control" />
                <label className="form-label" >Address</label>
            </div>


            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <div className="form-outline mb-4">                           
                            <input type="text" id="form6Example5" placeholder='Enter your place' className="form-control" />                       
                            <label className="form-label" >Place</label>
                        </div>                                 
                    </div>
                </div>
                <div className="col">                   
                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example5" placeholder='Give a rate for this service' className="form-control" />
                        <label className="form-label" >Rate</label>
                    </div>
                </div>
            </div>
                    




      
            
{ view ?  
         <div className="main-payment mb-4">            
            <Button className='payment-btn' variant="outline-warning">Make Payment</Button>{' '}
           
            </div> 
            :  <div className="main-payment mb-4">    
                 
            <Button className='payment-btn' variant="success" disabled>You have {counts} free trail left</Button>{' '}
           
            </div> }

          






            <button type="submit" className="btn btn-primary btn-block mb-4">Place order</button>
            </form>`
    </div>
  )
}

export default GivingService