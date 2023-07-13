import React, { useEffect } from 'react'

import { Link } from 'react-router-dom'
import './Home.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteContact, showUser } from '../features/crud/crudSlice'

const Home = () => {
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.crud)

  useEffect(() => {
   dispatch(showUser())
  }, [users])
 

  return (
  
    <div style={{ marginTop: '150px' }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            const { id, name, email, contact } = item
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => dispatch(deleteContact(item.id))}
                  >
                    Delete
                  </button>

                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">view</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
