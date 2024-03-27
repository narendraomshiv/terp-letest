import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { IsLoginAuthenticateContext } from "../../Contexts/LoginContext"
import { IsToastContext } from "../../Contexts/ToastContext"
import { API_BASE_URL } from "../../Url/Url"
import logo from "../../assets/logo.png"
import { addUserDetail } from "../userDetailToken"
import "./loginn.css"

const Login = () => {
	const [isAuthenticate, setIsAuthenticate] = useState(
		IsLoginAuthenticateContext,
	)
	const [isToastMessage] = useState(IsToastContext)
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	})

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const loginf = (response) => {
		window.location.reload(navigate("/"))
		addUserDetail(response)
		setIsAuthenticate(true)
		// navigate('/dashboard')

		toast.success("Login Successfully", {
			autoClose: 1000,
			theme: "colored",
		})
	}

	const handleLogin = (e) => {
		e.preventDefault()
		const request = {
			email: formData.email,
			password: formData.password,
		}

		if (request.email == "") {
			toast.warn("Please Enter Your Email", {
				autoClose: 1000,
				theme: "colored",
			})
			return false
		}

		if (request.password == "") {
			toast.warn("Please Enter Your Password", {
				autoClose: 1000,
				theme: "colored",
			})
			return false
		} else {
			axios
				.post(`${API_BASE_URL}/adminLogin`, request)
				.then((response) => {
					if (response.data.success == true) {
						loginf(response)
					}

					if (response.data.success == false) {
						toast.error(response.data.message, {
							autoClose: 1000,
							theme: "colored",
						})
						return false
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
	}
	return (
		<>
			<div id="main-wrapper">
				<div className="wrapper_login">
					<div className="logo">
						{" "}
						<img src={logo} alt="logo" />{" "}
					</div>
					<div className="text-center mt-4 name"> Terp </div>
					<form className="p-3 mt-3">
						<div className="form-field d-flex align-items-center">
							<span className="mdi mdi-account-outline"></span>
							<input
								onChange={handleChange}
								name="email"
								type="text"
								id="userName"
								placeholder="Username"
							/>
						</div>
						<div className="form-field d-flex align-items-center">
							<span className="mdi mdi-key-variant"></span>
							<input
								onChange={handleChange}
								name="password"
								type="password"
								id="pwd"
								placeholder="Password"
							/>
						</div>
						<button onClick={handleLogin} className="btn mt-3">
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
