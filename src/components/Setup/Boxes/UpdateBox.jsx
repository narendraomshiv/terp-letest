import axios from "axios"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../../Url/Url"
import { Card } from "../../../card"

const UpdateBox = () => {
	const location = useLocation()
	const { from } = location.state || {}
	const navigate = useNavigate()

	const defaultState = {
		box_name: from?.box_name || "",
		box_height: from?.box_height || "",
		box_weight: from?.box_weight || "",
		box_width: from?.box_width || "",
		box_length: from?.box_length || "",
		box_pallet: from?.box_pallet || "",
		box_cbm: from?.box_cbm || "",
		box_mlw: from?.box_mlw || "",
	}

	const [editBoxData, setEditBoxData] = useState(defaultState)

	const handleChange = (event) => {
		const { name, value } = event.target
		setEditBoxData((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}

	// Edit Box Api
	const updateBoxData = async () => {
		const request = {
			box_id: from?.box_id,
			box_name: editBoxData.box_name,
			box_height: editBoxData.box_height,
			box_weight: editBoxData.box_weight,
			box_pallet: editBoxData.box_pallet,
			box_width: editBoxData.box_width,
			box_length: editBoxData.box_length,
			box_cbm: editBoxData.box_cbm,
			box_mlw: editBoxData.box_mlw,
		}

		await axios
			.post(`${API_BASE_URL}/editBoxes`, request)
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
				if (error) {
					toast.error("Network Error", {
						autoClose: 1000,
						theme: "colored",
					})
					return false
				}
			})
	}

	const boxwidth = editBoxData.box_width
	const boxlength = editBoxData.box_length
	const boxheight = editBoxData.box_height
	const cal =
		(0.0001 *
			(parseFloat(boxwidth) * parseFloat(boxlength) * parseFloat(boxheight))) /
		1000000 /
		0.0001
	const cbm = cal.toFixed(4)
	const cal_min = (cbm * 1000) / 6
	const minload = cal_min.toFixed(2)

	// Edit Box Api
	return (
		<Card title={"Boxes Management / Edit Form"}>
			<div className="top-space-search-reslute">
				<div className="tab-content px-2 md:!px-4">
					<div className="tab-pane active" id="header" role="tabpanel">
						<div
							id="datatable_wrapper"
							className="information_dataTables dataTables_wrapper dt-bootstrap4 "
						>
							<div className="d-flex exportPopupBtn"></div>
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
												defaultValue={editBoxData.box_name}
											/>
										</div>
										<div className="form-group col-lg-3">
											<h6>Width</h6>
											{/* <input type="text" id="name_en" name="box_width" onChange={handleChange}
                                                                className="form-control" placeholder="width" defaultValue={editBoxData.box_width}/> */}
											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_width"
														onChange={handleChange}
														className="form-control"
														placeholder="width"
														defaultValue={editBoxData.box_width}
													/>
												</div>
												<div className="shipPercent">
													<span>cm</span>
												</div>
											</div>
										</div>

										<div className="form-group col-lg-3">
											<h6>Lenght</h6>
											{/* <input type="text" id="name_en" name="box_length" onChange={handleChange}
                                                                className="form-control" placeholder="lenght" defaultValue={editBoxData.box_length}/> */}
											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_length"
														onChange={handleChange}
														className="form-control"
														placeholder="length"
														defaultValue={editBoxData.box_length}
													/>
												</div>
												<div className="shipPercent">
													<span>cm</span>
												</div>
											</div>
										</div>

										<div className="form-group col-lg-3">
											<h6>Height</h6>
											{/* <input type="text" id="hs_code" name="box_height" onChange={handleChange}
                                                                className="form-control" placeholder="height" defaultValue={editBoxData.box_height}/> */}
											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_height"
														onChange={handleChange}
														className="form-control"
														placeholder="height"
														defaultValue={editBoxData.box_height}
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
												name="hs_name"
												className="form-control"
												placeholder="automatic calculation"
												value={cbm}
											/>
										</div>
										<div className="form-group col-lg-3">
											<h6>Weight</h6>
											{/* <input type="text" id="name_en" name="box_weight" onChange={handleChange}
                                                                className="form-control" placeholder="weight" defaultValue={editBoxData.box_weight}/> */}

											<div className="parentShip">
												<div className="markupShip">
													<input
														type="text"
														id="name_en"
														name="box_weight"
														onChange={handleChange}
														className="form-control"
														placeholder="weight"
														defaultValue={editBoxData.box_weight}
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
												name="name_en"
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
												defaultValue={editBoxData.box_pallet}
											/>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
					<div className="card-footer buttonCreate">
						<button
							onClick={updateBoxData}
							className="btn btn-primary"
							style={{ width: "125px" }}
							type="submit"
							name="signup"
						>
							Update
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

export default UpdateBox
