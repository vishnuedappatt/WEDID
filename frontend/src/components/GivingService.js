import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import './GivingService.css'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../axios'
import {useNavigate} from 'react-router-dom';
import './materalui.css'
import Alert from '@mui/material/Alert';

// material ui
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
import CommonStepper from './common/CommonStepper/CommonStepper';

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function GivingService() {
    const navigate=useNavigate()
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
    const [mobile,setMobile]=useState('')

  useEffect(() => {      
    let request=(JSON.parse(localStorage.getItem('authToken')))  
    console.log(request,'rere')    
    getCategory()
    getDistrict()   
    userData()   
    let val=(JSON.parse(localStorage.getItem('order_number')))   
    if (val){
        setSubmit(true)
    }       
    let message=(JSON.parse(localStorage.getItem('message')))
    if (message){
      setPayed(true)
    }
    return () => {      
    }
  }, [])

// steps for stepper
  const steps = [
    'Fill the black for creating post',
    'payment section',
    'Post the job',
  ];



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

  const cityGetting=async(id,name)=>{   
            setDistrict(id)
            setDis(name)
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
  const[dateErr,setDateError]=useState({})


  const [ca,setCa]=useState('')
  const [dis,setDis]=useState('')
  const [ci,setCi]=useState('')
    const checkCate=(id,name)=>{
        setCategory(id)
         setCa(name)
    }

    const checkCity=(id,name)=>{        
        setCity(id)
        setCi(name)
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
                date:date,        
              },{
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
  else if(address.trim().length<3)
  {
    placeErr.short_email= '* this place field contain min 3 char'
    isValid = false
  }
  

   if(!rate){
    rateErr.short_cpassword= '*rate  required field!'
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
  setDateError(dateErr)

  return isValid
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

    // we will send the response we've got from razorpay to the backend to validate the payment
    bodyData.append("response", JSON.stringify(response));
    bodyData.append("typez",'job')


   let request=(JSON.parse(localStorage.getItem('token')))  
   
    await axios.post('payment/payment/success/',bodyData,{headers:{Authorization:'Bearer '+request}})
      .then((res) => {
        console.log("Everything is OK!");
        handleClicks()
        console.log(res.data.message)       
        setPayed(true)
        setSubmit(false)
        setName("");
        setAmount("");
        localStorage.removeItem('order_number')
        localStorage.removeItem('rate')
        navigate('/joblook')

      })
    }catch(error){
    console.log(console.error())
  }
}
 

// this will load a script tag which will open up Razorpay payment card to make //transactions
const loadScript = () => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);
};

const showRazorpay = async () => {
    // e.preventDefault()
  const res = await loadScript();

  let bodyData = new FormData();

  // we will pass the amount and product name to the backend using form data
 


  let rate=(JSON.parse(localStorage.getItem('rate'))) 
  console.log(rate,'its rate')
  if (rate>500){
    const sum=parseInt(rate)+parseInt(rate*.1)
    bodyData.append("amount", sum);
    console.log(sum)
    setSalary(sum,'lll')
  }else if(rate<500){
    const sum=parseInt(rate)+parseInt(rate*.05)
    bodyData.append("amount", sum);
    console.log(sum)
    setSalary(sum)
  }else{
    const sum=parseInt(rate)+parseInt(rate*.025)
    bodyData.append("amount", sum);
    console.log(sum)
    setSalary(sum)
  }
  

  let order_number=(JSON.parse(localStorage.getItem('order_number'))) 
  bodyData.append("name",order_number.toString());
  bodyData.append("typez",'job')
  bodyData.append("buyer",'no')

  let request=(JSON.parse(localStorage.getItem('token')))  
  const data = await axios.post('payment/pay/',bodyData,{headers:{Authorization:'Bearer '+request}}).then((res) => {
    return res;
  });

  // in data we will receive an object from the backend with the information about the payment
  //that has been made by the user

  var options = {
    key_id: process.env.REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
    key_secret: process.env.REACT_APP_SECRET_KEY,
    amount: data.data.payment.amount,
    currency: "INR",
    name: "Org. Name",
    description: "Test teansaction",
    image: "", // add image url
    order_id: data.data.payment.id,
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




const [che1,setChe1]=useState(false)
  const checkBox1=()=>{

    if(!che1){
      setChe1(true)
    }else{
      setChe1(false)
    }

  }
  const [che2,setChe2]=useState(false)
  const checkBox2=()=>{
    if(!che2){
      setChe2(true)
    }else{
      setChe2(false)
    }
  }
const  checkChecker=(e)=>{
  e.preventDefault()
  if(!che1 || !che2 ){
    console.log('workingg')
  }else{
    showRazorpay()
  }
}

  return (
    <div >       
      <div align='center'>
      <h1 className='heading'>APPLY FOR AN OPPORTUNITY</h1>
      </div>
        
          {/* <CommonStepper className='mt-5' activeStep={0} steps={steps}/> */}
       {submit || payed ?   <CommonStepper className='mt-5' activeStep={1} steps={steps}/>: <form onSubmit={submitHandler}   className='main'>
  
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
                               
                                <Dropdown.Item href="#/action-1"  key={obj.id}   onClick={()=>checkCate(obj.id,obj.name)}>{obj.name}</Dropdown.Item>  )   :' '}    
                              
                            </Dropdown.Menu>
                        </Dropdown>   
                        <span style={{color:'yellow'}}>{ca}</span>
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
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>cityGetting(obj.id,obj.district)}>{obj.district}</Dropdown.Item>  )   :' '}  
                                
                            </Dropdown.Menu>
                        </Dropdown> 
                        <span style={{color:'yellow'}}>{dis}</span>
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
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id} onClick={()=>checkCity(obj.id,obj.city)}  >{obj.city}</Dropdown.Item>  )   :' '}                                 
                               
                            </Dropdown.Menu>
                        </Dropdown>   
                        <span style={{color:'yellow'}}>{ci}</span>
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
                    <div className="form-outline mb-4">
                    <label className="form-label" >Rate</label>
                        <input type="text" id="form6Example5"  onChange={(e)=>setRate(e.target.value)} value={rate}  placeholder='Give a rate for this service'  className="form-control" />
                        {Object.keys(rateErr).map((key)=>{
                                 return <div style={{color:'red'}} >{rateErr[key]}</div> })}                
                    </div>
                </div>
            </div>
            <div className="row mb-4">
              <div className="col">                   
                      <div className="form-outline mb-4">
                      <label className="form-label" >valid up to</label>
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
         {submit ? <Button className='payment-btn1' variant="outline-warning"><p>Make Payment</p></Button>  :<Button className='payment-btn' variant="success"  type='submit'><p>Clik here to continue</p></Button>      } 
           
            </div>             
            </form> }
            <div className="main-payment ">   
         {submit ?
         <form className='form-payment'>
            <div className='check-main'>
              <input type="checkbox" className='checkbox' id="vehicle1" name="vehicle1" value="Bike" onClick={checkBox1} ></input><p className='check-heading' >Accept all terms & conditions for wedid solutions</p>
                <input type="checkbox" className='checkbox' id="vehicle1" name="vehicle1" value="Bike"   onClick={checkBox2}/><p  className='check-heading'>Accept all terms & conditions from Razorpay payment system</p>     
            { (!che1 || !che2 )?   <Alert variant="filled" auto severity="error">Please click tick for terms and condition</Alert>   : ' '}   
                <p style={{color:'yellow',marginTop:'4rem'}}>** charges applied</p>
                <p  style={{color:'red'}}>**  your our rate is less than 500 you should pay 5%,</p>    
            <p  style={{color:'red'}}>**  your our rate is greater  than 500 you should pay 10%,</p>
            {/* <p  style={{color:'red'}}>**  your our rate is greater 1000 you should pay 15%,</p>      */}
            </div>
           
            
             <Button className='payment-btn2' type='submit' variant="outline-warning" onClick={checkChecker}><p>Make Payment with razorpay</p></Button><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
             <Button className='payment-btn4' type='' onClick={cancelHandler} variant="outline-danger"><p>cancel</p></Button>

             {/* { open &&<Alert variant="filled" auto severity="error">Please click tick for terms and condition</Alert> } */}

              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <div className='box'  >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
                  Successfully register your post
                </Alert>
                </div>               
              </Snackbar>
         </form>:'  '  } 


          
            </div> 
            
    </div>
  )
}

export default GivingService