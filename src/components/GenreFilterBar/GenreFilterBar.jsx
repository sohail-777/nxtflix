import {GENRES} from "../../data/movies";
import "./index.css";

export default function GenreFilterBar({ activeGenre, onSelect}){
    return(
        <div className="genre-bar">
            {GENRES.map((genre)=>(
                <button key={genre}
                    className={`genre-chip ${activeGenre === genre ? "genre-chip--active":""}`} 
                    onClick={()=> onSelect(genre)}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
}