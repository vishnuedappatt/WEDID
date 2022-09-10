import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './jobshow.css'
import Table from 'react-bootstrap/Table';
// import Button from '@mui/material/Button';
import axios from '../../axios'
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';

// import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack'
import Pagination from '../Pagination';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function Jobshow() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // all job post data
  const[alldata,setAllData]=useState([])
  const[catege,setCatatege]=useState([])
  const[dist,setDistrict]=useState([])
  const[city,setCity]=useState([])

  // pagination
const [currentpage,setcurrentPage]=useState(1)
const [postperpage,setPostPerPage]=useState(3)

  const navigate = useNavigate();

  useEffect(() => {
    getalljob()
    getCategory()
    getDistrict()

    return () => {    
    }
  }, [])
 
  // getting last page and last page
 const lastPageIndex=currentpage * postperpage;
 const firstPageIndex=lastPageIndex - postperpage;
 const currentData =alldata.slice(firstPageIndex,lastPageIndex)

  // / getting all jobpost
  const getalljob=()=>{
    let request=(JSON.parse(localStorage.getItem('token')))  
    axios.get('job/all_job/',{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      console.log(res.data,'its the datass')
        console.log(res.data.results,'its the datass')
        setAllData(res.data)    
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
      setCatatege(res.data)    
     
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
      setDistrict(res.data)
  })
}




// get city
const getcity=async(id)=>{
let request=(JSON.parse(localStorage.getItem('token')))  
await axios.get(`job/showcity/${id}/`,{
    headers: {
        Authorization:'Bearer '+ request
    }
}).then((res)=>{
  if (res.status===200){
    setCity(res.data)
  }    
}).catch((err)=>{
    console.log(err.res.data)
})
}




// filter value of district
const [fil_dis,setFilter]=useState('')
 const handler=(e)=>{
  setFilter(e.target.value)
 }


//  filter by district

const districtFilter=async(e)=>{
  e.preventDefault()
  let request=(JSON.parse(localStorage.getItem('token')))  
  await axios.get(`job/dis_job_view/${fil_dis}/`,{
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    if (res.status===200){
      // setCity(res.data)
      setAllData(res.data) 
      if(res.data.length===0){
        setEmpty(true)
      }  
      handleClose()
    }    
  }).catch((err)=>{
      console.log(err.res.data)
  })
  }


//filter with district city category
 const [fil_cat,setFilterCat]=useState('')
 const [fil_city,setFilterCity]=useState('') 
const [empty,setEmpty]=useState(false)

//  category handler
 const categoryHandler=(e)=>{
  setFilterCat(e.target.value)
 }

//  city handler
const cityHandler=(e)=>{
  setFilterCity(e.target.value)
}

// category city filter

const CatCityFilter=async(e)=>{
       e.preventDefault()
  // console.log(fil_cat,fil_city,'randu, indd')
  let request=(JSON.parse(localStorage.getItem('token')))  
  await axios.get(`job/viewjob/${fil_cat}/${fil_city}/`,{
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    if (res.status===200){
      // setCity(res.data)
      setAllData(res.data)   
      handleClose()
      if(res.data.length===0){
        setEmpty(true)
      }
    }    
  }).catch((err)=>{
      console.log(err.res.data,'fjdfdfkfdf')
  })


}






  return (
    <div>       
      <div align='center ' style={{backgroundColor:'gray'}}>
      <p >wedidsolutions@gmail.com</p>
            <h4>IF OPPURTUNITY DOESN'T KNOCK , BUILD A DOOR</h4>
            <p className='wedid'>WEDID</p>
            <Button className='ms-5 w-25 mb-3' variant="outline-dark" onClick={handleOpen} >FILTER</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">    
            <Accordion className='bg-dark mt-3'>
              <AccordionSummary      
              expandIcon={<ExpandMoreIcon />}          
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{color:'white'}} >Filter by district </Typography>
              </AccordionSummary>              
              <AccordionDetails>
                <Typography>
                <Accordion>
              <AccordionDetails>
          <Typography>               
            <Box sx={{ minWidth: 120 }}>
            <Form onSubmit={districtFilter}>

            
          <FormControl  className='mt-2' fullWidth>
        <InputLabel id="demo-simple-select-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fil_dis}
          label="district"
          onChange={handler}
        >
          { dist ? dist.map((obj)=>
          <MenuItem   value={obj.id}>{obj.district}</MenuItem> ):''}         
        </Select>   
        <Button className='mt-5 mb-3' type='submit' variant="outline-dark" >FILTER</Button>
      </FormControl>
      </Form>
     </Box>
        </Typography>
        </AccordionDetails>
            </Accordion>   
                </Typography>
              </AccordionDetails>
            </Accordion> 
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">                  
            
              <Accordion className='bg-dark mt-3'>
                <AccordionSummary       
                expandIcon={<ExpandMoreIcon />}          
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography style={{color:'white'}} >Filter by place and category</Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                  <Typography>
                  <Accordion>
                <AccordionDetails>
            <Typography>               
              <Box sx={{ minWidth: 120 }}>

            <Form onSubmit={CatCityFilter}>
            <FormControl className='mt-2' fullWidth>
          <InputLabel id="demo-simple-select-label">category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fil_cat}
            label="category"
            onChange={categoryHandler}
          > 
          { catege ? catege.map((obj)=>
            <MenuItem value={obj.id}>{obj.name}</MenuItem> ):''}
           
          </Select>
        </FormControl>
        <FormControl className='mt-2' fullWidth>
          <InputLabel id="demo-simple-select-label">District</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fil_dis}
            label="district" 
            onChange={handler}
          >
           { dist ? dist.map((obj)=>
          <MenuItem value={obj.id} onClick={()=>getcity(obj.id)}>{obj.district}</MenuItem> ):''}
          
          </Select>
        </FormControl>
        <FormControl className='mt-2' fullWidth>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select 
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fil_city}
            label="city"
            onChange={cityHandler}
          >
             { city ? city.map((obj)=>
          <MenuItem value={obj.id}>{obj.city}  </MenuItem> ):''}
           
          </Select>
          <Button className='mt-5 mb-3' type='submit' variant="outline-dark" >FILTER</Button>
        </FormControl>
        </Form>
       </Box>
          </Typography>
          </AccordionDetails>
              </Accordion>   
                  </Typography>
                </AccordionDetails>
              </Accordion> 
            </Typography>
        </Box>
      </Modal>
      </div>

    {currentData ? currentData.map((obj,key)=>
    <div  className='main-div m-5'>   
     <Table striped borderless hover>
      <thead>
        <tr style={{backgroundColor:'gray'}}>          
          <th style={{marginLeft:'3rem'}}>CATEGORY</th>
          <th>DISTRICT</th>
          <th>TITLE OF ROLE</th>
          <th>RATE</th>
          <th>VIEW </th>
        </tr>
      </thead>
      <tbody>
        <tr style={{height:'8rem',border:'1px white solid'}}>
            <td  style={{color:'white'}} className='column pt-5 '>{
              catege.map((objs,key)=>{
                if(objs.id===obj.category){
                   return objs.name                      
                }
              }
              )
            }
             </td>
          <td  style={{color:'white'}}  className='column pt-5 '> {
              dist.map((objs)=>{
                if(objs.id===obj.district){
                   return objs.district                      
                }
              }
              )
            }</td>
          <td  style={{color:'white'}}    className='column pt-5 '>{obj.title}</td>
          <td  style={{color:'white'}}  className='column pt-5 '>{obj.rate}</td>
         <td className=' pay-btn pt-5 '> <Button variant="outline-success" onClick={()=>navigate(`/singlejob/${obj.id}`)} >view and pay</Button></td> 
        </tr>
        
      </tbody>
    </Table>
  
       </div>)
        :''
      }  <Stack  spacing={9}>
       
    </Stack>
    <Pagination totalpost={alldata.length} postperpage={postperpage} setcurrentPage={setcurrentPage} currentpage={currentpage}/>

        {empty? 
        <div align='center'>
              <h1 style={{color:'white',marginTop:'100px'}}>No matches Found</h1>
        </div>
         :''}
    </div>
  )
}

export default Jobshow