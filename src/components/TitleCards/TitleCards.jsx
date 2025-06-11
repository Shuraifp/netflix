import React, { useRef, useEffect, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data.js'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {
  const [apiData, setApiData] = useState([]);
  const scrollRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTEzYjhjN2M4MjM3MGQzZjM1ZGNiOGYwNjhlMGY2MCIsIm5iZiI6MTcyODE4OTk1Ni42Mzk4MzUsInN1YiI6IjY3MDIxMDk0YzlhMTBkNDZlYTdkMzFlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YgKlD96wl10AZ63UxEjRGoymkAdUp5d2i_H8L2E4mB8'
    }
  };
  

  const handleWheel = (e) => {
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY
  }
  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    scrollRef.current.addEventListener('wheel', handleWheel)
  }, [])
  return (
    <div className='title-cards'>
      <h2>{title? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={scrollRef}>
        {apiData.map((card, index) => (
          <Link to={'/player/'+card.id} className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500'+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TitleCards
