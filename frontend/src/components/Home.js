import React from 'react'
import './Home.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div align='center ' >
      <div style={{backgroundColor:'gray'}}>
      <p >wedidsolutions@gmail.com</p>
            <h4>IF OPPURTUNITY DOESN'T KNOCK , BUILD A DOOR</h4>
            <p className='wedid'>WEDID</p>
           
      </div>
    
     <div  className='main-btn2 mt-5 ml-5 textAlign:center'>
     <img className='pic1' src='https://5.imimg.com/data5/JG/BW/MY-64708915/jobs-in-greater-noida-1000x1000.jpg' alt='nothing inside' /> 
        <h1 className='main-header1'>NEED A SERVICE ? </h1>
        <p className='sub-heading'>Are you giving a service here ?  click the button </p>   
        <Button className='clk-btn'><Link to='/postjob' style={{textDecoration:'None',color:'white '}}>Click here</Link></Button>
     </div>
     <div  className='main-btn2 mt-5 ml-5 textAlign:center'>
     <img className='pic1' src='https://as2.ftcdn.net/v2/jpg/03/66/03/87/1000_F_366038737_36EAv6suOflplUQlHAhOlAxI3OYloJmi.jpg' alt='nothing inside' />
           <h1 className='main-header1'>LOOKING FOR AN OPPORTUNITY ?</h1>
        <p className='sub-heading'>Are you looking for a a service here ? click the button </p>   
        <Button className='clk-btn'><Link to='/joblook' style={{textDecoration:'None',color:'white '}}>Click here</Link></Button>
     </div>
     
     <div  className='main-btn1 mt-5 ml-5 textAlign:center'>
     <img className='pic1' src='https://media.istockphoto.com/vectors/hand-giving-keys-ome-real-estate-property-purchase-rent-sale-buying-vector-id1192628618' alt='nothing inside'/>
    
        <h1 className='main-header1'>RENT OUT EQUIPMENT ? </h1>
        <p className='sub-heading'>Are you giving a rent item  here ? click the button </p>   
        <Button className='clk-btn'><Link to='/postrent' style={{textDecoration:'None',color:'white '}}>Click here</Link></Button>
     </div>
     
     <div  className='main-btn2 mt-5 ml-5 textAlign:center'>
     <img className='pic1' src='https://thumbs.dreamstime.com/z/key-car-hand-cartoon-style-give-take-buy-rent-vehicle-vector-illustration-flat-design-isolated-background-red-auto-template-147799430.jpg' />
     <h1 className='main-header1'>BORROW AN EQUIPMENT</h1>
      
        <p className='sub-heading'>Are you looking for a rent item  ?are you want a job then click the button </p>   
        <Button className='clk-btn'><Link to='/rentlook' style={{textDecoration:'None',color:'white '}}>Click here</Link></Button>
     </div>
     

  
        <div style={{backgroundColor:'gray'}}>
           
          
            <p className='wedid'>WEDID</p>
            <p style={{marginTop:'70px'}}>wedidsolutions@gmail.com</p>
      </div>
      </div>
  )
}

export default Home