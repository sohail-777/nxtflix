import {Navigate, useNavigate, useParams} from "react-router-dom";
import Header from "../../components/Header/Header";
import movies from "../../data/movies";
import { useWatchLater } from "../../context/WatchLaterContext";
import "./index.css";

export default function MovieDetails(){
    const {id} = useParams();
    const navigate =useNavigate();
    const {isInWatchLater, toggleWatchLater} = useWatchLater();

    const movie = movies.find((m) => String(m.id) === String(id));

    if (!movie) {
        return <Navigate to="/not-found" replace />;
    }

    const saved = isInWatchLater(movie.id);

    return (
        <div className="app-page movie-details">
            <Header />

            <div className="movie-details__backdrop" style={{backgroundImage: `url(${movie.backdrop})`}}>
                <div className="movie-details__scrim" />
                <div className="movie-details__content container">
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        className="movie-details__poster" 
                    />
                    <div className="movie-details__info">
                        <h1 className="movie-details__title">{movie.title}</h1>
                        <div className="movie-details__meta">
                            <span className="movie-details__genre-tag">{movie.genre}</span>
                            <span>{movie.year}</span>
                            <span>{movie.duration}</span>
                            <span className="movie-details__rating">
                                <span className="movie-details__star">★</span> {movie.rating}
                            </span>
                        </div>
                        <p className="movie-details__overview">{movie.overview}</p>
                        <div className="movie-details__actions">
                            <button className={`movie-details__watch-btn ${saved ? "movie-details__watch-btn--added" : ""}`}
                             onClick={()=> toggleWatchLater(movie)}
                            >
                                {saved ? "✓ Added to Watch Later" : "+ Watch Later"}
                            </button>
                            <button className="movie-details__back-btn" onClick={()=> navigate(-1)}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}