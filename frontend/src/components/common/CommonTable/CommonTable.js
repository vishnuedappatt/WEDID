import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Table from 'react-bootstrap/Table';


const CommonTable=({data1})=> {
  return (
    <Box sx={{ width: '100%' }}>
       <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th> Title</th>
          <th>category</th>
          <th>posted on</th>
          <th>valid</th>         
        </tr>
      </thead>
      <tbody> 
       {data1 && data1.map((obj)=>     
       <tr>
          <td >{obj.id}</td>
          <td>{obj.title}</td>
          <td>{obj.category.name }</td>
          <td>{String(obj.created_at).slice(0,10).split("-").reverse().join("-")}</td>
          <td>{String(obj.valid_at).split("-").reverse().join("-")}</td>
        </tr> 

         )}       
      </tbody>
    </Table>
    </Box>
  );
}
export default CommonTable;