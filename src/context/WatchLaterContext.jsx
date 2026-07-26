import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "nxtflix_watch_later";

const WatchLaterContext = createContext(undefined);

function readInitialState() {
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function WatchLaterProvider({ children }){
    const [watchLater, setWatchLater] = useState(readInitialState);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(watchLater));
        } catch {

        }
    }, [watchLater]);


    const isInWatchLater = (id) => watchLater.some((movie) => movie.id === id);
    const toggleWatchLater = (movie) => {
        setWatchLater((prev) =>{
            const exists = prev.some((m) => m.id === movie.id);
            if (exists){
                return prev.filter((m) => m.id !== movie.id);
            }
            return [...prev, movie];
        });
    };

    const value = {watchLater, isInWatchLater, toggleWatchLater};

    return (
        <WatchLaterContext.Provider value={value}>
            {children}
        </WatchLaterContext.Provider>
    );
}

export function useWatchLater(){
    const ctx = useContext(WatchLaterContext);
    if (ctx === undefined) {
        throw new Error("useWatchLater must be used within a WatchLaterProvider");
    }
    return ctx;
}