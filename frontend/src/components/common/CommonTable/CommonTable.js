import  React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Table from 'react-bootstrap/Table';
import { Button } from '@mui/material';
import MatModal from '../MatModal/MatModal';
import axios from '../../../axios';


const CommonTable=({data1,errorz,cancel,number})=> {

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (id) => {
    setOpen(true);
    setJobId(id)

  };

  const handleClose = () => {
    setOpen(false);
    
  };


  const [complaint,setComplaint]=useState('')
  const [comErr,setComErr]=useState(false)
  const [errorCom,setErrorCom]=useState('')
           // /  total revenue
  // const [complete,setComplete]=useState([])
  const [jobId,setJobId]=useState(' ')


  const submitHandler=async()=>{
 
    if (!complaint){
      setComErr(true)
    }else{
      setComErr(false)
      if (number){
        console.log('its jobb')
        let request=(JSON.parse(localStorage.getItem('token')))  
      
        await axios.post('job/complaint/',
        {
         jobId:jobId,
         complaint:complaint,
        },
        {
             headers: {
                 Authorization:'Bearer '+request
               }
         }).then((res)=>{
           setErrorCom('submitted successfully')
          console.log(res.data,'dataa  ')
           
         }).catch((err)=>{
           console.log(err.response.data,'klklok')
           setErrorCom(err.response.data.error)
         })
      }
    else{
      console.log('its workk its rent')
      console.log('its jobb')
      let request=(JSON.parse(localStorage.getItem('token')))  
    
      await axios.post('rent/complaint/',
      {
       jobId:jobId,
       complaint:complaint,
      },
      {
           headers: {
               Authorization:'Bearer '+request
             }
       }).then((res)=>{
         setErrorCom('submitted successfully')
        console.log(res.data,'dataa  ')
         
       }).catch((err)=>{
         console.log(err.response.data,'klklok')
         setErrorCom(err.response.data.error)
       })
    }
   
    }
  }


  return (
    <Box sx={{ width: '100%' }}>
      <MatModal save={submitHandler} error2={errorCom} data1={complaint}  set1={setComplaint} error1={comErr} open={open} cancel={cancel} message='innddd'  />
      {data1.length ==0 ? <><h6>no data found</h6></> :
       <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th> Title</th>
          <th>category</th>
          <th>posted on</th>
          <th>valid</th> 
          <th>Complaints</th>        
        </tr>
      </thead>
      
      <tbody>         
        
       {data1 && data1.map((obj,key)=>     
       <tr>
          <td >{obj.id}</td>
          <td>{obj.title}</td>
          <td>{obj.category.name }</td>
          <td>{String(obj.created_at).slice(0,10).split("-").reverse().join("-")}</td>
          <td>{String(obj.valid_at).split("-").reverse().join("-")}</td>
          <td><Button onClick={()=>handleClickOpen(obj.id)}>Complaints</Button></td>
        </tr> 

         )}       
      </tbody>
      <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>
    </Table>
      }
    </Box>
  );
}
export default CommonTable;