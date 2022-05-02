import axios from 'axios'
import React from 'react'
import { Button } from 'react-bootstrap'
import fileDownload from 'js-file-download'


function Export(props) {
const handleClick =()=>{
  axios.post(props.url+"/files/export/",{responseType: 'blob'})
  .then((response) =>{
   fileDownload(response.data,"allBooks.csv")
    })
}
   
  return (
    <Button size='sm' onClick={handleClick}>Export All to CSV</Button>
  )
}

export default Export