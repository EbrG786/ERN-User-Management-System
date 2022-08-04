import React from 'react'
import {useState,useEffect} from 'react';
import {useNavigate,useParams} from 'react-router-dom';
import axios from'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';

const intialState = {
  name:'',
  email:'',
  contact:'',
};

const AddEdit = () => {
  const[state,setState] = useState(intialState)

  const {name,email,contact} = intialState;

  const navigate = useNavigate();

  const {id} = useParams()
  useEffect(() => {
    if(id){
      getSingleUser(id);
    }
  },[id])
  const getSingleUser = async (id)=>{
    const response = await axios.get(`http://localhost:5000/user/${id}`);
    if (response.status === 200) {
      setState({...response.data[0]})
      }
  }

  const addUser = async (data) => {
    const response = await axios.post("http://localhost:5000/user",data);
    if (response.status === 200) {
      toast.success(response.data);
      }
  };

  const updateUser = async (data,id) => {
    const response = await axios.put(`http://localhost:5000/user/${id}`,data);
    if (response.status === 200) {
      toast.success(response.data);
      }
  };

  const handelSubmit = (e) =>{
    e.preventDefault();
    if(id===null){
      addUser(state);
    } else{
      updateUser(state,id);
    }
    setTimeout(()=>navigate('/'),500)
  };

  const handelInputChange=(e)=>{
    let {name,value} = e.target;
    setState({...state,[name]:value});
  };

  return (
    <div style={{marginTop:'100px'}}>
      <form style={{margin:'auto',padding:'15px',maxWidth:'400px',alignContent:'center'}} onSubmit={handelSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id='name' name='name' placeholder='Enter Name' onChange={handelInputChange} defaultValue={name} />
        <label htmlFor="email">Email</label>
        <input type="email" id='email' name='email' placeholder='Enter Email' onChange={handelInputChange} defaultValue={email} />
        <label htmlFor="contact">Contact</label>
        <input type="number" id='contact' name='contact' placeholder='Enter Contact' onChange={handelInputChange} defaultValue={contact} />
        <input type="submit" value={id ? 'Update' : 'Add'} />
      </form>
    </div>
  )
}

export default AddEdit