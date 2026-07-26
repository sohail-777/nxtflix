import { Link } from "react-router-dom";
import "./index.css";

export default function MovieCard({ movie }){
    return (
        <Link to={`/movies/${movie.id}`} className = "movie-card">
            <div className="movie-card__poster-wrap">
                <img 
                  src={movie.poster}
                  alt={movie.title}
                  className="movie-card__poster"
                  loading="lazy"
                />
                <div className="movie-card__rating">
                    <span className="movie-card__star">★</span>
                    {movie.rating}
                </div>
                <div className="movie-card__overlay">
                    <span className="movie-card__play">▶</span>
                </div>
                <div className="movie-card__info">
                    <h3 className="movie-card__title">{movie.title}</h3>
                    <p className="movie-card__meta">
                        {movie.genre} · {movie.year} · {movie.duration}
                    </p>
                </div>
            </div>
        </Link>
    );
}