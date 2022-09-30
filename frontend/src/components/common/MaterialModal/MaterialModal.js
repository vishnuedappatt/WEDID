
// modal
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from '../Form/Form';
import PasswordForm from '../Form/PasswordForm';
import CommonTable from '../CommonTable/CommonTable';
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


const MaterialModal=({open,handleClose,head,message,cancel,data1,data2,set1,set2,save,data3,set3,error,table,errorz,number})=>{
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
                     {message} 
                </Typography> :
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {!table?  <div> { set3 ?  <PasswordForm save={save} savebtn='reset password' error={error} cancel={cancel} data1={data1} data2={data2} set1={set1} set2={set2} data3={data3} set3={set3}/>   : <Form save={save}  cancel={cancel} data1={data1} data2={data2} set1={set1} set2={set2} savebtn='save'/>  } </div>:
              <CommonTable errorz={errorz} cancel={handleClose} data1={data1} number={number}/>
              }
                 </Typography>
                }
            </Box>
            </Modal>
                    
        
        </>
    )
}


export default MaterialModal