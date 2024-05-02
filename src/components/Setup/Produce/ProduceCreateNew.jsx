import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../../Url/Url"
import { Card } from "../../../card"

const ProduceCreateNew = () => {
	const navigate = useNavigate()
	const defaultState = {
		produce_name_en: "",
		produce_name_th: "",
		produce_scientific_name: "",
		produce_hscode: "",
		produce_classification_id: "",
	}
	const [state, setState] = useState(defaultState)
	const [classification, setClassification] = useState([])

	const handleChange = (event) => {
		const { name, value } = event.target
		setState((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	const produceCreate = async () => {
		const request = {
			user_id:localStorage.getItem("id"),
			produce_name_en: state.produce_name_en,
			produce_name_th: state.produce_name_th,
			produce_scientific_name: state.produce_scientific_name,
			produce_hscode: state.produce_hscode,
			produce_classification_id: state.produce_classification_id,
		}
		const fieldCheck =
			request.produce_name_en == "" ||
			request.produce_name_th == "" ||
			request.produce_scientific_name == "" ||
			request.produce_hscode == "" ||
			request.produce_classification_id == ""
		if (fieldCheck) {
			toast.warn("Please Fill All The Above", {
				autoClose: 1000,
				theme: "colored",
			})
			return false
		}
		await axios
			.post(`${API_BASE_URL}/createProduce`, request)
			.then((response) => {
				if (response.data.success == true) {
					toast.success(response.data.message, {
						autoClose: 1000,
						theme: "colored",
					})
					navigate("/produceNew")
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
	const getClassificationData = () => {
		axios
			.get(`${API_BASE_URL}/getDropdownProduceClassification`)
			.then((response) => {
				if (response.data.success == true) {
					setClassification(response.data.data)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		getClassificationData()
	}, [])

	return (
		<Card title="Produce Management / Create Form">
			<div className="top-space-search-reslute">
				<div className="tab-content px-2 md:!px-4">
					<div className="tab-pane active" id="header" role="tabpanel">
						<div
							id="datatable_wrapper"
							className="information_dataTables dataTables_wrapper dt-bootstrap4"
						>
							<div className="formCreate">
								<form action="">
									<div className="row">
										<div className="col-lg-6 form-group">
											<h6 style={{ paddingBottom: "2px" }}>Classification</h6>

											<select
												onChange={handleChange}
												name="produce_classification_id"
												id=""
												style={{ padding: "10px" }}
											>
												{classification.map((item) => (
													<option value={item.produce_classification_id}>
														{item.produce_classification_name_en}
													</option>
												))}
											</select>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-lg-6">
											<h6>Name TH</h6>
											<input
												onChange={handleChange}
												type="text"
												id="name_th"
												name="produce_name_th"
												className="form-control"
												placeholder="Name TH"
												value={state.produce_name_th}
											/>
										</div>
										<div className="form-group col-lg-6">
											<h6>Name EN</h6>
											<input
												onChange={handleChange}
												type="text"
												id="name_en"
												name="produce_name_en"
												className="form-control"
												placeholder="Name EN"
												value={state.produce_name_en}
											/>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-lg-6">
											<h6>HS Code</h6>
											<input
												onChange={handleChange}
												type="text"
												id="hs_code"
												name="produce_hscode"
												className="form-control"
												placeholder="HS Code"
												value={state.produce_hscode}
											/>
										</div>
										<div className="form-group col-lg-6">
											<h6>Scientific Name</h6>
											<input
												onChange={handleChange}
												type="text"
												id="hs_name"
												name="produce_scientific_name"
												className="form-control"
												placeholder="Scientific Name"
												value={state.produce_scientific_name}
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="card-footer">
						<button
							onClick={produceCreate}
							className="btn btn-primary"
							type="submit"
							name="signup"
						>
							Create
						</button>
						<Link className="btn btn-danger" to="/produceNew">
							Cancel
						</Link>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default ProduceCreateNew
