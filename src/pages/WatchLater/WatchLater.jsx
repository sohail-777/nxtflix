import {Link} from "react-router-dom";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useWatchLater } from "../../context/WatchLaterContext";
import "./index.css";

export default function WatchLater(){
    const {watchLater} = useWatchLater();

    return (
        <div className="app-page watch-later">
            <Header />

            <div className="watch-later__content container">
                <h1 className="watch-later__title">Watch Later</h1>
                {watchLater.length === 0 ? (
                    <div className="watch-later__empty">
                        <p className="watch-later__empty-text">
                            Your Watch Later List is empty.
                        </p>
                        <Link to="/" className="watch-later__browse-btn">
                            Browse Movies
                        </Link>
                    </div>
                ): (
                    <div className="watch-later__grid">
                        {watchLater.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}