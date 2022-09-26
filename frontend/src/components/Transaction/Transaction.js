import React,{useState} from 'react'
import ListSideBar from '../ListSideBar/ListSideBar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Button } from '@mui/material'
import MaterialModal from '../common/MaterialModal/MaterialModal'
import axios from '../../axios'
function Transaction() {


    const [exp,setExp]=useState('')
     // / total expense
     const totalServiceExpence=async(id)=>{   
        let request=(JSON.parse(localStorage.getItem('token')))  

       await axios.post('job/giving_exp/',{},{
            headers: {
                Authorization:'Bearer '+request
              }
        }).then((res)=>{
          setExp(res.data.count)
          console.log(res.data)
            
          
        })
    }
 
     // /  total revenue
     const [revenue,setRevenue]=useState('')
     const totalServiceRevenue=async(id)=>{   
        let request=(JSON.parse(localStorage.getItem('token')))  
      
       await axios.post('job/revenue/',{},{
            headers: {
                Authorization:'Bearer '+request
              }
        }).then((res)=>{
         setRevenue(res.data.count)
         console.log(res.data)
          
        })
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (id) => {
      setOpen(true);
      totalServiceRevenue()  
    };
  
    const handleClose = () => {
      setOpen(false);
      
    };


    const [openz, setOpenz] = React.useState(false);

    const handleClickOpenz = (id) => {
      setOpenz(true);
      totalServiceExpence()
  
    };
  
    const handleClosez = () => {
      setOpenz(false);
    };
  
  
  return (
    <div>
          <Row>
        <Col lg={4}>
          <ListSideBar val={1}/>
        </Col>
        <Col  lg={8}>
          <div align='center' style={{'height':'60vh','backgroundColor':'black',padding:'14rem'}}>
            <MaterialModal open={open} handleClose={handleClose} head='Your Total Revenue' message={'you  have erned    '+   revenue + ' ₹' }/>
            <MaterialModal open={openz} handleClose={handleClosez} head='Your Total Service Expence ' message={'you  gived erned    ' +  exp  +'  ₹ '}/>

            <Button onClick={handleClickOpen}>Your Revenue</Button><br></br>
            <Button onClick={handleClickOpenz}>Expense for service</Button>
            </div>
        </Col>  

        </Row>
    </div>
  )
}

export default Transaction