import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import WatchLater from "./pages/WatchLater/WatchLater";
import NotFound from "./pages/NotFound/NotFound";

export default function App(){
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/movies/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
            <Route path="/watch-later" element={<ProtectedRoute><WatchLater /></ProtectedRoute>} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}