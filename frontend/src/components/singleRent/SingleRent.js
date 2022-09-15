import React,{useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useParams} from 'react-router-dom'
import axios from '../../axios';
import ImageUrl from '../common/Image/Image';
import Carousel from 'react-bootstrap/Carousel';
import CommonModal from '../common/Modal/Modal';
import { useNavigate } from 'react-router-dom';

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
          console.log(val,'df')
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
     
      console.log(res.data.message)
      localStorage.setItem('message',JSON.stringify(res.data.message))
      setPayed(true)
      handleClose()
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
  const data = axios.post('payment/pay/',{
    name:rent.ordernumber ,
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

       <Card >
       <CommonModal message={'are you sure to get this service'} modalHeading={'Confirmation for service'} btnsave={'confirm to get this '} fncall={showRazorpay} show={show} onHide={handleClose}/>
       <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block"
          src={ImageUrl+rent.image}
          alt="First slide"
          />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src={ImageUrl+rent.image1}
          alt="Second slide"
          />

        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block "
          src={ImageUrl+rent.image2}
          alt="Third slide"
        />

        <Carousel.Caption>
       
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     
      <Card.Body className='bg-warning'>
      <Card.Title className=''>{rent.title}</Card.Title>
      {payed ? <span>* please click the button for complete your order</span>:' '}
   {!payed &&   <div> 
        <Card.Title className=''>{rent.title}</Card.Title>
        <Card.Title>{rent.category.name}</Card.Title>
        <Card.Text>{rent.district.district}</Card.Text>
        <Card.Text>{rent.city.city}</Card.Text>
        <Card.Text>{rent.discriptions}</Card.Text>
        </div> }
       {payed ? <Button onClick={finalsubmit} variant="outline-dark">Get this Item</Button> : <Button onClick={handleShow} className='h-5' variant="primary">Make Payment</Button>}
      </Card.Body>
    </Card>
        </div>}
    </div> 
  )
}

export default SingleRent