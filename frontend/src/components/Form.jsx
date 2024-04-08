import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, ACCESS_REFRESH } from "../constants";
import Login from "../pages/Login";


function Form({ route, method }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const response = await api.post(route, {
                username,
                password,
            });
            console.log("funcionou")

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(ACCESS_REFRESH, response.data.refresh);
                navigate("/")
            } else {
                navigate("/login")
            }


        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    }
    return <form onSubmit={handleSubmit} className="form-container">
        <h1> {name} </h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nome de Usuário"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
        />
        <button className="form-button" type="submit" > {name} </button>
    </form>


}


export default Form;