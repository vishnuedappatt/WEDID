import React,{useEffect,useState,useContext} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Form from 'react-bootstrap/Form';
import './Rentsidebar.css'
import axios from '../../axios'
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import GetDistrict from '../common/District/District';
import GetRentCategory from '../common/RentCategory/RentCategory';
import RentContext from '../../context/rentcontext'

// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//   };

function RentSideBar() {
  const {getrentjob,setData,data,setEmpty,empty,setSearchImage}=useContext(RentContext)
 const[catege,setRentCatege]=useState([])
 const[dist,setDist]=useState([])
 const[city,setCity]=useState([])


useEffect(() => {
  GetDistrict({setDist})
 GetRentCategory({setRentCatege})
}, [])

//  filter by district




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
  
//filter with district city category
const [fil_dis,setFilterDis]=useState('') 
const [fil_cat,setFilterCat]=useState('')
const [fil_city,setFilterCity]=useState('') 
// const [empty,setEmpty]=useState(false)

//  category handler
const categoryHandler=(e)=>{
 setFilterCat(e.target.value)
}

//  city handler
const cityHandler=(e)=>{
 setFilterCity(e.target.value)
}

// district handler
const handler=(e)=>{
  setFilterDis(e.target.value)
 }



//  filter by district

const districtFilter=async(e)=>{
  e.preventDefault()
  let request=(JSON.parse(localStorage.getItem('token')))  
  await axios.get(`rent/filterdistrict/${fil_dis}/`,{
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    if (res.status===200){
      // setCity(res.data)
      // console.log(res.data)
      setSearchImage(false)
      setData(res.data) 
      if(res.data.length===0){
        setEmpty(true)
      }  
      // handleClose()
    }    
  }).catch((err)=>{
      console.log(err.res.data)
  })
  }




// category city filter

const CatCityFilter=async(e)=>{
       e.preventDefault()
  // console.log(fil_cat,fil_city,'randu, indd')
  let request=(JSON.parse(localStorage.getItem('token')))  
  await axios.get(`rent/filter/${fil_cat}/${fil_city}/`,{
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    if (res.status===200){
      // setCity(res.data)
      setData(res.data)   
      setEmpty(false)
      setSearchImage(false)
      if(res.data.length===0){
        setEmpty(true)
      }
    }    
  }).catch((err)=>{
      console.log(err.res.data,'fjdfdfkfdf')
  })

}

const [searErr,setErrorSear]=useState(false)
// category city filter
const searchData=async(e)=>{
  e.preventDefault()
  console.log(sear,'search key')
  if (!sear){
    setErrorSear(true)
  }
  else{
    console.log('ethiii ')
    let request=(JSON.parse(localStorage.getItem('token')))  
    await axios.get(`rent/search/?search=${sear}`,{
     headers: {
         Authorization:'Bearer '+ request
     }
    }).then((res)=>{
    if (res.status===200){
     // setCity(res.data)
     if (res.data.results){
      setSearchImage(true)
      setData(res.data.results)   
      console.log(res.data.results)
     }
      
     setEmpty(false)
     if(res.data.results.length===0){
       setEmpty(true)
     }
    }    
    }).catch((err)=>{
     console.log(err.res.data,'fjdfdfkfdf')
    })
    
  }
}

// search
const [sear,setSearch]=useState('')
const searchHandler=(e)=>{
  setSearch(e.target.value)
    console.log(e.target.value)
}


  
  return (
    <div  >   
     <div className='header'>
     <h3 className='wedid' align='center'>WEDID</h3>
     <Form onSubmit={searchData} value={sear} align='center'>
                  <Form.Control 
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={searchHandler}                   
                  />
                  <Button className='submit-btn m-4' type='submit' variant="outline-dark">Search</Button>
                </Form>
                {searErr && <p style={{color:'red'}}> * please enter any key for searching</p>}
        <Box>
          <Typography className='type' id="modal-modal-title" variant="h6" component="h2">    
            <Accordion className= 'accordion bg-dark mt-3 p-3'>
              <AccordionSummary      
              expandIcon={<ExpandMoreIcon />}          
                aria-controls="panel1a-content"
                id="panel1a-header"
                className='dropaccor'
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

            
          <FormControl  className='form-1 mt-2 ' fullWidth>
        <InputLabel id="demo-simple-select-label">District</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fil_dis}
          label="district"
          onChange={handler}
        >
          { dist ? dist.map((obj)=>
          <MenuItem  value={obj.id} >{obj.district}</MenuItem>  ):''}
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
            
              <Accordion className='bg-dark mt-3 p-3'>
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

            <Form onSubmit={CatCityFilter} >
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
     </div>
    </div>
  )
}

export default RentSideBar