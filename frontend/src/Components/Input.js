import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Input = () => {
  const navigate = useNavigate()
  const [newEvent,setNewEvent] = useState({ name:"", location:"", category:"", poster:"", details:""})
  const inputHandle = async(e) => {
    if(e.target.name === "poster"){
        const encodedPoster = await convertToBase64(e.target.files[0])
        setNewEvent({...newEvent,[e.target.name] : encodedPoster})
    }
    else{
      setNewEvent({...newEvent,[e.target.name] : e.target.value})
    }
  }
  const handleSubmit = async(e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/api/event/",newEvent)
    .then((res) => console.log("success"))
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
        <h4 className='commonClass-title'>Create an Event</h4>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Event Name</label>
          <input name='name' value={newEvent.name} onChange={inputHandle} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Write the Event's Name..."/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1">Location</label>
          <input name='location' value={newEvent.location} onChange={inputHandle} type="text" className="form-control" id="exampleInputPassword1" placeholder="Mention the Event's Location..."/>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1">Category</label>
          <select name='category' value={newEvent.category} onChange={inputHandle} className="form-control">
            <option>Technology</option>
            <option>Healthcare </option>
            <option>Business</option>
            <option>Arts & Culture</option>
            <option>Education</option>
          </select>
        </div>

        <div className='mb-3'>
          <label htmlFor="exampleInputPassword1">Poster URL</label>
          <input name='poster' type="file" onChange={inputHandle} className="form-control" id="exampleInputPassword1" placeholder="Give the Event's Poster URL..."/>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Details</label>
          <input name='details' value={newEvent.details} onChange={inputHandle} className="form-control" id="exampleFormControlTextarea1" placeholder="Enter the Event's date..."/>
        </div>
        <div className='text-center mb-3'>
        <button type="submit" onClick={handleSubmit} className="btn btn-primary commonClass-button">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Input