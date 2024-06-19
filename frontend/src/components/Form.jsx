import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";
import "../index.css";
import api from "../services/api";
import toast from "react-hot-toast";

function Form({ route, method }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";
    const linkRoute = method === "login" ? "/register" : "/login";

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try {
            const response = await api.post(route, {
                username,
                password,
            })

            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                toast.success("Login efetuado com sucesso!")
                navigate("/")
            } else {
                navigate("/login")
            }


        } catch (error) {
            toast.error("Erro ao efetuar o login. Por favor, tente novamente.")
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="relative w-screen h-screen font-poppins bg-amber-400 flex items-center justify-center">
                <div className="absolute inset-0 z-0 " style={{ backgroundImage: "url('/2174692.svg')", backgroundSize: "cover", opacity: "0.1" }}></div>

                <div className="bg-white py-10 px-6 rounded-2xl shadow-2xl z-10">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-11 mb-5 pr-4 pl-4">
                        <h1 className="text-3xl"> {name} </h1>
                        <input
                            className="appearance-none border bg-gray-300 rounded-2xl w-full py-2 px-3 mb-3 mr-4 ml-4 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nome de Usuário"
                        />
                        <input
                            className="appearance-none border bg-gray-300 rounded-2xl w-full py-2 px-3 mb-3 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300 ease-in-out"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                        />
                        <button className="bg-amber-400 hover:bg-amber-500 text-white py-2 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out" type="submit"> {name} </button>
                    </form>
                    <div className="text-center text-xs mt-10">
                        <p>
                            {method === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
                            <Link to={linkRoute} className="text-blue-500 underline ml-1">{name}</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>
    )

}


export default Form;