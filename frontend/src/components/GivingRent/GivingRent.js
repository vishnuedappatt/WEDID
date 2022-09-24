import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../../axios'
import {useNavigate} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';



// material ui
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GetCategory from '../common/Category/Category';
import GetDistrict from '../common/District/District';
import CommonStepper from '../common/CommonStepper/CommonStepper';
import GetRentCategory from '../common/RentCategory/RentCategory';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function GivingRent() {
    const navigate=useNavigate()
    const[getcat,setRentCatege]=useState([])
    const[getdis,setDist]=useState([])
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
    const [mobile,setMobile]=useState('')
  const [pricein,setPricein]=useState('per_day')
    // commonstepper
    // steps for stepper
  const steps = [
    'Fill the black for creating rent',
    'payment section',
    'Post the rent item',
  ];



  useEffect(() => {      
    let request=(JSON.parse(localStorage.getItem('authToken')))  
    console.log(request,'rere')    
    // getCategory()
    // GetCategory({setCatege})  
    GetRentCategory({setRentCatege})
    // getDistrict()   
    GetDistrict({setDist})
    userData()   
    let val=(JSON.parse(localStorage.getItem('order_number')))   
    if (val){
        setSubmit(true)
    }       
    let message=(JSON.parse(localStorage.getItem('message')))
    if (message){
      setPayed(true)
      setSubmit(false)
    }
    return () => {      
    }
  }, [])





  // mui state and function
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


// snackbar
  const [opens, setOpens] = React.useState(false);
  const handleClicks = () => {
    setOpens(true);
  };
  const handleCloses = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpens(false);
  };


// user datas

  const userData=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.get('user/profile/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        setMobile(res.data.mobile)
        console.log(res.data,'evide work ann')
            if(res.data.count>2){            
        }
    }).catch((err)=>{
        console.log(err.data.detail,'dfdfdf ')
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
  const[imageErr,setImageError]=useState({})
  const[image1Err,setImage1Error]=useState({})
  const[image2Err,setImage2Error]=useState({})
  const[dateErr,setDateError]=useState({})

    const checkCate=(id)=>{
        setCategory(id)
    }

    const checkCity=(id)=>{        
        setCity(id)
    }

    // for submitting
    const [submit,setSubmit]=useState(false)
    const [payed,setPayed]=useState(false)
  // api call for submit job
  const cancelHandler=(e)=>{
    e.preventDefault()
    localStorage.removeItem('order_number')
    navigate('/')

  }


  // for image getting
const [image,setImage]=useState()
  const imageHandler=(e)=>{
    console.log('er')
    setImage(e.target.files[0])

  }
  // for image getting
  const [image1,setImage1]=useState()
  const image1Handler=(e)=>{
    console.log('er')
    setImage1(e.target.files[0])

  }
  // for image getting
  const [image2,setImage2]=useState()
  const image2Handler=(e)=>{
    console.log('er')
    setImage2(e.target.files[0])

  }

  // date field

   const [date,setDate]=useState('')

  const dateHandler=(e)=>{
    console.log(e.target.value,'dateeee')
    setDate(e.target.value)

  }


  const submitHandler = async(e)=>{
    e.preventDefault()
    let request=(JSON.parse(localStorage.getItem('token'))) 
    console.log(request)
    console.log(pricein,'pdf')
    const isValid = formValidation()
    if (isValid){
      const rentData = new FormData();
      rentData.append('category',category)
      rentData.append('district',district)
      rentData.append('city',city)
      rentData.append('discription',discription)
      rentData.append('sub_mobile',sub_mobile)
      rentData.append('address',address)
      rentData.append('place',place)
      rentData.append('rate',rate)
      rentData.append('slug',title)
      rentData.append('image',image)
      rentData.append('image1',image1)
      rentData.append('image2',image2)
      rentData.append('price_in',pricein)
      rentData.append('title',title)
      rentData.append('date',date)
        console.log('oke')
        await axios.post('rent/post/',rentData,{
            headers: {
                Authorization:'Bearer  '+ request
            }
        }).then((res)=>{
            console.log(res.data)
            if (res.data.ordernumber){
            localStorage.setItem('order_number',JSON.stringify(res.data.ordernumber))
            localStorage.setItem('rate',JSON.stringify(rate))
            setSubmit(true)
            handleClick()
          }}).catch((err)=>{
            console.log(err.response.data.detail)
           
          })
        }}


// validation function

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
    const imageErr={}
    const image1Err={}
    const image2Err={}
    const dateErr={}

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
        console.log(mobile,'mobile')
        subMobileErr.short_lname = '* sub mobile field is a required field'
        isValid = false
  }else{
      if(sub_mobile!=mobile){
      
      if(sub_mobile.trim().length <9){
        subMobileErr.short_lname = '* mobile number contain min 10 number'
        isValid = false
      }
      else if(sub_mobile.trim().length >10){
        subMobileErr.short_lname = '* mobile number contain only 10 numbers'
        isValid = false
      }
    }else{
      subMobileErr.short_lname = '*  same mobile number is not accepted'
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

  if(!image){
    imageErr.short_cpassword= '*rate  required field!'
    isValid = false
  } 

  if(!image1){
    image1Err.short_cpassword= '*image1  required field!'
    isValid = false
  } 

  if(!image2){
    image2Err.short_cpassword= '*image2 required field!'
    isValid = false
  } 

  if(!date){
    dateErr.short_cpassword= '* valid upto field is  required !'
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
  setImageError(imageErr)
  setImage1Error(image1Err)
  setImage2Error(image2Err)
  setDateError(dateErr)

  return isValid
}


const [check,setCheck]=useState(false)

const handleCheck=()=>{
    console.log('fdff')
if (!check){
    setCheck(true)
    console.log(check)
    setPricein('per_hour')
}else{
    setCheck(false)
    console.log(check)  
    setPricein('per_day')
}
}


// payment section
const [salary,setSalary]=useState('')
const [name, setName] = useState("");
const [amount, setAmount] = useState("");
const [payment_id,setPaymentId]=useState("")
// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
const handlePaymentSuccess = async (response) => {
  try {
    let bodyData = new FormData();
    console.log(response,'its response')
    // we will send the response we've got from razorpay to the backend to validate the payment
    bodyData.append("response", JSON.stringify(response));
    console.log(response,'its response')
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.post('payment/payment/success/',{
      response:response
    },{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res) => {
      console.log(res)
      console.log("Everything is OK!");
      handleClicks()
      console.log(res.data.message)
      localStorage.setItem('message',JSON.stringify(res.data.message))
      setPayed(true)
      setSubmit(false)
      setName("");
      setAmount("");
    })
    .catch((err) => {
      console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };


const loadScript = () => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);
};

const showRazorpay = async (e) => {
  e.preventDefault()
  const res = await loadScript();
  let bodyData = new FormData();

  // we will pass the amount and product name to the backend using form data
  bodyData.append("amount", amount.toString());
  bodyData.append("name", name);

  let request=(JSON.parse(localStorage.getItem('token')))  
  let order_number=(JSON.parse(localStorage.getItem('order_number'))) 


 
  const data = axios.post('payment/pay/',{
    name:order_number ,
    amount:50,
  },{
      headers: {
          Authorization:'Bearer '+ request
        }
  }).then((res) => {
    console.log(res.data,'its data')
    console.log(res.data.order.order_payment_id)      
    setPaymentId(res.data.order.order_payment_id)
    return res;
  });
  console.log(data)

 
  var options = {
    key_id:'rzp_test_xzSR2pt2eeMFXF' , 
    key_secret:'GP3DxufqQIsdwOTTaTdR1OuS',
    amount: amount,
    currency: "INR",
    name: "Org. Name",
    description: "Test teansaction",
    image: "", 
    order_id:payment_id,  
    handler: function (response) {
      // we will handle success by calling handlePaymentSuccess method and
      // will pass the response that we've got from razorpay
      handlePaymentSuccess(response);
    },
    prefill: {
      name: "User's name",
      email: "User's email",
      contact: "User's phone",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
};


// for final view 
  const lastSubmitHandler=(e)=>{
    e.preventDefault()
    let order_number=(JSON.parse(localStorage.getItem('order_number'))) 
    axios.post('rent/payment/finish/',{
      order_number:order_number
    }).then((res)=>{
      if(res.data){
        localStorage.removeItem('order_number')
        localStorage.removeItem('rate')
        localStorage.removeItem('message')
        navigate('/rentlook')
      }
     
    })
  }

  return (
    <div >       

        <h1 className='heading'>GIVING RENT ITEMS</h1>
       
       {submit || payed ?  '': <form onSubmit={submitHandler}   className='main'>
       <CommonStepper steps={steps} activeStep={0}/>
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
                    <div className="form-outline ">
                    <label className="form-label" >Image</label><br></br>
                      <input onChange={imageHandler} style={{color:'white'}} type='file' />
                        {Object.keys(imageErr).map((key)=>{
                                 return <div style={{color:'red'}} >{imageErr[key]}</div> })}         
                          <input style={{color:'white'}}  onChange={image1Handler} className='mt-1' type='file'/> 
                                   {Object.keys(image1Err).map((key)=>{
                                 return <div style={{color:'red'}} >{image1Err[key]}</div> })}      
                           <input style={{color:'white'}}  onChange={image2Handler} className='mt-1 ' type='file'/> 
                                   {Object.keys(image2Err).map((key)=>{
                                 return <div style={{color:'red'}} >{image2Err[key]}</div> })}    
                                
                    </div>
                </div>
            </div>
            <div className="row mb-4">
              <div className="col">                   
                      <div className="form-outline mb-4">
                      <label className="form-label" >Rate</label>
                          <input type="text" id="form6Example5"  onChange={(e)=>setRate(e.target.value)} value={rate}  placeholder='Give a rate for this service'  className="form-control" />
                          {Object.keys(rateErr).map((key)=>{
                                  return <div style={{color:'red'}} >{rateErr[key]}</div> })}                
                      </div>
                  </div>
                <div className="col">                   
                    <div className="form-outline mb-4">
                    <label className="form-label" >Rate per</label><br></br>
                    <label  style={{color:'yellow'}} className="form-label">*  please untick for price in per hour / other wise price for day</label>
                    <div >
                    <Checkbox 
                    onClick={handleCheck}
                            value={check}
                            {...label}
                            defaultChecked
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 48 } }}
                        />
                    </div>
          
                    </div>
                </div>
            </div>
            <div className="row mb-4">
              <div className="col">                   
                      <div className="form-outline mb-4">
                      <label className="form-label" >Rate</label>
                          <input type="date" id="form6Example5"  onChange={dateHandler} value={date}  placeholder='Give a rate for this service'  className="form-control" />
                          {Object.keys(dateErr).map((key)=>{
                                  return <div style={{color:'red'}} >{dateErr[key]}</div> })}                
                      </div>
                  </div>
                <div className="col">                   
                    <div className="form-outline mb-4">   
                    </div>
                </div>
            </div>
         <div className="main-payment  mb-4">   
         {submit ? <div>
          <CommonStepper steps={steps} activeStep={0}/>
          <Button className='payment-btn1' variant="outline-warning"><p>Make Payment</p></Button> 
         </div>   : <Button className='payment-btn' variant="success"  type='submit'><p>Clik here to continue</p></Button>      } 
           
            </div>             
            </form> }
            <div className="main-payment ">   
         {submit &&
         <form className='form-payment'>
            <div className='check-main'>
            <CommonStepper steps={steps} activeStep={1}/>
              <input type="checkbox" className='checkbox' id="vehicle1" name="vehicle1" value="Bike" required></input><p className='check-heading' >Accept all terms & conditions for wedid solutions</p>
                <input type="checkbox" className='checkbox' id="vehicle1" name="vehicle1" value="Bike" required /><p  className='check-heading'>Accept all terms & conditions from Razorpay payment system</p>           
                <p style={{color:'yellow',marginTop:'4rem'}}>** charges applied</p>
                <p  style={{color:'red'}}>**  you should pay 50 rupess for posting </p>    
           
            </div>
           
            
             <Button className='payment-btn2' type='submit' variant="outline-warning" onClick={showRazorpay}><p>Make Payment with razorpay</p></Button><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
             <Button className='payment-btn4' type='' onClick={cancelHandler} variant="outline-danger"><p>cancel</p></Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <div className='box'  >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
                  Successfully register your post
                </Alert>
                </div>               
              </Snackbar>
         </form>  } 
          {payed&& 
           <div >
            <CommonStepper steps={steps} activeStep={2}/>
          </div>}


        { payed &&
       
         <form className='form-payment'>      
        
      
             <Button className='payment-btn2' type='submit' variant="outline-warning" onClick={lastSubmitHandler}><p>SHARE THE POST </p></Button><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
             <Button className='payment-btn4' type='' onClick={cancelHandler} variant="outline-danger"><p>cancel</p></Button>
                <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
                <div className='box'>
                 
                <Alert onClose={handleCloses} severity="success" sx={{ width: '100%' }} >
                  payment done successfully 
                </Alert>
                </div>               
              </Snackbar>
            
         </form>
         
             } 
           
            </div> 
            
    </div>
  )
}
   
export default GivingRent