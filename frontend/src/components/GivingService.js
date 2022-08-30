import React,{useEffect,useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import './GivingService.css'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../axios'
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/authcontext';


function GivingService() {
    const [isvalid,setValid]=useState(false)
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
    const [mobile,setMobile]=useState('')

  useEffect(() => {      
    let request=(JSON.parse(localStorage.getItem('authToken')))  
    // setMobile(request.mobile)

    
    getCategory()
    getDistrict()   
    userData()
 
    

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
        setMobile(res.data.mobile)
        setCount(3-res.data.count)
        if(res.data.count>2){
            setView(true)
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
         setErrorDistrict('')
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


// category
 
 
  const [errorcat,setErrorCat]=useState('')

    const checkCategory=(id)=>{
        console.log(id)
        setCatCheck(id)  
        setErrorCat('')  
           
    }

// city
const [cdistrict,setDisCheck]=useState('')
const [ccity,setCityCheck]=useState('')
// error
const [errordistrict,setErrorDistrict]=useState('')

const [errorcity,setErrorCity]=useState('')
    const checkCity=(id)=>{
        console.log(id)
        setCityCheck(id)
        setErrorCity(' ')
    }

//  alt mobile number
// //   for error
const [caterror,setCatError]=useState('')

const [altnumb,setAltNumb]=useState('')

    const checkaltNumber=(e)=>{       
        let number=e.target.value
        const re = /^[0-9\b]+$/;  
        
      if (re.test(number))
        {    
        setAltNumb(number) 
        setCatError('')      
        if(number.length>10){
         setCatError(' * this field contain max 10 digit only')  
        //  setValid(true)   
          setAltNumb(number)         
        }
        else{             
            setAltNumb(number)
         
        }
       }    
        else{
        console.log('stringss') 
        setCatError('* it should contain only numbers')  
        // setValid(true)        
      }        
        
    }

    // title
    const [title,setTitle]=useState('')
    // errors
    const [errtitle,setErrorTitle]=useState('')
    const checkTile=(e)=>{
        let title=e.target.value 
     
        if (title.length>3){           
            setTitle(title)
            setErrorTitle('')
            setValid(false)
        }       
        else{
            setTitle(title)
            setErrorTitle('minimun 3 charecter for title')
            setValid(true)
        }
        
        
    }

    // discription
    const [discription,setDiscription]=useState('')
    // error
    const [errdis,setErrDis]=useState('')
    const checkDiscription=(e)=>{     
       let dis=e.target.value
       if (dis.length>15){           
        setDiscription(dis)
        setErrDis('')
        setValid(false)
       
    }       
    else{
        setDiscription(dis)
        setValid(true)
        setErrDis('minimun 15 charecter for title')
      
    }
    
      
     
    }

    // address
    
    const [address,setAddress]=useState('')
    // error
    const [adderror,setAddError]=useState('')

    const checkAddress=(e)=>{
        let add=e.target.value
        console.log(add)
        if (add.length>10){           
            setAddress(add)
            setAddError('')
            setValid(false)
        }       
        else{
            setValid(true)
            setAddress(add)
            setAddError('minimun 10 charecter for title')
           
        }
        
    }

    // place

    const [place,setPlace]=useState('')
    // error
    const [placeerr,setPlaceError]=useState('')

    const checkPlace=(e)=>{
       let  value=e.target.value
        console.log(value)
        if (value.length>5){           
            setPlace(value)
            setPlaceError('')
            setValid(false)
        }       
        else{
           
            setPlace(value)
            setValid(true)
            setPlaceError('place have minimun 5 charecter for title')
            
        }
        

    }
    // rate

    const [rate,setRate]=useState('')
    // error
    const [rateerror,setRateError]=useState('')
    const checkRate=(e)=>{
       let value=e.target.value
       console.log(value)    
       const re = /^[0-9\b]+$/;  
       
     if (re.test(value))
       {    
        setRateError('')  
        setRate(value)
        setValid(false)
      }    
       else{
      
       setRateError('Rate field is contain only a valid wage rate')
       // setAltNumb('')     
       setRate('')          
       setValid(true)
     }        
       
   }



// submitting sections
   const [firstsubmit,setFirstSubmit]=useState('')
   
   const [paymetzone,setPayZone]=useState(false)



   const submitHandler=async(e)=>{
    e.preventDefault()
    console.log(view,'this is vieww')
    // for category
    if(ccat.length==0){
        // setValid(true)        
        setErrorCat('* this category field is required')

       
    }else{
        setValid(false)
        setErrorCat('')
       
    }

    // for district
    if(cdistrict.length==0){
        
        setErrorDistrict('* this district field is required')
        
    }else{
        setErrorDistrict('')
       
    }

    // for city
    if(ccity.length==0){
        setValid(true)
        setErrorCity('* this city field is required')
        
    }else{
        setErrorCity('')
       
    }

    // altnumber
    if(altnumb.length==0){
          setValid(true)  
        setCatError('* this sub number field is required') 
      
    }else{
        setCatError('')   
        setValid(false)
    }

// title
    if(title.length==0){
        setErrorTitle('* this title field is required')
        setValid(true)  
    }else{
        setErrorTitle('')
        setValid(false)
    }


    // distription
    if(discription.length==0){
        setErrDis('* this discriptiion field is required')
        setValid(true)  
    }else{
        setErrDis('')
        setValid(false)
    }

    // address
    if(address.length==0){
        setAddError('* this address field is required')
        setValid(true)
    }else{
        setAddError('')
        setValid(false)
    }
    

    // place
    if(place.length==0){
        setPlaceError('* this place field is required')
       
    }else{
        setPlaceError('')
        setValid(false)
    }


    // rate
    if(rate.length==0){
        setRateError('* this rate field is required')
       
    }
    else{
        setRateError('')
     
    }


    if(ccat.length!==0){    
        if(cdistrict.length!==0){      
            if(cdistrict.length!==0){    
                if(ccity.length!==0){ 
                    if(altnumb.length!==0){
                        if(title.length!==0){
                            if(discription.length!==0){
                                if(address.length!==0){
                                    if(place.length!==0){
                                        if(rate.length!==0){                                                                  
                                            console.log('final submitt')
                                                let request=(JSON.parse(localStorage.getItem('token')))  
    
                                                     await  axios.post('job/jobpost/',{
                                                        category:ccat,
                                                        district:cdistrict,
                                                        city:ccity,
                                                        sub_mobile:altnumb,
                                                        title:title,
                                                        discription:discription,
                                                        address:address,
                                                        place:place,
                                                        rate:rate,                                                      
                                                        slug:title,
                                                        mobile:mobile,
                                                        order_number:mobile,
                                                
                                                    },{
                                                        headers: {
                                                            Authorization:'Bearer '+ request
                                                          }
                                                    }).then((res)=>{
                                                        console.log(res.data)
                                                        if (res.data.ordernumber){
                                                            setFirstSubmit(res.data.ordernumber)
                                                            localStorage.setItem('token',JSON.stringify(res.data.ordernumber))
                                                            setPayZone(true)
                                                
                                                        }
                                                    })
                                                 }}}}}}}}}} 

    console.log(firstsubmit,'after amean while')


   




   




    console.log(isvalid)
   
    if (!isvalid){
        console.log(isvalid)
        console.log('valuess')
        if (view){
    //         console.log('happy anne')
    //         // console.log('submitted')
    //       await  axios.post('job/jobpost/',{
    //     category:ccat,
    //     district:cdistrict,
    //     city:ccity,
    //     sub_mobile:altnumb,
    //     title:title,
    //     discription:discription,
    //     address:address,
    //     place:place,
    //     rate:rate,
    //     payment:payment,
    //     slug:title,
    //     mobile:mobile,
    //     order_number:mobile,

    // },{
    //     headers: {
    //         Authorization:'Bearer '+ request
    //       }
    // }).then((res)=>{
    //     console.log(res.data)
    //     if (res.data.ordernumber){
    //         setFirstSubmit(res.data.ordernumber)

    //     }
    // })
    console.log('its finee')

        }
        else{
    //         console.log('happy anne')
    //         // console.log('submitted')
    //       await  axios.post('job/jobpost/',{
    //     category:ccat,
    //     district:cdistrict,
    //     city:ccity,
    //     sub_mobile:altnumb,
    //     title:title,
    //     discription:discription,
    //     address:address,
    //     place:place,
    //     rate:rate,
    //     slug:title,
    //     mobile:mobile,
    //     order_number:mobile,

    // },{
    //     headers: {
    //         Authorization:'Bearer '+ request
    //       }
    // }).then((res)=>{
    //     console.log(res.data)
    //     if (res.data.ordernumber){
    //         setFirstSubmit(res.data.ordernumber)

    //     }
    // })
    //         console.log('njn cheta annn')
    //     }
    

    // }
console.log('this is also fine')

   }
   
    }else{
        console.log('noooooooo')
    }
   
    console.log(paymetzone,'')
    
}

  return (
    <div >       
        <h1 className='heading'>APPLY FOR MORE OPPERTUNITY</h1>
        <form onSubmit={submitHandler} className='main'>
            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                    <label className="form-label"  >CATEGORY</label>  
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                              CATEGORY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                                {category? category.map((obj)=>                            
                               
                                <Dropdown.Item href="#/action-1"  key={obj.id} onClick={()=>checkCategory(obj.id)} >{obj.name}</Dropdown.Item>  )   :' '}    
                              
                            </Dropdown.Menu>
                        </Dropdown>   
                        {errorcat? <span style={{color:'red',fontSize:'18px'}}>{errorcat}</span> :''}  
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
                            {district? district.map((obj)=>                            
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>cityGetting(obj.id)}>{obj.district}</Dropdown.Item>  )   :' '}  
                                
                            </Dropdown.Menu>
                        </Dropdown> 
                        {errordistrict? <span style={{color:'red',fontSize:'18px'}}>{errordistrict}</span> :''}    
                        
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
                            {city? city.map((obj)=>                            
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>checkCity(obj.id)} >{obj.city}</Dropdown.Item>  )   :' '}                                 
                               
                            </Dropdown.Menu>
                        </Dropdown>   
                        {errorcity? <span style={{color:'red',fontSize:'18px'}}>{errorcity}</span> :''}                   
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">       
                    <label className="form-label"  >Alternative Mobile Number </label>                 
                        <input type="text" id="form6Example3" value={altnumb} placeholder="This number is not same as you registerd" onChange={checkaltNumber}  className="form-control" />
                        
                      
                        {caterror? <span style={{color:'red',fontSize:'18px'}}>{caterror}</span> :''}  
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                 <label className="form-label">Title</label>
                <input type="text" id="form6Example3" onChange={checkTile} placeholder='Titile of you job' className="form-control" />
                {errtitle? <span style={{color:'red',fontSize:'18px'}}>{errtitle}</span> :''}  
               
            </div>


            <div className="form-outline mb-4">
                {/* <input  type="textarea" id="form6Example4" placeholder='describe about your job role' className="form-control" /> */}
                <label className="form-label" >Discription</label>
                <textarea className='text' onChange={checkDiscription}  placeholder='describe about your job role'></textarea>                
                {errdis? <span style={{color:'red',fontSize:'18px'}}>{errdis}</span> :''}  
            </div>
            
            <div className="form-outline mb-4">
                 <label className="form-label" >Address</label>
                <input type="text" id="form6Example6" onChange={checkAddress}  placeholder='Enter your Address ' className="form-control" />               
                {adderror? <span style={{color:'red',fontSize:'18px'}}>{adderror}</span> :''}  
            </div>


            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <div className="form-outline mb-4">         
                        <label className="form-label" >Place</label>
                            <input type="text" id="form6Example5" onChange={checkPlace}  placeholder='Enter your place' className="form-control" />   
                            {placeerr? <span style={{color:'red',fontSize:'18px'}}>{placeerr}</span> :''}  
                        </div>                                 
                    </div>
                </div>
                <div className="col">                   
                    <div className="form-outline mb-4">
                    <label className="form-label" >Rate</label>
                        <input type="text" id="form6Example5" onChange={checkRate} placeholder='Give a rate for this service' value={rate} className="form-control" />
                    
                        {rateerror? <span style={{color:'red',fontSize:'18px'}}>{rateerror}</span> :''}  
                    </div>
                </div>
            </div>

            
    { view ?  
    
         <div className="main-payment  mb-4">   
          <Button className='payment-btn' variant="success"  type='submit'><p>Clik here to continue</p></Button>{' '}       <br></br>
         
            <Button className='payment-btn1' variant="outline-warning"><p>Make Payment</p></Button>{' '}
                
                
           
            </div> 

            :

              <div className="main-payment1  mb-4"> 
                    <div>
                        <p className='free1' >You have {counts} free trail left</p>
                        <p className='free2'>No payment for this post sharing </p>
                        <Button className='payment-btn' variant="success"  type='submit'><p>Clik here to continue</p></Button>{' '}
                    </div>              
            </div>
            }
            
             
          
            </form>
            {/* <form align='center'>
            <div className="form-outline mb-4">
                <input type="checkbox" id="form6Example5" placeholder='Give a rate for this service' required className="checkbox" /><span className='check-text' >You are awate of our company policy</span>
            </div>
            <div className="form-outline mb-4">
                <input type="checkbox" id="form6Example5" placeholder='Give a rate for this service' required className="checkbox" /><span className='check-text' >You are awate of our company policy</span>
            </div>
            
        <div className='submit '>

          
            <Button className='submit-btn' type='submit' variant="outline-success">Make Payment</Button>{' '}
        </div>
          
            </form> */}
            
    </div>
  )
}

export default GivingService