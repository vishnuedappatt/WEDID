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

const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Home() {





  return (
    <div>
    <Row>
    <Col lg={4}>
      <SideBar />
    </Col>
    <Col lg={8}>
      <div style={{'height':'60vh','backgroundColor':'black'}}>
     </div>
     </Col>
     </Row>
    </div>
  )
}

export default Home