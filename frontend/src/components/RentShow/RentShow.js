import React, { useState ,useEffect, useContext } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import List from '../List/List'
import RentSideBar from '../RentSideBar/RentSideBar'
import Pagination from '../Pagination';
import RentContext from '../../context/rentcontext';

function RentShow() {


  const {getrentjob,setData,data,setEmpty,empty,searchimage}=useContext(RentContext)
    // pagination
const [currentpage,setcurrentPage]=useState(1)
const [postperpage,setPostPerPage]=useState(4)
useEffect (()=>{
  getrentjob()
},[]);

  // getting last page and last page
  const lastPageIndex=currentpage * postperpage;
  const firstPageIndex=lastPageIndex - postperpage;
  const currentData =data.slice(firstPageIndex,lastPageIndex)
  return (
    <div>
        <Row>
            <Col lg={3} >
              <RentSideBar />               
            </Col>
            <Col  lg={9}>
                <List  currentpage={currentData} />                
            </Col>
            <Pagination totalpost={data.length} postperpage={postperpage} setcurrentPage={setcurrentPage} currentpage={currentpage}/>
        </Row>

    </div>
  )
}

export default RentShow