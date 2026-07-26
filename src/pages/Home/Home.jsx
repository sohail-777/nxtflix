import { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import GenreFilterBar from "../../components/GenreFilterBar/GenreFilterBar";
import MovieCard from "../../components/MovieCard/MovieCard";
import movies from "../../data/movies";
import "./index.css";

const HERO_IMAGE = "https://picsum.photos/seed/nxtflixhero/1600/900";

export default function Home(){
    const [activeGenre, setActiveGenre] = useState("All");

    const trendingNow = useMemo(
        () => 
        [...movies].sort((a,b) => Number(b.rating) - Number(a.rating)).slice(0,16),
        []
    );

    const freshReleases = useMemo(
        ()=> movies.filter((m) => m.year >= 2015).slice(0,16),
        []
    );

    const filteredMovies = useMemo(() => {
        if (activeGenre === "All") return movies;
        return movies.filter((m) => m.genre === activeGenre);
    }, [activeGenre]);

    return (
        <div className="app-page home">
            <Header />
            <section className="hero" style={{backgroundImage: `url(${HERO_IMAGE})`}}
            >
                <div className="hero__scrim" />
                <div className="hero__content">
                    <h1 className="hero__title">Discover your next favourite</h1>
                    <p className="hero__subtitle">
                        Browse {movies.length}+ titles across every genre. Add to Watch 
                        Later and pick up anytime.
                    </p>
                </div>
            </section>

            <MovieCarousel title="Trending Now" movies={trendingNow} direction="left" />
            <MovieCarousel title="Fresh Releases" movies={freshReleases} direction="right" />

            <GenreFilterBar activeGenre={activeGenre} onSelect={setActiveGenre} />

            <div className="home__grid-wrap container">
                {filteredMovies.length === 0 ? (
                    <p className="home__empty">No movies found for this genre.</p>
                ): (
                    <div className="home__grid">
                        {filteredMovies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}