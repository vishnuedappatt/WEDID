import React, { useState ,useEffect} from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ListSideBar from '../../ListSideBar/ListSideBar'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Table from 'react-bootstrap/Table';
import axios from '../../../axios';
import {useNavigate} from 'react-router-dom'
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// for switch
import Switch from '@mui/material/Switch';
import SideBar from '../SideBar/SideBar';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Home() {

  useEffect(() => {
   graph()
  }, [])
  
  const [data,setData]=useState([])
   const graph=async()=>{   
      let request=(JSON.parse(localStorage.getItem('token')))  
 
     await axios.get('adminz/graph/',{
          headers: {
              Authorization:'Bearer '+ request
            }
      }).then((res)=>{
        setData(res.data)
          console.log(res.data)
          console.log(res.data.results,'evide work ann')
      })
  }


  return (
    <div>
    <Row>
    <Col lg={4}>
      <SideBar />
    </Col>
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black',marginTop:'40px'}}>
      <ResponsiveContainer width="100%"  height="100%" >
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4"/>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip  cursor={{fill: ''}} />
          <Legend />
          <Bar dataKey="type" stackId="a" fill="#ff0000" />
          {/* <Bar dataKey="amt" stackId="a" fill="#82ca9d" /> */}
          <Bar dataKey="booked" fill="#ff6600" />
        </BarChart>
      </ResponsiveContainer>
     </div>
     </Col>
     </Row>
    </div>
  )
}

export default Home