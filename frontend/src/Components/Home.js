import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import "./styles.css"
import {FaEdit} from 'react-icons/fa'
import {TiLocation} from 'react-icons/ti'
import {ImBin} from 'react-icons/im'
import {HiOutlineHashtag} from 'react-icons/hi'
import {FaCalendarDay} from 'react-icons/fa'
const Home = () => {
    const [event,setEvent] = useState([])
    const navigate = useNavigate()
    const displayEvents = () => {
        axios.get(`http://localhost:5000/api/event/`)
        .then((data) => {
            setEvent(data.data)
        })
    }
    const deleteView = async(e) => {
        await axios.delete(`http://localhost:5000/api/event/${e.target.value}`)
        setEvent((view) => {
          return view.filter((i) => i._id !==e.target.value)
        })
      }
    useEffect(() => {
        displayEvents()
    },[])
    const iconStyles = {color:'navy',fontSize:"1.5em"}
  return (
    <div className='container'>
        <div className='event-board'>
        {event && event.map((event,index) => (
            <div className='event-card row' key={index}>
                <h5 className='event-title'>{event.name}</h5>
                <div className='col'>
                    <img className='event-poster' src={event.poster} alt='Not found'/>
                </div>
                <div className='col'>
                    
                    <p><HiOutlineHashtag style={iconStyles}/>&nbsp;{event.category}</p>
                    <p><TiLocation style={iconStyles}/>&nbsp;{event.location}</p>
                    <p><FaCalendarDay style={iconStyles}/>&nbsp;{event.details}</p>
                    <div>
                    <button className='btn btn-success' onClick={()=>navigate(`/editEvent/${event._id}`)}><FaEdit/></button>
                    <button className='btn btn-danger m-2' value={event._id} onClick={deleteView}><ImBin/></button>
                    </div>  
                </div>
            </div>
        ))}
        </div>
    </div>
  )
}

export default Home