import React,{useState} from 'react'
import axios from '../axios'

function Payment() {

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
        console.log("Everything is OK!");
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

  const showRazorpay = async () => {
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount.toString());
    bodyData.append("name", name);
 
    let request=(JSON.parse(localStorage.getItem('token')))  
    const data = axios.post('payment/pay/',{
      name:name ,
      amount:amount,
    },{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res) => {
      console.log(res.data)
      console.log(res.data.order.order_payment_id)
      
      setPaymentId(res.data.order.order_payment_id)

      return res;
    });
    console.log(data,'isthedata')

   
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
  return (
    <div>

<div className="container" style={{ marginTop: "20vh" }}>
      <form>
        <h1 style={{color:'white'}}>Payment page</h1>

        <div className="form-group">
          <label htmlFor="name" style={{color:'white'}}>Product name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1" style={{color:'white'}}>Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form>
      <button onClick={showRazorpay} className="btn btn-primary btn-block">
        Pay with razorpay
      </button>
    </div>
    </div>
  )
}

export default Payment