import axios from '../../axios';
import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import './singlejob.css'
import GetCategory from '../common/Category/Category';
import GetDistrict from '../common/District/District';
import GetCity from '../common/City/City';
import CommonModal from '../common/Modal/Modal';
import CommonSnackbar from '../common/CommonSnackbar/CommonSnackBar';
import Slide from '@mui/material/Slide';
import ReactLoading from 'react-loading';

function SingleJob() {
    const parms=useParams();
    let id=parms.id
   
   const navigate=useNavigate()
const [job,setJob]=useState([])
const[catege,setCatege]=useState([])
const[dist,setDist]=useState([])
const[city,setCity]=useState([])


  // error
  const [errorfixing,setErrorFixing]=useState(false)
// for showing free service
const [count,setCount]=useState(false)

    useEffect(() => {      
      getsinglejob()    
     GetCategory({setCatege})
      GetDistrict({setDist})
      GetCity({setCity})
      userData()     
      let val=JSON.parse(localStorage.getItem('message'))
      console.log(val,'kkik') 
      if (val){
        console.log(val,'df')
        setPayed(true)
        setErrorFixing(false)
      }
    },[])
    // user datas

  const userData=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.get('user/profiles/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        // setUser(res.data)
        console.log(res.data,'evide work annuu')
            if(res.data.count>1){  
              console.log('jkjk')
              setCount(true)
        }
    })
}


    // common modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)



    const getsinglejob=async()=>{
      console.log(id)
      let request=(JSON.parse(localStorage.getItem('token')))  
        await axios.get(`job/singlejob/${id}/`,{
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        if(res.status===200){
          setJob(res.data)
          console.log(res.data,'single jobb')
          setErrorFixing(true)
        }
      })
    }



    // free payment
    const freePayment=async()=>{
      setView(true)
      let request=(JSON.parse(localStorage.getItem('token')))  
        await axios.post('payment/free/',{id:id},{
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        if(res.status===200){
          // setJob(res.data)
          setView(false)
          localStorage.removeItem('message')
          handleClose()
          console.log(res.data)
          userData()
          navigate('/joblook')        
        }
      })
    }

    
    // common snakbar
    function TransitionLeft(props) {
      return <Slide {...props} direction="left" />;
    }
    
    const [open, setOpen] = useState(false);
    const [transition, setTransition] =useState(undefined);
  
    const handleClick = (Transition) => () => {
      setTransition(() => Transition);
      setOpen(true);
    };
  
    const snackHandleClose = () => {
      setOpen(false);
    };


// payment section

const [name, setName] = useState("");
const [amount, setAmount] = useState("");
const [payment_id,setPaymentId]=useState("")
const [payed,setPayed]=useState(false)

// this function will handel payment when user submit his/her money
// and it will confim if payment is successfull or not
const handlePaymentSuccess = async (response) => {
  try {
    let bodyData = new FormData();

    // we will send the response we've got from razorpay to the backend to validate the payment
    bodyData.append("response", JSON.stringify(response));

   let request=(JSON.parse(localStorage.getItem('token')))  
   bodyData.append("typez",'job')
   
    await axios.post('payment/payment/success/',bodyData,{headers:{Authorization:'Bearer '+request}})
      .then((res) => {
        console.log("Everything is OK!");
        console.log(res.data.message)
        localStorage.setItem('message',JSON.stringify(res.data.message))
        setPayed(true)
        handleClick(TransitionLeft)
        setName("");
        setAmount("");
        setErrorFixing(false)
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
  const res = await loadScript();

  let bodyData = new FormData();

  // we will pass the amount and product name to the backend using form data
  bodyData.append("amount", 50);
  
  bodyData.append("name", job.ordernumber);
  bodyData.append("typez",'job')
  bodyData.append("buyer",'yes')
  let request=(JSON.parse(localStorage.getItem('token')))  
  const data = await axios.post('payment/pay/',bodyData,{headers:{Authorization:'Bearer  ' +request}}).then((res) => {
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




const [view,setView]=useState(false)
const Example = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
);



const val='30rem'

  return (

  <div >      
       <Card style={{ backgroundColor:'black',borderRadius:'2rem'}}>
        <CommonModal message={'are you sure to get this service'} modalHeading={'Confirmation for service'} btnsave={'confirm to get this '} fncall={freePayment} show={show} onHide={handleClose}/>
      <Card.Img  />
      <Card.Body> 
      {payed ?
    
    <div align='center' style={{height:'20rem'}}>
       <CommonSnackbar onClose={snackHandleClose} message={'are you want this'} values={'fdfdffdd'} transition={transition} open={open} />
      
    <p style={{color:'yellow',marginTop:'15rem'}}>You are ready to get this service </p>
    <h5 style={{color:'white'}}>{job.title }</h5>
    { view && <Example  type='bars' color='red'/>}
  <Button variant="dark" type=""  onClick={freePayment}    style={{textAlign:'center',height:'4rem',width:'15rem',}}>Get this Service</Button>

  </div>:''}
     {errorfixing ?   
    <div style={{paddingLeft:'100px'}}>   
    { payed ?'':
    <div>
        <span style={{color:'wheat',}}>Title</span> <h2 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.title }</h2>
      <span style={{color:'wheat',}}>CATEGORY</span> <h2 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.category.name }</h2>
      <span style={{color:'wheat',}}>DISTRICT</span> <h3 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.district.district}</h3>      
      <span style={{color:'wheat',}}>CITY</span> <h3 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.city.city }</h3>      
      <span style={{color:'wheat',}}>DISCRIPTION</span> <h4 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.discriptions}</h4>
      <span style={{color:'wheat',}}>POST DATE</span> <h4 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{String(job.created_at).slice(0,10).split("-").reverse().join("-")}</h4>
      <span style={{color:'wheat',}}>VALID</span> <h4 style={{color:'white',marginLeft:'60px',marginTop:'20px'}}>{job.valid_at}</h4>
      </div>}
      { count && !payed && <div align='center'>      
        <div align='center'>
        <CommonSnackbar  onClose={snackHandleClose} transition={transition} open={open} />
        </div>    
        <p style={{color:'yellow'}}>** this service you can get only giving the service charge it is <span style={{color:'red'}}>50</span> rupees/post *</p>
      <Button variant="primary" type="" onClick={showRazorpay}   style={{textAlign:'center',height:'4rem',width:'15rem',}}>Pay for getting this service</Button>
      </div> }
      {count ?'': 
      <div align='center'>
      <p style={{color:'yellow'}}>** First service for a employ is absolutly free </p>
    <Button variant="dark" type=""  onClick={handleShow}   style={{textAlign:'center',height:'4rem',width:'15rem',}}>Get this Service</Button>
    </div>
      }
        </div> 
  :''}
          
    
      </Card.Body>
    </Card>
    
    </div>
  )
}

export default SingleJob