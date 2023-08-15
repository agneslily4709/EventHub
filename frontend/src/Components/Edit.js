import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
const Edit = () => {
    const [edit,setEdit] = useState({ name:"", location:"", category:"", poster:"", details:""})
    const params = useParams()
    useEffect(() => {
        axios.get(`http://localhost:5000/api/event/${params.id}`)
        .then((data) => {
            setEdit(data.data)
        })
    },[params.id])

    const navigate = useNavigate()
    const inputHandle = async(e) => {
      if(e.target.name === "poster"){
          const encodedPoster = await convertToBase64(e.target.files[0])
          setEdit({...edit,[e.target.name] : encodedPoster})
      }
      else{
        setEdit({...edit,[e.target.name] : e.target.value})
      }
    }
    const handleEdit = async(e) => {
      e.preventDefault()
      await axios.put(`http://localhost:5000/api/event/${params.id}`,edit)
      .then((res) => setEdit({ name:"", location:"", category:"", poster:"", details:""}))
      navigate("/")
    }
    const convertToBase64 = (file) => {
      return new Promise((res,rej) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => res(fileReader.result)
        fileReader.onerror = (error) => rej(error)
      })
    }
  return (
    <div className='commonClass'>
    <form>
    <h4 className='commonClass-title'>Edit an Event</h4>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1">Event Name</label>
        <input name='name' value={edit.name} onChange={inputHandle} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Write the Event's Name..."/>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1">Location</label>
        <input name='location' value={edit.location} onChange={inputHandle} type="text" className="form-control" id="exampleInputPassword1" placeholder="Mention the Event's Location..."/>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1">Category</label>
        <select name='category' value={edit.category} onChange={inputHandle} className="form-control">
          <option>Technology & Innovation</option>
          <option>Healthcare & Medical</option>
          <option>Business & Entrepreneurship</option>
          <option>Arts & Culture</option>
          <option>Education & Learning</option>
        </select>
      </div>

      <div className='mb-3'>
        <label htmlFor="exampleInputPassword1">Poster URL</label>
        <input name='poster' type="file" onChange={inputHandle} className="form-control" id="exampleInputPassword1" placeholder="Give the Event's Poster URL..."/>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Details</label>
        <input name='details' value={edit.details} onChange={inputHandle} className="form-control" id="exampleFormControlTextarea1"/>
      </div>
      <div className='text-center mb-3'>
      <button type="submit" onClick={handleEdit} className="btn btn-primary commonClass-button">Edit</button>

      </div>
    </form>
    </div>
  )
}

export default Edit