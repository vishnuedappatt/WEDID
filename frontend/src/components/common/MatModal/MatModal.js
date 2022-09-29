
// modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AccountForm from '../Form/AccountForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const MatModal=({open,handleClose,head,message,cancel,data1,data2,set1,set2,set3,set4,set5,set6,save,save1,data3,data4,data5,data6,error1,error2,error3,error4,error5,error6,result1,delete1,delete2,result2})=>{
    return(
        <>     
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                {head}
                </Typography>
            {message ?  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                 <AccountForm /> {message} 
                </Typography> :
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           
                <AccountForm cancel={cancel}  data1={data1} data2={data2} data3={data3} data4={data4} data5={data5} data6={data6}
                set1={set1} set2={set2} set3={set3} set4={set4}  set5={set5} set6={set6}
                error1={error1} error2={error2} error3={error3} error4={error4} error5={error5} error6={error6} result1={result1}
                save={save} save1={save1} delete1={delete1} delete2={delete2} result2={result2}/>
                 <Button style={{float:'right',marginTop:'30px',marginRight:'20px'}} onClick={cancel} variant="contained" color='error' >Cancel </Button>

                 </Typography>
                }
                
            </Box>
            </Modal>
        </>
    )
}


export default MatModal