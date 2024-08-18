import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaRegClock } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

function MovieCard() {
  return (
    <Link className="movie" href="/movie/1">
        <figure className="movie__img__wrapper">
            <Image className="movie__img" alt="Movie Card" src="https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_QL75_UY281_CR3,0,190,281_.jpg" width={0} height={0} sizes="100vw" />
          </figure>
        
          <div className="movie__text">
              <span className="movie__title">Avatar</span>
              <span className="movie__director">James Cameron</span>
              <span className="movie__details">
                <div className="movie__detail">
                  <FaRegClock className="movie__detail__icon" />
                  <span className="movie__detail__text">10:00</span>
                </div>
                <div className="movie__detail">
                  <FaRegStar className="movie__detail__icon" />
                  <span className="movie__detail__text">7.9</span>
                </div>
              </span>
          </div>
    </Link>
  )
}

export default MovieCard