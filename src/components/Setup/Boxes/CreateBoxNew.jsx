import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../../Url/Url"
import { Card } from "../../../card"

const CreateBoxNew = () => {
	const navigate = useNavigate()
	const defaultState = {
		box_name: "",
		box_height: "",
		box_weight: "",
		box_width: "",
		box_length: "",
		box_pallet: "",
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

	const boxCreate = () => {
		const request = {
			user_id:localStorage.getItem("id"),
			box_name: state.box_name,
			box_height: state.box_height,
			box_weight: state.box_weight,
			box_width: state.box_width,
			box_length: state.box_length,
			box_pallet: state.box_pallet,
			box_cbm: cbm,
			box_mlw: minload,
		}

		const fieldCheck =
			request.box_name == "" ||
			request.box_height == "" ||
			request.box_weight == "" ||
			request.box_width == "" ||
			request.box_length == "" ||
			request.box_pallet == ""
		if (fieldCheck) {
			toast.warn("Please Fill All The Fields", {
				autoClose: 1000,
				theme: "colored",
			})
			return false
		}
		axios
			.post(`${API_BASE_URL}/addBoxes`, request)
			.then((response) => {
				if (response.data.success == true) {
					toast.success(response.data.message, {
						autoClose: 1000,
						theme: "colored",
					})
					navigate("/boxes")
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
				if (error) {
					toast.error("Network Error", {
						autoClose: 1000,
						theme: "colored",
					})
					return false
				}
			})
	}

	const boxwidth = state.box_width
	const boxlength = state.box_length
	const boxheight = state.box_height
	const calsecond =
		(0.0001 *
			(parseFloat(boxwidth) * parseFloat(boxlength) * parseFloat(boxheight))) /
		1000000 /
		0.0001
	const cbm = calsecond.toFixed(4)
	const cal_min = (cbm * 1000) / 6
	const minload = cal_min.toFixed(2)

	return (
		<Card title={"Boxes Management / Create Form"}>
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
										<div className="form-group col-lg-3">
											<h6>Name</h6>
											<input
												type="text"
												id="name_th"
												name="box_name"
												onChange={handleChange}
												className="form-control"
												placeholder="name"
												value={state.box_name}
											/>
										</div>
										<div className="form-group col-lg-3">
											<h6>Width</h6>

											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_width"
														onChange={handleChange}
														className="form-control"
														placeholder="width"
														value={state.box_width}
													/>
												</div>
												<div className="shipPercent">
													<span>cm</span>
												</div>
											</div>
										</div>
										<div className="form-group col-lg-3">
											<h6>Lenght</h6>
											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_length"
														onChange={handleChange}
														className="form-control"
														placeholder="width"
														value={state.box_length}
													/>
												</div>
												<div className="shipPercent">
													<span>cm</span>
												</div>
											</div>
										</div>

										<div className="form-group col-lg-3">
											<h6>Height</h6>
											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_height"
														onChange={handleChange}
														className="form-control"
														placeholder="width"
														value={state.box_height}
													/>
												</div>
												<div className="shipPercent">
													<span>cm</span>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="form-group col-lg-3">
											<h6>CBM</h6>
											<input
												type="text"
												id="hs_name"
												name="box_cbm"
												className="form-control"
												placeholder="automatic calculation"
												value={cbm}
											/>
										</div>
										<div className="form-group col-lg-3">
											<h6>Weight</h6>
											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_weight"
														onChange={handleChange}
														className="form-control"
														placeholder="weight"
														value={state.box_weight}
													/>
												</div>
												<div className="shipPercent">
													<span>g</span>
												</div>
											</div>
										</div>
										<div className="form-group col-lg-3">
											<h6>MinLoad</h6>
											<input
												type="text"
												id="name_en"
												name="box_mlw"
												className="form-control"
												placeholder="automatic calculation"
												value={minload}
											/>
										</div>
										<div className="form-group col-lg-3">
											<h6>Box/Pallet</h6>
											<input
												type="text"
												id="name_en"
												name="box_pallet"
												onChange={handleChange}
												className="form-control"
												placeholder="Box/Pallet"
												value={state.box_pallet}
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="card-footer">
						<button
							onClick={boxCreate}
							className="btn btn-primary"
							type="submit"
							name="signup"
						>
							Create
						</button>
						<Link className="btn btn-danger" to="/boxes">
							Cancel
						</Link>
					</div>
				</div>
			</div>
		</Card>
	)
}

export default CreateBoxNew
