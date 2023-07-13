import React, {  useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import './addEdit.css'

import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createUser } from '../features/crud/crudSlice'
// import { useSelector } from 'react-redux'

const AddEdit = () => {
  const [state, setState] = useState({})

  const { id } = useParams()
  const { name, email, contact } = state
  const dispatch = useDispatch()

  const history = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !contact) {
      toast.error('Please provide input into each input field')
    } else {
      dispatch(createUser(state))
      toast.success('Contact created Successful')
      setTimeout(() => history('/'), 500)
    }
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
          value={name || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="enter your email..."
          value={email || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact :</label>
        <input
          type="tel"
          id="contact"
          name="contact"
          placeholder="mobile Number"
          value={contact || ''}
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

export default AddEdit
