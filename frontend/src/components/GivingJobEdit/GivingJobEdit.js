import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../../axios'
import {useNavigate,useParams} from 'react-router-dom';
import './singlejob.css'

// material ui
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GivingJobEdit() {

    const parms=useParams()
    const id=parms.id

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


  useEffect(() => {      
   instance()
    getCategory()
    getDistrict()   
    
    
  }, [])

    const [single,setSingle]=useState('')

   // user datas
   const instance=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
    console.log(id,'ddd')
   await axios.get(`job/singlejob/${id}/`,{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
      setSingle(res.data)
        console.log(res.data,'evide work ann')
        setCategory(res.data.category.name)
        // setDistrict(res.data.discrict.district)
        // setCity(res.data.city.city)  
        setTile(res.data.title) 
        setDiscription(res.data.discriptions)
        setAddress(res.data.address)
        setPlace(res.data.place)
        setSubMobile(res.data.sub_mobile)
        setDate(res.data.valid_at)


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

  const cityGetting=async(id)=>{   
            setDistrict(id)
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

    const checkCate=(id)=>{
        setCategory(id)
    }

    const checkCity=(id)=>{        
        setCity(id)
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
        await axios.patch(`job/jobz/${id}/`,{
               
                title:title,
                discriptions:discription,
                sub_mobile:sub_mobile,
                address:address, 
                place:place,              
                valid_at:date,        
              },{
            headers: {
                Authorization:'Bearer  '+ request
            }
        }).then((res)=>{
            console.log(res.data)
            navigate('/givenjobs')
          })
        }





  return (
    <div style={{margin:'2rem'}} >       
        
        <h1 className='heading'>EDIT JOB DETAILS</h1>

            <div className="row mb-4 ">
                <div className="col">
                    <div className="form-outline">
                    <label className="form-label"  >CATEGORY</label>  
                        <Dropdown>
                            <Dropdown.Toggle className='form-control' variant="primary" id="dropdown-basic">
                              CATEGORY
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='fields'>
                                {getcat? getcat.map((obj,key)=>                            
                               
                                <Dropdown.Item href="#/action-1"  key={obj.id}   onClick={()=>checkCate(obj.id)}>{obj.name}</Dropdown.Item>  )   :' '}    
                              
                            </Dropdown.Menu>
                        </Dropdown>   
                   
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
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id}  onClick={()=>cityGetting(obj.id)}>{obj.district}</Dropdown.Item>  )   :' '}  
                                
                            </Dropdown.Menu>
                        </Dropdown> 
                                       
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
                               
                               <Dropdown.Item href="#/action-1"  key={obj.id} onClick={()=>checkCity(obj.id)}  >{obj.city}</Dropdown.Item>  )   :' '}                                 
                               
                            </Dropdown.Menu>
                        </Dropdown>   
                   
                    </div>
                </div>
                <div className="col">
                    <div className="form-outline">       
                    <label className="form-label"  >Sub Mobile Number </label>                 
                        <input type="text" id="form6Example3"  placeholder="This number is not same as you registerd"  onChange={(e)=>setSubMobile(e.target.value)} value={sub_mobile}   className="form-control" />
                  
                    </div>
                </div>
            </div>

            <div className="form-outline mb-4">
                 <label className="form-label">Title</label>
                <input type="text" id="form6Example3"  placeholder='Titile of you job'  onChange={(e)=>setTile(e.target.value)} value={title} className="form-control" />
              
            </div>


            <div className="form-outline mb-4">               
                <label className="form-label" >Discription</label>
                <textarea className='text'  onChange={(e)=>setDiscription(e.target.value)} value={discription}   placeholder='describe about your job role'></textarea>                
             
            </div>
            
            <div className="form-outline mb-4">
                 <label className="form-label" >Address</label>
                <input type="text" id="form6Example6"   onChange={(e)=>setAddress(e.target.value)} value={address}  placeholder='Enter your Address ' className="form-control" />               
          
            </div>

            <div className="row mb-4  ">
                <div className="col">
                    <div className="form-outline">
                        <div className="form-outline mb-4">         
                        <label className="form-label" >Place</label>
                            <input type="text" id="form6Example5"  onChange={(e)=>setPlace(e.target.value)} value={place}  placeholder='Enter your place' className="form-control" />   
                         
                        </div>                                 
                    </div>
                </div>
                <div className="col">                   
                <div className="form-outline mb-4">
                      <label className="form-label" >valid up to</label>
                          <input type="date" id="form6Example5"  onChange={dateHandler} value={date}  placeholder='Give a rate for this service'  className="form-control" />
                             
                      </div>
                
                </div>
            </div>
           
    
         <div className="main-payment  mb-4">   
            <Button className='payment-btn' variant="success" onClick={submitHandler}  type='submit'><p>Edit</p></Button>             
            </div>            
     
            
    </div>
  )
}

export default GivingJobEdit