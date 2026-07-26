import { useState } from "react";
import {Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {signIn} from "../../api/auth";
import "./index.css";

export default function Login(){
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const alreadyAuthenticated = Boolean(Cookies.get("jwt_token"));
    if (alreadyAuthenticated) {
        return <Navigate to="/" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try{
            const { token } = await signIn(email, password);
            if (!token) {
                throw new Error("Login succeeded but no token was returned.");
            }
            Cookies.set("jwt_token", token, {expires:7});
            navigate("/");
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login">
            <div className="login__brand">
                <div className="login__brand-glow" />
                <h1 className="login__logo">NXTFLIX</h1>
                <p className="login__tagline">
                    Unlimited movies, shows and more. Watch anywhere. Cancel anytime.
                </p>
            </div>
            
            <div className="login__form-panel">
                <form className="login__card" onSubmit={handleSubmit} noValidate>
                    <h2 className="login__title">Sign In</h2>
                    {error && <div className="login__error">{error}</div>}

                    <label className="login__label" htmlFor="email">
                        Email
                    </label>
                    <input 
                        id="email"
                        type="email"
                        className="login__input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label className="login__label" htmlFor="password">
                        Password
                    </label>
                    <input 
                        id="password"
                        type="password"
                        className="login__input"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login__submit" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}