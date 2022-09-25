import React,{useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from '../../axios'
import {useNavigate,useParams} from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';



// material ui
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import GetCategory from '../common/Category/Category';
import GetDistrict from '../common/District/District';
import CommonStepper from '../common/CommonStepper/CommonStepper';
import GetRentCategory from '../common/RentCategory/RentCategory';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EditRentHistory() {
    const navigate=useNavigate()

    const parms=useParams()
    const id=parms.id
    const[getcat,setRentCatege]=useState([])
    const[getdis,setDist]=useState([])
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

  const [pricein,setPricein]=useState('per_day')


  useEffect(() => {      
   
         GetRentCategory({setRentCatege})
       GetDistrict({setDist})
     
        instance()
   
  }, [])


//   / user datas
  const instance=async()=>{   
   let request=(JSON.parse(localStorage.getItem('token')))  
   console.log(id,'ddd')
  await axios.get(`rent/rents/${id}/`,{
       headers: {
           Authorization:'Bearer '+ request
         }
   }).then((res)=>{
    
       console.log(res.data,'evide work ann')

       setTile(res.data.title) 
       setDiscription(res.data.discriptions)
       setAddress(res.data.address)
       setPlace(res.data.place)
       setSubMobile(res.data.sub_mobile)
       setDate(res.data.valid_at)
       setPricein(res.data.price_in)

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
        console.log('id',id)
        setCategory(id)
    }

    const checkCity=(id)=>{        
        setCity(id)
    }

    // for submitting
    const [submit,setSubmit]=useState(false)
    const [payed,setPayed]=useState(false)
  // api call for submit job
  const cancelHandler=(e)=>{
    e.preventDefault()
    localStorage.removeItem('order_number')
    navigate('/')

  }


  // for image getting
const [image,setImage]=useState()
  const imageHandler=(e)=>{
    console.log('er')
    setImage(e.target.files[0])

  }
  // for image getting
  const [image1,setImage1]=useState()
  const image1Handler=(e)=>{
    console.log('er')
    setImage1(e.target.files[0])

  }
  // for image getting
  const [image2,setImage2]=useState()
  const image2Handler=(e)=>{
    console.log('er')
    setImage2(e.target.files[0])

  }

  // date field

   const [date,setDate]=useState('')

  const dateHandler=(e)=>{
    console.log(e.target.value,'dateeee')
    setDate(e.target.value)
        }

        const [check,setCheck]=useState(false)

        const handleCheck=()=>{
            console.log('fdff')
        if (!check){
            setCheck(true)
            console.log(check)
            setPricein('per_hour')
        }else{
            setCheck(false)
            console.log(check)  
            setPricein('per_day')
        }
        }


        const submitHandler = async(e)=>{
            e.preventDefault()
            let request=(JSON.parse(localStorage.getItem('token'))) 
            console.log(request)
            console.log(pricein,'pdf')
         
              const rentData = new FormData();
            //   if (category){
            //     rentData.append('category_id',category)
            //   }
            //   if (district){
            //     rentData.append('district',district)
            //   }
            //   if(city){
            //     rentData.append('city',city)
            //   }
          
             
            
              rentData.append('discriptions',discription)
              rentData.append('sub_mobile',sub_mobile)
              rentData.append('address',address)
              rentData.append('place',place)
        
              if (image){
                rentData.append('image',image)
              }
              if (image1){
                rentData.append('image1',image1)
              }    if (image2){
                rentData.append('image2',image2)
              }
            
              rentData.append('price_in',pricein)
              rentData.append('title',title)
              rentData.append('valid_at',date)
                console.log('oke',id)
                await axios.patch(`rent/rents/${id}/`,rentData,{
                    headers: {
                        Authorization:'Bearer  '+ request
                    }
                }).then((res)=>{
                    console.log(res.data,'entha')
                    navigate('/givenrents')
                 }).catch((err)=>{
                    console.log(err.response.data.detail,'error')
                   
                  })
                }

      
  return (
    <div>
     <form onSubmit={submitHandler}   className='main'>     
            <div className="row mb-4  ">
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
                    <div className="form-outline ">
                    <label className="form-label" >Image</label><br></br>
                      <input onChange={imageHandler} style={{color:'white'}} type='file' />
                           
                          <input style={{color:'white'}}  onChange={image1Handler} className='mt-1' type='file'/> 
                                  
                           <input style={{color:'white'}}  onChange={image2Handler} className='mt-1 ' type='file'/> 
                             
                    </div>
                </div>
            </div>
            <div className="row mb-4">
            <div className="col">                   
                      <div className="form-outline mb-4">
                      <label className="form-label" >Rate</label>
                          <input type="date" id="form6Example5"  onChange={dateHandler} value={date}  placeholder='Give a rate for this service'  className="form-control" />
                                      
                      </div>
                  </div>
            
                <div className="col">                   
                    <div className="form-outline mb-4">
                    <label className="form-label" >Rate per</label><br></br>
                    <label  style={{color:'yellow'}} className="form-label">*  please untick for price in per hour / other wise price for day</label>
                    <div >
                    <Checkbox 
                    onClick={handleCheck}
                            value={check}
                            {...label}
                            defaultChecked
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 48 } }}
                        />
                    </div>          
                    </div>
                </div>
            </div>
        
         <div className="main-payment  mb-4">   
          <div>
        
          <Button className='payment-btn1' type='submit' variant="outline-warning"><p>Edit</p></Button> 
         </div>  
    </div>
    </form>


    </div>
  )
}

export default EditRentHistory