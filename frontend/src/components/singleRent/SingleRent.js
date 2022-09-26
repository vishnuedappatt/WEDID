import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useParams} from 'react-router-dom'
import axios from '../../axios';
import ImageUrl from '../common/Image/Image';
import Carousel from 'react-bootstrap/Carousel';
import CommonModal from '../common/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationOn from '@mui/icons-material/LocationOn';

function SingleRent() {
    const parms=useParams();
    let id=parms.id
    console.log(id,'itha id')

    const navigate=useNavigate()
  
    useEffect(() => {
        getSingleRentItem()
        let val=JSON.parse(localStorage.getItem('message'))
        console.log(val,'kkik') 
        if (val){
          setPayed(true)
       
        }
    
    }, [])


    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        e.preventDefault()
      setIndex(selectedIndex);
    };
    // storing data of single user
    const [rent,setRent]=useState('')
    const getSingleRentItem=async()=>{
        console.log(id)
        let request=(JSON.parse(localStorage.getItem('token')))  
          await axios.get(`rent/singleview/${id}/`,{
            headers: {
                Authorization:'Bearer '+ request
            }
        }).then((res)=>{
          if(res.status===200){
            setRent(res.data)
            console.log(res.data,'single jobb')
            // setErrorFixing(true)
          }
        })
      }





 // common modal
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true)

// common modal
const [showz, setShowz] = useState(false);
const handleClosez = () => setShowz(false);
const handleShowz = () => setShowz(true)




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
   
    await axios.post('payment/payment/success/',bodyData,{headers:{Authorization:'Bearer '+request}})
      .then((res) => {
        console.log("Everything is OK!");
           console.log(res.data.message)
        localStorage.setItem('message',JSON.stringify(res.data.message))
        setPayed(true)     
        setName("");
        setAmount("");
        handleClosez()
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
  bodyData.append("name", name);

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


// / final submit
    const finalsubmit=async()=>{
        let request=(JSON.parse(localStorage.getItem('token')))  
          await axios.post('payment/finish/',{id:id},{
            headers: {
                Authorization:'Bearer '+ request
            }
        }).then((res)=>{
          if(res.status===200){
            // setJob(res.data)
            localStorage.removeItem('message')
            handleClose()
            console.log(res.data)         
            navigate('/rentlook')        
          }
        })
      }
    
  return (
  <div align='center'>
    {rent &&  <div className='container'>      
       <Card style={{borderBottomLeftRadius:'150px',borderTopRightRadius:'150px'}}>
       <CommonModal message={'are you sure to get this service'} modalHeading={'Confirmation for service'} btnsave={'confirm to get this '} fncall={showRazorpay} show={showz} onHide={handleClosez}/>
       <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block"
          style={{width:'500px'}}
          src={ImageUrl+rent.image}
          alt="First slide"
          />
        <Carousel.Caption>        
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style={{width:'500px'}}
          src={ImageUrl+rent.image1}
          alt="Second slide"
          />
        <Carousel.Caption>         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          style={{width:'500px'}}
          src={ImageUrl+rent.image2}
          alt="Third slide"
        />
        <Carousel.Caption>       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>     
      <Card.Body style={{backgroundColor:'#0962',borderBottomLeftRadius:'150px'}}>    
      {payed ? <div>
        <Card.Title className=''>{rent.title}</Card.Title>
        <span>* please click the button for complete your order</span>
      </div>
    :' '}
   {!payed &&   
   <div>   
        <Card.Title style={{fontWeight:'900' ,fontSize:'30px'}}>{rent.title}</Card.Title>
        <Card.Title>{rent.category.name}</Card.Title>
        <Card.Text><LocationOn color="dark" />   {rent.district.district},{rent.city.city}</Card.Text>
        <Card.Text onClick={handleShow} style={{color:'red'}}>Discriptions</Card.Text>
        <CommonModal message={rent.discriptions} modalHeading={'Discription and rules'} btnsave={''} show={show} onHide={handleClose}/>
        {/* <Card.Text >{rent.discriptions}</Card.Text> */}
        </div> }
       {payed ? <Button  onClick={finalsubmit} variant="outline-dark">Get this Item</Button> : <Button style={{height:'60px',marginTop:'20px'}} onClick={handleShowz} className='h-5' variant="danger">Make Payment</Button>}
      </Card.Body>
    </Card>
        </div>}
    </div> 
  )
}

export default SingleRent