import React, { useState ,useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../ListSideBar/ListSideBar'
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from 'react-bootstrap/Modal';
import axios from '../../axios';
import {useNavigate, useParams} from 'react-router-dom'
import TouchAppIcon from '@mui/icons-material/TouchApp';

function SingleJobHistory() {

    const parms=useParams()
    const id=parms.id
    const [data,setData]=useState('')
    useEffect(() => {
        userJobHistory()
    }, [])
    
        // user datas
        const userJobHistory=async()=>{   
        let request=(JSON.parse(localStorage.getItem('token')))  
    
        await axios.get('job/giving_history_job/',{
            headers: {
                Authorization:'Bearer '+ request
                }
        }).then((res)=>{
            setData(res.data)
            console.log(res.data,'evide work ann')
        })
    }
    

  return (
    <div>
 <Row>
    {/* <Col lg={4}>
      <ListSideBar val={2}/>
    </Col> */}
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black'}}>
      <div style={{'height':'60vh','backgroundColor':'white '}}>
          <Card sx={{ minWidth:'30%', maxWidth:'100%' ,padding:'50px'}}> 
            <Button onClick={()=>navigate('addUser')} variant="contained">Add User</Button>
      <CardActionArea>
      <Table striped>
      <thead>
        <tr>
          <th>id</th>
          <th> Title</th>
          <th>category</th>
          <th>posted on</th>
          <th>valid</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody> 
       {data && data.map((obj)=>
       <tr>
          <td >{obj.id}</td>
          <td>{obj.title}</td>
          <td>{obj.category.name  }</td>
          <td>{String(obj.created_at).slice(0,10).split("-").reverse().join("-")}</td>
          <td>{String(obj.valid_at).split("-").reverse().join("-")}</td>
          <td style={{color:'blue'}} onClick={()=>navigate(`${obj.id}`)}><TouchAppIcon /></td>      
        </tr> 
         )}       
      </tbody>
    </Table>
      </CardActionArea>
    </Card>
          </div>
      </div>
    </Col>
    </Row>      




    </div>
  )
}

export default SingleJobHistory