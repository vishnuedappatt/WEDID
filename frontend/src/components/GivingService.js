import React,{useEffect,useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import './GivingService.css'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../axios'
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/authcontext';


function GivingService() {

    // taking authtoken
    const {}=useContext(AuthContext)

    // for categorystate
    const [category,setCategory]=useState([])

    // for district
    const [district,setDistrict]=useState([])

    // for city
    const [city,setCity]=useState([])
    const [view,setView]=useState(false)
    const [counts,setCount]=useState('')
    const [payment,setPayment]=useState(false)
    const [mobile,setMobile]=useState('')

  useEffect(() => {      
    let request=(JSON.parse(localStorage.getItem('authToken')))  
    console.log(request,'jdflkj')
    setMobile(request.mobile)
    getCategory()
    getDistrict()   
    userData()
 
    

    return () => {
      
    }
  }, [])

// user datas

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
         setDisCheck(id) 
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


//   validations

// ---------------------------------------

  const [ccat,setCatCheck]=useState('')
// //   for error
//   const [caterror,setCatError]=useState('')

// category
    const checkCategory=(id)=>{
        console.log(id)
        setCatCheck(id)        
    }

// city
const [cdistrict,setDisCheck]=useState('')
const [ccity,setCityCheck]=useState('')

    const checkCity=(id)=>{
        console.log(id)
        setCityCheck(id)
    }

//  alt mobile number
const [altnumb,setAltNumb]=useState('')

    const checkaltNumber=(e)=>{       
        let number=e.target.value
        const re = /^[0-9\b]+$/;  
        
      if (re.test(number))
        {    
        setAltNumb(number) 
               
        if(number.length>10){
          console.log('its value')        
          setAltNumb(number)         
        }
        else{             
            setAltNumb(number)
        }
       }    
        else{
        console.log('stringss') 
        // setAltNumb('')               
      }        
        
    }

    // title
    const [title,setTitle]=useState('')

    const checkTile=(e)=>{
        let title=e.target.value
        setTitle(title)
        console.log(title)
    }

    // discription
    const [discription,setDiscription]=useState('')

    const checkDiscription=(e)=>{     
       let dis=e.target.value
       console.log(dis)
        setDiscription(dis)
    }

    // address
    
    const [address,setAddress]=useState('')

    const checkAddress=(e)=>{
        let add=e.target.value
        console.log(add)
        setAddress(add)
    }

    // place

    const [place,setPlace]=useState('')

    const checkPlace=(e)=>{
       let  value=e.target.value
        console.log(value)
        setPlace(value)

    }
    // rate

    const [rate,setRate]=useState('')

    const checkRate=(e)=>{
       let value=e.target.value
       console.log(value)    
       const re = /^[0-9\b]+$/;  
       
     if (re.test(value))
       {    
                    
        console.log('number') 
        setRate(value)
      }    
       else{
       console.log('stringss') 
       // setAltNumb('')     
       setRate('')          
     }        
       
   }




// submitting sections

   const submitHandler=(e)=>{
    e.preventDefault()
    let request=(JSON.parse(localStorage.getItem('token')))  
    console.log('submitted')
    axios.post('job/jobpost/',{
        category:ccat,
        district:cdistrict,
        city:ccity,
        sub_mobile:altnumb,
        title:title,
        discription:discription,
        address:address,
        place:place,
        rate:rate,
        payment:payment,
        mobile:mobile,
        slug:title,

    },{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        console.log(res.data)
    })


   }

    
  return (
    <div >       
        <h1 className='heading'>APPLY FOR MORE OPPERTUNITY</h1>
        <form onSubmit={submitHandler} className='main'>
            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                              CATEGORY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                                {category? category.map((obj)=>                            
                               
                                <Dropdown.Item href="#/action-1"  key={obj.id} onClick={()=>checkCategory(obj.id)} >{obj.name}</Dropdown.Item>  )   :' '}    
                              
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
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>checkCity(obj.id)} >{obj.city}</Dropdown.Item>  )   :' '}                                 
                               
                            </Dropdown.Menu>
                        </Dropdown>                    
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">                        
                        <input type="text" id="form6Example3" value={altnumb} placeholder="This number is not same as you registerd" onChange={checkaltNumber}  className="form-control" />
                        
                        <label className="form-label"  >Alternative Mobile Number </label>
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                <input type="text" id="form6Example3" onChange={checkTile} placeholder='Titile of you job' className="form-control" />
                <label className="form-label">Title</label>
            </div>


            <div className="form-outline mb-4">
                {/* <input  type="textarea" id="form6Example4" placeholder='describe about your job role' className="form-control" /> */}
                <textarea className='text' onChange={checkDiscription}  placeholder='describe about your job role'></textarea>
                <label className="form-label" >Discription</label>
            </div>
            
            <div className="form-outline mb-4">
                <input type="text" id="form6Example6" onChange={checkAddress}  placeholder='Enter your Address ' className="form-control" />
                <label className="form-label" >Address</label>
            </div>


            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <div className="form-outline mb-4">                           
                            <input type="text" id="form6Example5" onChange={checkPlace}  placeholder='Enter your place' className="form-control" />                       
                            <label className="form-label" >Place</label>
                        </div>                                 
                    </div>
                </div>
                <div className="col">                   
                    <div className="form-outline mb-4">
                        <input type="text" id="form6Example5" onChange={checkRate} placeholder='Give a rate for this service' value={rate} className="form-control" />
                        <label className="form-label" >Rate</label>
                    </div>
                </div>
            </div>
            
{ view ?  
         <div className="main-payment mb-4">            
            <Button className='payment-btn' variant="outline-warning">Make Payment</Button>{' '}
           
            </div> 
            :  <div className="main-payment mb-4">    
                 
            <Button className='payment-btn' variant="success" disabled><p className='free1' >You have {counts} free trail left</p><br></br><p className='free2'>No payment for this post sharing </p></Button>{' '}
            {/* <h1>dfjhokilaflj</h1> */}
           
            </div> }
            <div className="form-outline mb-4">
                <input type="checkbox" id="form6Example5" placeholder='Give a rate for this service' required className="checkbox" /><span className='check-text' >You are awate of our company policy</span>
            </div>
            <div className="form-outline mb-4">
                <input type="checkbox" id="form6Example5" placeholder='Give a rate for this service' required className="checkbox" /><span className='check-text' >You are awate of our company policy</span>
            </div>
            
        <div className='submit '>
            {/* <input type="checkbox" id="form6Example5" placeholder='Give a rate for this service' required className="checkbox" /> */}
            <Button className='submit-btn' type='submit' variant="outline-success">Make Payment</Button>{' '}
        </div>
          
            </form>`
    </div>
  )
}

export default GivingService