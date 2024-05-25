import React, { useState } from 'react'
import axios from 'axios'
import '../css/pages/newList.scss'

function NewList({handleModal, handleUpdateList}) {

  const [listName, setListName] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('name', listName)
    formData.append('image', file)

    axios.post('http://localhost:5000/lists', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      handleModal()
      handleUpdateList(res.data._id)
    })
    .catch(err => {
      console.error('Error creating list:', err)
    })
  }

  return (
    <div className='form-container'>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <h3>New List</h3>
        <div className='name'>
          <label htmlFor="name">List Name: </label>
          <input
            type='text'
            placeholder='List name'
            id='name'
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='image'>Image</label>
          <input type="file" id="image" name='image' onChange={(e) => setFile(e.target.files[0])} />
        </div>

        <button type='submit'>Create a new list</button>
      </form>
    </div>
  )
}

export default NewList
