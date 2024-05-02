import axios from "axios"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../Url/Url"
import { Card } from "../../card"

const CreateClient = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { from } = location.state || {}

	const defaultState = {
		client_name: from?.client_name || "",
		client_email: from?.client_email || "",
		client_tax_number: from?.client_tax_number || "",
		client_phone: from?.client_phone || "",
		client_address: from?.client_address || "",
		client_bank_name: from?.client_bank_name || "",
		client_bank_account: from?.client_bank_account || "",
		client_bank_number: from?.client_bank_number || "",
	}
	const [state, setState] = useState(defaultState)

	const handleChange = (event) => {
		const { name, value } = event.target
		setState((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	//Add Client Api

	const AddClient = () => {
		const request = {
			user_id:localStorage.getItem("id"),
			client_id: from?.client_id,
			client_name: state.client_name,
			client_email: state.client_email,
			client_tax_number: state.client_tax_number,
			client_phone: state.client_phone,
			client_address: state.client_address,
			client_bank_name: state.client_bank_name,
			client_bank_account: state.client_bank_account,
			client_bank_number: state.client_bank_number,
		}

		const checkField =
			request.client_name == "" ||
			request.client_email == "" ||
			request.client_tax_number == "" ||
			request.client_phone == "" ||
			request.client_address == "" ||
			request.client_bank_name == "" ||
			request.client_bank_account == "" ||
			request.client_bank_number == ""
		if (checkField) {
			toast.warn("Please Fill All The Fields", {
				autoClose: 1000,
				theme: "colored",
			})
			return false
		}
		axios
			.post(
				`${API_BASE_URL}/${
					request.client_id ? "updateClientData" : "addClient"
				}`,
				request,
			)
			.then((response) => {
				if (response.data.success == true) {
					toast.success(response.data.message, {
						autoClose: 1000,
						theme: "colored",
					})
					navigate("/clientNew")
					return
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
	return (
		<Card title={`Client / ${from?.client_id ? "Update" : "Crate"} Form`}>
			<div className="top-space-search-reslute">
				<div className="tab-content px-2 md:!px-4">
					<div className="tab-pane active" id="header" role="tabpanel">
						<div
							id="datatable_wrapper"
							className="information_dataTables dataTables_wrapper dt-bootstrap4 "
						>
							<div className="formCreate">
								<form action="">
									<div className="row justify-content-center">
										<div className="form-group col-lg-6">
											<h6> Name</h6>

											<input
												onChange={handleChange}
												type="text"
												id="name_en"
												name="client_name"
												className="form-control"
												placeholder=" name "
												value={state.client_name}
											/>
										</div>
										<div className="form-group col-lg-6">
											<h6>Tax Number</h6>
											<input
												onChange={handleChange}
												type="number"
												id="name_en"
												name="client_tax_number"
												className="form-control"
												placeholder="123 "
												value={state.client_tax_number}
											/>
										</div>
									</div>
									<div className="row justify-content-center">
										<div className="form-group col-lg-6">
											<h6>Email</h6>
											<input
												onChange={handleChange}
												type="email"
												id="hs_name"
												name="client_email"
												className="form-control"
												placeholder="admin@gmail.com"
												value={state.client_email}
											/>
										</div>
										<div className="form-group col-lg-6">
											<h6>Phone Number</h6>
											<input
												type="text"
												name="client_phone"
												className="form-control"
												placeholder="123456789"
												value={state.client_phone}
												onChange={handleChange}
											/>
										</div>
									</div>
									<div className="row ">
										<h6>Address</h6>
										<textarea
											onChange={handleChange}
											className="col-lg-12 rounded h-20 w-full"
											style={{ border: "2px solid #245486" }}
											name="client_address"
											value={state.client_address}
										/>
									</div>
									<h6
										className="mt-4"
										style={{
											fontWeight: "600",
											marginBottom: "10px",
											fontSize: "20px",
										}}
									>
										Bank Informations
									</h6>
									<div className="row ">
										<div className="form-group col-lg-4">
											<h6>Bank Name</h6>

											<input
												onChange={handleChange}
												type="text"
												id="name_en"
												name="client_bank_account"
												className="form-control"
												placeholder="axis "
												value={state.client_bank_account}
											/>
										</div>
										<div className="form-group col-lg-4">
											<h6>Account Name</h6>
											<input
												onChange={handleChange}
												type="text"
												id="name_en"
												name="client_bank_name"
												className="form-control"
												placeholder="xxxxx "
												value={state.client_bank_name}
											/>
										</div>
										<div className="form-group col-lg-4">
											<h6>Account Number</h6>
											<input
												onChange={handleChange}
												type="text"
												id="name_en"
												name="client_bank_number"
												className="form-control"
												placeholder="3345345435 "
												value={state.client_bank_number}
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="card-footer text-center ">
						<button
							onClick={AddClient}
							className="btn btn-primary"
							type="submit"
							name="signup"
						>
							{from?.client_id ? "Update" : "Create"}
						</button>
						<Link className="btn btn-danger" to={"/clientNew"}>
							Cancel
						</Link>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default CreateClient
