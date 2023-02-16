import React, { useState,useEffect } from 'react'
import io from "socket.io-client";
import axios from 'axios';
import SingleRow from './SingleRow';

const socket = io.connect("http://localhost:3001");


const App = () => {
    const [data,setData] = useState([]);
    const [createData,setCreatedata] = useState({name:"",description:"",accountstatus:""});

    useEffect(() => {
        getInventory()
      }, [socket]);

      socket.on('newInventory',(data) => {
        console.log(data)
        getInventory()   
    }
    )

    

    const getInventory = async () => {
       await axios.get('http://localhost:3001/api/v1/getInventory').then(res => {
        setData(res?.data?.data)
       }).catch(err => console.log(err))
    }

    const createNewInventory = async () => {
        console.log(createData)
        await axios.post('http://localhost:3001/api/v1/createInventory',createData).then(res => {socket.emit('newInventoryCreated',"new inventory created please refresh")}).catch(err => console.log(err))
    }

  return (
    <div>
        <div style={{display:'flex',flexDirection:'row',gap:'200px'}}>
            <p>name</p>
            <p>description</p>
            <p>accountstatus</p>
            <p>creation date</p>
        </div>
        <div>
        {
            data.map((item) => 
                <SingleRow item={item}/>    
            )
        }
        </div>
        <div>
            <div><h3>create inventory</h3></div>
            <label htmlFor="name">name</label>
            <input onChange={(e) => setCreatedata({...createData,name:e.target.value})}/>
            <label htmlFor="name">description</label>
            <input onChange={(e) => setCreatedata({...createData,description:e.target.value})}/>
            <label htmlFor="name">accountstatus</label>
            <input onChange={(e) => setCreatedata({...createData,accountstatus:e.target.value})}/>
            <button onClick={(e) => {
                e.preventDefault();
                createNewInventory();
            }}>create</button>
        </div>
    </div>
  )
}

export default App