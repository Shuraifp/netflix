import React, { useState,useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate,useParams } from 'react-router-dom'


const Player = () => {
  const [apiData, setApiData] = useState({
    name: '',
    published_at: '',
    site: ''
  });
  const { id } = useParams();

  const navigate = useNavigate();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTEzYjhjN2M4MjM3MGQzZjM1ZGNiOGYwNjhlMGY2MCIsIm5iZiI6MTcyODE4OTk1Ni42Mzk4MzUsInN1YiI6IjY3MDIxMDk0YzlhMTBkNDZlYTdkMzFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YgKlD96wl10AZ63UxEjRGoymkAdUp5d2i_H8L2E4mB8'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response.results[0])
        setApiData(response.results[0])})
      .catch(err => console.error(err));
  }, [id])
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {
         {
          navigate(-1); 
        } 
      }}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`} frameborder="0" title='trailer' allowfullscreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : 'N/A'}</p>
        <p>{apiData.name || 'No name available'}</p>
        <p>{apiData.site || 'No site available'}</p>
      </div>
    </div>
  )
}

export default Player
