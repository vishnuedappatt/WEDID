import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import './GivingService.css'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../axios'



function GivingService() {

    const[getcat,setGetCat]=useState([])
    const[getdis,setGetDis]=useState([])
    const[getcity,setGetCity]=useState([])

    // for categorystate
    const [category,setCategory]=useState('') 
    const [district,setDistrict]=useState('')  
    const [city,setCity]=useState('')
    const [title, setTile] = useState('')
    const [sub_mobile, setSubMobile] = useState('')
    const [discription,setDiscription]= useState('')
    const [address,setAddress]= useState('')
    const [place,setPlace]=useState('')
    const [rate,setRate]=useState('')

  useEffect(() => {      
    let request=(JSON.parse(localStorage.getItem('authToken')))      
    getCategory()
    getDistrict()   
    userData()   
   let val=(JSON.parse(localStorage.getItem('order_number')))   
    if (val){
        setSubmit(true)
    }       
    return () => {
      
    }
  }, [])

// user datas

  const userData=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.get('user/profile/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        // setUser(res.data)
        console.log(res.data,'evide work ann')
            if(res.data.count>2){            
        }
    }).catch((err)=>{
        console.log(err.data.detail,'dfdfdf ')
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
        setGetCat(res.data)

    
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
        setGetDis(res.data)
    })
  }

 

//  getting category id and get and show

  const cityGetting=async(id)=>{   
            setDistrict(id)
        let request=(JSON.parse(localStorage.getItem('token')))  
    await axios.get(`job/showcity/${id}/`,{
            headers: {
                Authorization:'Bearer '+ request
            }
        }).then((res)=>{
            console.log(res.data)
            setGetCity(res.data)
            
        }).catch((err)=>{
            console.log(err.res.data)
        })
    }



//   validations

// ---------------------------------------

 const[disErr, setDisErr] = useState({})
  const [cityErr,setCityErr] = useState({})
  const [cateErr, setCateErr] = useState({})
  const [titleErr, setTitleErr] = useState({})
  const [discriptionErr,setDiscriptionErr] = useState({})
  const [subMobileErr, setSubMobileErr] = useState({})
  const [addressErr, setAddressErr] = useState({})
  const [placeErr, setPlaceErr] = useState({})
  const [rateErr, setRateError] = useState({})


    const checkCate=(id)=>{
        setCategory(id)
    }

    const checkCity=(id)=>{        
        setCity(id)
        console.log(district,'dissssss')
    }


    
    const [submit,setSubmit]=useState(false)
  // api call for submit job

  const submitHandler = async(e)=>{
    e.preventDefault()
    let request=(JSON.parse(localStorage.getItem('token'))) 
    console.log(request)
    const isValid = formValidation()
    if (isValid){
        await axios.post('job/jobpost/',{

                category:category,
                district:district,
                city:city,
                title:title,
                discription:discription,
                sub_mobile:sub_mobile,
                address:address, 
                place:place,
                rate:rate,
                slug:title,
          
              },{
            headers: {
                Authorization:'Bearer  '+ request
            }
        }).then((res)=>{
            console.log(res.data)
            if (res.data.ordernumber){
            localStorage.setItem('order_number',JSON.stringify(res.data.ordernumber))
            setSubmit(true)
          }}).catch((err)=>{
            console.log(err.response.data.detail)
           
          })
        }}








const formValidation=()=>{ 
    
    const titleErr={}
    const discriptionErr ={}
    const subMobileErr={}
    const addressErr={}
    const placeErr={}
    const rateErr={}
    const disErr={}
    const cityErr={}
    const cateErr={}
    let isValid = true

    if (!category){
        cateErr.short_fname = '* category is a required field'
        isValid = false
      }
    if (!district){
    disErr.short_fname = '* district is a required field'
    isValid = false
    }
    if (!city){
    console.log('yesssssssss')
    cityErr.short_fname = '* city is a required field'
    isValid = false
    }
     
      
    if (!title){
        titleErr.short_fname = '*title name is a required field'
         isValid = false
    }else if(title.trim().length <3){
        titleErr.short_fname = '*title is too short  '
      isValid = false
    }

    if (!sub_mobile){
        subMobileErr.short_lname = '* sub mobile field is a required field'
        isValid = false
  }else{
      if(sub_mobile.trim().length <9){
        subMobileErr.short_lname = '* mobile number contain min 10 number'
        isValid = false
      }
      else if(sub_mobile.trim().length >10){
        subMobileErr.short_lname = '* mobile number contain only 10 numbers'
        isValid = false
      }
  }
 

  if (!discription){
    discriptionErr.short_email= '* this discription field is required'
    isValid = false
  }
  else if(discription.trim().length<10)
  {
    discriptionErr.short_email= '* this discription field contain min 5 words'
    isValid = false
  }
  if (!address){
    addressErr.short_email= '* this address field is required'
    isValid = false
  }
  else if(discription.trim().length<10)
  {
    addressErr.short_email= '* this address field contain min 5 words'
    isValid = false
  }


  if (!place){
    placeErr.short_email= '* this place field is required'
    isValid = false
  }
  else if(address.trim().length<5)
  {
    placeErr.short_email= '* this place field contain min 5 charector'
    isValid = false
  }
  


   if(!rate){
    rateErr.short_cpassword= '*rate  required field!'
    isValid = false
  }

  setDisErr(disErr)
  setCityErr(cityErr)
  setCateErr(cateErr)
  setTitleErr(titleErr)
  setDiscriptionErr(discriptionErr)
  setSubMobileErr(subMobileErr)
  setAddressErr(addressErr)
  setPlaceErr(placeErr)
  setRateError(rateErr)

  return isValid
}



  return (
    <div >       
        <h1 className='heading'>APPLY FOR AN OPPORTUNITY</h1>
       {submit?'': <form onSubmit={submitHandler}   className='main'>
            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                    <label className="form-label"  >CATEGORY</label>  
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                              CATEGORY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                                {getcat? getcat.map((obj,key)=>                            
                               
                                <Dropdown.Item href="#/action-1"  key={obj.id}   onClick={()=>checkCate(obj.id)}>{obj.name}</Dropdown.Item>  )   :' '}    
                              
                            </Dropdown.Menu>
                        </Dropdown>   
                        {Object.keys(cateErr).map((key)=>{
                                 return <div style={{color:'red'}} >{cateErr[key]}</div> })}
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">
                        <label className="form-label"  >DISTRICT</label>    
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                               DISTRICT
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                            {getdis? getdis.map((obj,key)=>                            
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>cityGetting(obj.id)}>{obj.district}</Dropdown.Item>  )   :' '}  
                                
                            </Dropdown.Menu>
                        </Dropdown> 
                        {Object.keys(disErr).map((key)=>{
                                 return <div style={{color:'red'}} >{disErr[key]}</div> })}
                        
                    </div>
                </div>
            </div>


            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                         <label className="form-label"  >CITY</label>      
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                                CITY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                            {getcity? getcity.map((obj,key)=>                            
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id} onClick={()=>checkCity(obj.id)}  >{obj.city}</Dropdown.Item>  )   :' '}                                 
                               
                            </Dropdown.Menu>
                        </Dropdown>   
                        {Object.keys(cityErr).map((key)=>{
                                 return <div style={{color:'red'}} >{cityErr[key]}</div> })}
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">       
                    <label className="form-label"  >Sub Mobile Number </label>                 
                        <input type="text" id="form6Example3"  placeholder="This number is not same as you registerd"  onChange={(e)=>setSubMobile(e.target.value)} value={sub_mobile}   className="form-control" />
                        
                        {Object.keys(subMobileErr).map((key)=>{
                                 return <div style={{color:'red'}} >{subMobileErr[key]}</div> })}
                       
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                 <label className="form-label">Title</label>
                <input type="text" id="form6Example3"  placeholder='Titile of you job'  onChange={(e)=>setTile(e.target.value)} value={title} className="form-control" />
                {Object.keys(titleErr).map((key)=>{
                                 return <div style={{color:'red'}} >{titleErr[key]}</div> })}
               
            </div>


            <div className="form-outline mb-4">
                {/* <input  type="textarea" id="form6Example4" placeholder='describe about your job role' className="form-control" /> */}
                <label className="form-label" >Discription</label>
                <textarea className='text'  onChange={(e)=>setDiscription(e.target.value)} value={discription}   placeholder='describe about your job role'></textarea>                
                {Object.keys(discriptionErr).map((key)=>{
                                 return <div style={{color:'red'}} >{discriptionErr[key]}</div> })}
            </div>
            
            <div className="form-outline mb-4">
                 <label className="form-label" >Address</label>
                <input type="text" id="form6Example6"   onChange={(e)=>setAddress(e.target.value)} value={address}  placeholder='Enter your Address ' className="form-control" />               
                {Object.keys(addressErr).map((key)=>{
                                 return <div style={{color:'red'}} >{addressErr[key]}</div> })}
            </div>


            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <div className="form-outline mb-4">         
                        <label className="form-label" >Place</label>
                            <input type="text" id="form6Example5"  onChange={(e)=>setPlace(e.target.value)} value={place}  placeholder='Enter your place' className="form-control" />   
                            {Object.keys(placeErr).map((key)=>{
                                 return <div style={{color:'red'}} >{placeErr[key]}</div> })}
                        </div>                                 
                    </div>
                </div>
                <div className="col">                   
                    <div className="form-outline mb-4">
                    <label className="form-label" >Rate</label>
                        <input type="text" id="form6Example5"  onChange={(e)=>setRate(e.target.value)} value={rate}  placeholder='Give a rate for this service'  className="form-control" />
                        {Object.keys(rateErr).map((key)=>{
                                 return <div style={{color:'red'}} >{rateErr[key]}</div> })}                
                    </div>
                </div>
            </div>
    
         <div className="main-payment  mb-4">   
         {submit ? <Button className='payment-btn1' variant="outline-warning"><p>Make Payment</p></Button>  :<Button className='payment-btn' variant="success"  type='submit'><p>Clik here to continue</p></Button>      } 
           
            </div> 
             {/* <div className="main-payment1  mb-4"> 
                 <div>
                    <Button className='payment-btn' variant="success"  type='submit'><p>Clik here to continue</p></Button>{' '}
                </div>              
            </div> */}
            </form> }
            <div className="main-payment ">   
         {submit ?
         <form>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" required></input>
              <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" required />
             <Button className='payment-btn2' type='submit' variant="outline-warning"><p>Make Payment</p></Button>
         </form>
           :'  '      } 
           
            </div> 
            
    </div>
  )
}

export default GivingService