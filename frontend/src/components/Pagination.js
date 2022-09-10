import React from 'react'
import "./Pagination.css";

function Pagination({totalpost,postperpage,setcurrentPage,currentpage}) {
    let pages=[]
    for(let i =1;i<=Math.ceil(totalpost/postperpage); i++){
        pages.push(i)
    }
  return (
    <div  className='pagination'> 
        {
            pages.map((page,index)=>{
                return <button onClick={()=>setcurrentPage(page)} className={page==currentpage? 'active' : ''}
                key={index}>{page}</button>
            })
        }
    </div>
  )
}

export default Pagination