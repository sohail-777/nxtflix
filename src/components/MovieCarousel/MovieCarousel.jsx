import { Link } from "react-router-dom";
import "./index.css";

export default function MovieCarousel({title, movies, direction = "left"}) {
    const track = [...movies, ...movies];
    return (
        <section className="carousel">
            <h2 className="carousel__title">{title}</h2>
            <div className="carousel__viewport">
                <div className={`carousel__track carousel__track--${direction}`} 
                  style={{ "--item-count":movies.length}}
                >
                    {track.map((movie, index) => (
                        <Link to={`/movies/${movie.id}`} 
                          className="carousel__item"
                          key={`${movie.id}-${index}`}
                        >
                            <img 
                                src={movie.poster}
                                alt={movie.title}
                                className="carousel__poster"
                                loading="lazy"
                            />
                            <div className="carousel__overlay">
                                <h3 className="carousel__item-title">{movie.title}</h3>
                                <p className="carousel__item-meta">
                                    {movie.genre} · {movie.rating}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}