import React,{useEffect,useState} from 'react'
import Col from 'react-bootstrap/Col'
import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../ListSideBar/ListSideBar'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from '../../axios';
import Button from '@mui/material/Button';
import MaterialModal from '../common/MaterialModal/MaterialModal'
import CommonSnackbar from '../common/CommonSnackbar/CommonSnackBar'
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import MatModal from '../common/MatModal/MatModal'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile() {

// for modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
// for modal
const [openzz, setOpenzz] = React.useState(false);
const handleOpenzz = () => setOpenzz(true);
const handleClosezz = () => setOpenzz(false);



// snackbar
const [opens, setOpens] = React.useState(false);
const handleClicks = () => {
  setOpens(true);
};
const handleCloses = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpens(false);
};


// for modal
const [openz, setOpenz] = React.useState(false);
const handleOpenz = () => setOpenz(true);
const handleClosez = () => setOpenz(false);
  // for saving the edit
  const [first_name,setFirstName]=useState('')
  const[last_name,setLastName]=useState('')
  

  const navigate=useNavigate()

 useEffect(() => {
  
      userData()
      userBank()
      userUpi()

   }, [])


   const [user,setUser]=useState([])

     // user datas
  const userData=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
    let UID=(localStorage.getItem('userId'))
   await axios.get(`user/profile/${UID}/`,{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        setUser(res.data)
        console.log(res.data,'evide work ann')
        setFirstName(res.data.first_name)
        setLastName(res.data.last_name)

         
    })
}

     // user edit calling
     const userDataEdit=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
      let UID=(localStorage.getItem('userId'))   
     await axios.patch(`user/profile/${UID}/`,{
      first_name:first_name,
      last_name:last_name,
     },{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
          setUser(res.data)
          console.log(res.data,'evide work ann')
          setFirstName(res.data.first_name)
          setLastName(res.data.last_name)
          handleClose()            
      })
  }
  const [error,setError]=useState('')
  const [mess,setMess]=useState('')
  const [currentPassword,setCurrentPassword]=useState('')
  const [newPassword,setNewPassword]=useState('')
  const [confirmPassword,setConfirmPassword]=useState('') 


  // user edit calling
  const userPasswordReset=async()=>{   
    let request=(JSON.parse(localStorage.getItem('token')))  
    // let UID=(localStorage.getItem('userId'))   
   await axios.post('user/profile/change_password/',{
    currentPassword:currentPassword,
    newPassword:newPassword,
    confirmPassword:confirmPassword,
   },{
        headers: {
            Authorization:'Bearer '+ request
          }
    }).then((res)=>{
        // setUser(res.data)
        console.log(res.data,'evide work ann')    
        handleClosez()       
        setMess(res.data.success)
        handleClicks()
         
    }).catch((err)=>{
      setError(err.response.data.error)
      console.log(err.response.data.error)
    })
}




// for account adding
const [name,setName]=useState('')
const [accNo,setAccNo]=useState('')
const [confAccNo,setConfAcc]=useState('')
const [ifsc,setIfsc]=useState('')

// for error
const [nameErr,setNameErr]=useState('')
const [accNoErr,setAccNoErr]=useState('')
const [confAccNoErr,setConfAccErr]=useState('')
const [ifscErr,setIfscErr]=useState('')

// for upi
const [upi,setUpi]=useState('')
const [phone,setPhone]=useState('')
// /for error
const [upiErr,setUpiErr]=useState('')
const [phoneErr,setPhoneErr]=useState('')




const formValidationAcc=()=>{
  const nameErr={}
  const accNoErr={}
  const confAccNoErr={}
  const ifscErr={}

  let isValid=true

  
    if (!name){
        nameErr.short_fname = '* this name field is required'
        isValid = false
      }
    if (!accNo){
    accNoErr.short_fname = '* this account no field is required'
    isValid = false
    }


    if (!confAccNo){
    confAccNoErr.short_fname = '* this confirm Account No field is required'
    isValid = false

    }else if (confAccNo != accNo){
      confAccNoErr.short_fname=' * account number mismatch'
      isValid = false
    }
    
    if(!ifsc){
      ifscErr.short_fname='* this field is required'
    }


    setAccNoErr(accNoErr)
    setNameErr(nameErr)
    setConfAccErr(confAccNoErr)
    setIfscErr(ifscErr)

    return isValid
     
}



// for upi

const formValidationUPI=()=>{
  const nameErr={}
  const upiErr={}
  const phoneErr={}


  let isValid=true

  
    if (!name){
        nameErr.short_fname = '* this name field is required'
        isValid = false
      }
    if (!upi){
    upiErr.short_fname = '* this upi  field is required'
    isValid = false
    }
    if (!phone){
    phoneErr.short_fname = '* this mobile required'
    isValid = false

    }

    
    setNameErr(nameErr)
    setUpiErr(upiErr)
    setPhoneErr(phoneErr)

    return isValid
     
}


const handleAccSave=async()=>{
  const validation=formValidationAcc()
  if (validation){   
      let request=(JSON.parse(localStorage.getItem('token')))  
      let id=(JSON.parse(localStorage.getItem('userId')))  
        await axios.post(`user/addbank/`,{
          user:id,
          name:name,
          account_no:accNo,
          ifsc:ifsc,      

        },
        {
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        userBank()
        console.log(res.data)
        setAccNo(' ')
        setConfAcc(' ')
        setIfsc(' ')
        setName(' ')
      
      })
  }
}


// showing all banks of user
const [userbank,setUserBank]=useState([])
const userBank=async()=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
  let id=(JSON.parse(localStorage.getItem('userId')))  
    await axios.get(`user/bank_user/`,
    {
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    console.log(res.data)
    setUserBank(res.data)
   
  })
}

// delete bank
const bankDelete=async(bankId)=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.delete(`user/addbank/${bankId}/`,
    {
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    console.log(res.data)
    userBank()
   
  })
}



const handleUpiSave=async()=>{
  const validation=formValidationUPI()
  if (validation){   
      let request=(JSON.parse(localStorage.getItem('token')))  
      let id=(JSON.parse(localStorage.getItem('userId')))  
        await axios.post(`user/addupi/`,{
          user:id,
          name:name,
          upi:upi,
          mobile:phone,      

        },
        {
          headers: {
              Authorization:'Bearer '+ request
          }
      }).then((res)=>{
        console.log(res.data)
        setName('')
        setUpi('')
        setPhone('  ')
        userUpi()
      })
  }
}


// showing all banks of user
const [userupi,setUserUpi]=useState([])
const userUpi=async()=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
  let id=(JSON.parse(localStorage.getItem('userId')))  
    await axios.get(`user/upi_user/`,
    {
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    console.log(res.data)
    setUserUpi(res.data)
   
  })
}

// delete bank
const upiDelete=async(upiId)=>{
  let request=(JSON.parse(localStorage.getItem('token')))  
   await axios.delete(`user/addupi/${upiId}/`,
    {
      headers: {
          Authorization:'Bearer '+ request
      }
  }).then((res)=>{
    console.log(res.data)
    userUpi()
   
  })
}


  return (
    <div>
      <Row>
        <Col lg={4}>
          <ListSideBar val={1}/>
        </Col>
        <Col  lg={8}>
          <div style={{'height':'60vh','backgroundColor':'black'}}>
          <Card sx={{ maxWidth: 930 ,maxHeight:1000,height:'550px',padding:'50px'}}>
      <CardActionArea>
        <CardMedia style={{height:'200px',width:'200px'}} 
          component="img"
          height="50"
          width="50"
          image="https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4"  component="div">
            {user.first_name +' '+ user.last_name}
          </Typography>
          <Typography gutterBottom variant="h6"  component="div">
            <span>Email :</span> {user.email} 
          </Typography>
          <Typography gutterBottom variant="h6"  component="div">
            <span>Phone No :</span> { '+91' +  user.mobile} 
          </Typography>
          <Typography variant="body2" color="text.secondary">
          
          </Typography>
        </CardContent>
        <CommonSnackbar />
      </CardActionArea>
      <Button onClick={handleOpen} variant="contained" >Edit Profile</Button>
     <MaterialModal handleClose={handleClose} open={open} head='Edit profile' data1={first_name} data2={last_name} set1={setFirstName} set2={setLastName} cancel={handleClose} save={userDataEdit}/>
     <Button style={{marginLeft:'20px'}} onClick={handleOpenz} variant="contained" color='warning' >Reset Password</Button>
     <MaterialModal handleClose={handleClosez} open={openz} head='password reset' data1={currentPassword} data2={newPassword}  data3= {confirmPassword} set1={setCurrentPassword} set2={setNewPassword}  set3={setConfirmPassword}cancel={handleClosez} save={userPasswordReset} error={error}/>
     <Button style={{marginLeft:'20px'}} onClick={handleOpenzz} variant="outlined" color='error' ><AddIcon/> Account Details</Button>
   
    <MatModal open={openzz} data1={name} data2={accNo} data3={confAccNo} data4={ifsc} data5={upi} data6={phone}
    set1={setName} set2={setAccNo} set3={setConfAcc} set4={setIfsc}  set5={setUpi} set6={setPhone}
    save={handleAccSave} cancel={handleClosezz} save1={handleUpiSave} result1={userbank} result2={userupi} delete1={bankDelete} delete2={upiDelete}
    error1={nameErr} error2={accNoErr} error3={confAccNoErr} error4={ifscErr} error5={upiErr} error6={phoneErr} />
    
      <Snackbar open={opens} autoHideDuration={6000} onClose={handleCloses}>
                <div>                 
                <Alert onClose={handleCloses} severity="success" sx={{ width: '100%' }} >
                 {mess}
                </Alert>
                </div>               
              </Snackbar>
    </Card>
          </div>
        </Col>  
        </Row>       
    </div>
  )
}

export default Profile