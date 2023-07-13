import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './addEdit.css'
import axios from 'axios'
import { toast } from 'react-toastify'



const Update = () => {
    const initialState = {
      name: '',
      email: '',
      contact: '',
    }
    
  const [state, setState] = useState(initialState)
const {name,email,contact}=state
  const { id } = useParams()

  

  const history = useNavigate()


     useEffect(() => {
       axios
         .get(`http://localhost:5000/api/get/${id}`)
         .then((resp) => setState({ ...resp.data[0] }))
     }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()
      axios
        .put(`http://localhost:5000/api/update/${id}`, {
          name,
          email,
          contact,
        })
        .then(() => {
          setState({ name: '', email: '', contact: '' })
        })
        .catch((err) => toast.error(err.response.data))
      toast.success('Contact updated Successful')
      setTimeout(() => history('/'), 500)
  }



    const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({ ...state, [name]: value })
    }

    

  return (
    <div
      style={{
        marginTop: '100px',
      }}
    >
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="enter your name..."
          value={name}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="enter your email..."
          value={email}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact :</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          placeholder="mobile Number"
          value={contact}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? 'Update' : 'Save'} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default Update
