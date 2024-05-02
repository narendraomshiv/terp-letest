import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../Url/Url"
import { Card } from "../../card"
import MySwal from "../../swal"
const CreateQutoation = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { from } = location.state || {}
	const isReadOnly = from?.isReadOnly
	const [isLoading, setIsLoading] = useState(false)
	const loadingModal = MySwal.mixin({
		title: "Loading...",
		didOpen: () => {
			MySwal.showLoading()
		},
		showCancelButton: false,
		showConfirmButton: false,
		allowOutsideClick: false,
	})
	const [state, setState] = useState({
		created: from?.created
			? new Date(from?.created).toISOString().slice(0, 10)
			: new Date().toISOString().slice(0, 10),
		quote_id: from?.quote_id,
		Quote_Number: from?.Quote_Number,
		user_id:localStorage.getItem("id"),
		brand_id: from?.brand_id,
		client_id: from?.client_id,
		loading_location: from?.loading_location,
		Freight_provider_: from?.Freight_provider_,
		liner_id: from?.liner_id,
		from_port_: from?.from_port_,
		destination_port_id: from?.destination_port_id,
		Clearance_provider: from?.Clearance_provider,
		Transportation_provider: from?.Transportation_provider,
		consignee_id: from?.consignee_id,
		fx_id: from?.fx_id,
		mark_up: from?.mark_up,
		rebate: from?.rebate,
		palletized: from?.palletized,
		Chamber: from?.Chamber,
		load_date: from?.load_date
			? new Date(from?.load_date).toISOString().slice(0, 10)
			: "",
		fx_rate: from?.fx_rate,
	})
	const handleChange = (event) => {
		if (isReadOnly || isLoading) return
		const { name, value } = event.target
		setState((prevState) => {
			return {
				...prevState,
				[name]: value,
			}
		})
	}
	const { data: clients } = useQuery("getClientDataAsOptions")
	const { data: brands } = useQuery("getBrand")
	const { data: locations } = useQuery("getLocation")
	const { data: freights } = useQuery("getFreight_Supplier")
	const { data: liners } = useQuery("getLiner")
	const { data: ports } = useQuery("getAllAirports")
	const { data: clearance } = useQuery("getClearance")
	const { data: transport } = useQuery("getTransportation_Supplier")
	const { data: consignee } = useQuery("getConsignee")
	const { data: currency } = useQuery("getCurrency")
	const { data: unit } = useQuery("getAllUnit")
	const { data: itf } = useQuery("getItf")
	useEffect(() => {
		getSummary()
		getQuotationDetails()
		getToCopyDetails()
	}, [])
	const [editValues, setEditValues] = useState([])
	const handleEditValues = (index, e) => {
		if (isReadOnly || isLoading) return
		const newEditProduce = [...editValues]
		newEditProduce[index][e.target.name] = e.target.value
		setEditValues(newEditProduce)
	}
	const getQuotationDetails = () => {
		if (!state.quote_id) return
		axios
			.get(`${API_BASE_URL}/getQuotationDetials?quote_id=${state.quote_id}`)
			.then((response) => {
				if (response.data.data.length) setEditValues(response.data.data)
			})
	}
	const [formValues, setFormValues] = useState([
		{
			ITF: "",
			itf_quantity: 0,
			itf_unit: "",
			Number_of_boxes: "",
			net_weight: "",
			exw_cost: "",
			cbm: "",
			calculated_price: 0,
		},
	])

	const addFieldHandleChange = (i, e) => {
		if (isReadOnly || isLoading) return
		const newFormValues = [...formValues]
		newFormValues[i][e.target.name] = e.target.value
		setFormValues(newFormValues)
	}

	const addFormFields = () => {
		if (isReadOnly || isLoading) return
		setFormValues([
			...formValues,
			{
				ITF: "",
				itf_quantity: 0,
				itf_unit: "",
				Number_of_boxes: "",
				net_weight: "",
				exw_cost: "",
				calculated_price: 0,
				cbm: "",
			},
		])
	}

	const removeFormFields = (i) => {
		if (isReadOnly || isLoading) return
		const newFormValues = [...formValues]
		newFormValues.splice(i, 1)
		setFormValues(newFormValues)
	}
	const computedState = useMemo(() => {
		return {
			...state,
			rebate:
				state.rebate ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)?.rebate,
			currency:
				state.fx_id ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)?.fx_id,
			fx_rate:
				state?.fx_rate ||
				currency?.find((v) => v?.currency_id == state?.fx_id)?.fx_rate ||
				// currency[
				// 	consignee?.findIndex((v) => v?.consignee_id == state?.consignee_id)
				// ]?.fx_rate ||
				consignee?.findIndex((v) => v?.consignee_id == state?.consignee_id)?.fx_rate ||0,
			fx_id:
				state.fx_id ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)?.currency,
			Clearance_provider:
				state.Clearance_provider ||
				ports?.find(
					(v) =>
						v.port_id ==
						(state.from_port_ ||
							consignee?.find((v) => v.consignee_id == state.consignee_id)
								?.port_of_orign),
				)?.preferred_clearance ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)
					?.Clearance_provider,
			loading_location:
				state.loading_location ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)
					?.Default_location,
			brand_id:
				state.brand_id ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)?.brand,
			mark_up:
				state.mark_up ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)?.profit,
			Transportation_provider:
				state.Transportation_provider ||
				ports?.find(
					(v) =>
						v.port_id ==
						(state.from_port_ ||
							consignee?.find((v) => v.consignee_id == state.consignee_id)
								?.port_of_orign),
				)?.preferred_transport,
			from_port_:
				state.from_port_ ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)
					?.port_of_orign,
			destination_port_id:
				state.destination_port_id ||
				consignee?.find((v) => v.consignee_id == state.consignee_id)
					?.destination_port,
			liner_id:
				state.liner_id ||
				ports?.find(
					(v) =>
						v.port_id ==
						(state.from_port_ ||
							consignee?.find((v) => v.consignee_id == state.consignee_id)
								?.destination_port),
				)?.prefered_liner,
			Freight_provider_:
				state.Freight_provider_ ||
				liners?.find(
					(v) =>
						v.liner_id ==
						(state.liner_id ||
							ports?.find(
								(v) =>
									v.port_id ==
									(state.from_port_ ||
										consignee?.find((v) => v.consignee_id == state.consignee_id)
											?.destination_port),
							)?.prefered_liner),
				)?.preffered_supplier,
		}
	}, [
		state,
		consignee,
		currency,
		ports,
		brands,
		locations,
		liners,
		transport,
		clearance,
		freights,
		unit,
		itf,
	])
	const update = () => {
		if (isReadOnly || isLoading) return
		setIsLoading(true)
		loadingModal.fire()

		axios
			.post(
				`${API_BASE_URL}/${
					state.quote_id ? "updateQuotation" : "addQuotation"
				}`,
				computedState,
			)
			.then(async (response) => {
				if (state.quote_id) {
					await axios
						.post(`${API_BASE_URL}/updateQuotationDetails`, {
							data: editValues,
							// quote_id: state.quote_id,
						})
						.catch((e) => {})
				}
				await axios
					.post(`${API_BASE_URL}/addQuotationDetails`, {
						quotation_id: state.quote_id || response.data.data,
						data: formValues,
					})
					.catch((e) => {})

				toast.success("Added Qutoation Successfully", {
					autoClose: 1000,
					theme: "colored",
				})
				navigate("/quotation")
			})
			.catch((e) => {
				toast.error("Something went wrong", {
					autoClose: 1000,
					theme: "colored",
				})
			})
			.finally(() => {
				setIsLoading(false)
				MySwal.close()
			})
	}
	const [summary, setSummary] = useState({})
	const getSummary = () => {
		if (!state.quote_id) return
		axios
			.get(`${API_BASE_URL}/getQuotationSummary?quote_id=${state.quote_id}`)
			.then((response) => {
				setSummary(response.data.data)
			})
	}
	const deleteQuotationInput = (id) => {
		if (isReadOnly || isLoading) return
		setIsLoading(true)
		axios
			.get(
				`${API_BASE_URL}/deleteQuotationDetials?qod_id=${editValues[id].qod_id}`,
			)
			.then(async (response) => {
				toast.success("Deleted", {
					autoClose: 1000,
					theme: "colored",
				})
				setEditValues((prevState) => {
					const copyFrom = [...prevState]
					copyFrom.splice(id, 1)
					return copyFrom
				})
			})
			.catch((e) => {
				toast.error("Something went wrong", {
					autoClose: 1000,
					theme: "colored",
				})
			})
			.finally(() => {
				setIsLoading(false)
			})
	}
	const getToCopyDetails = () => {
		if (!from?.to_copy_id) return
		axios
			.get(`${API_BASE_URL}/getQuotationDetials?quote_id=${from?.to_copy_id}`)
			.then((response) => {
				setFormValues(response.data.data)
			})
	}
	const doCalcuate = () => {
		if (isReadOnly || isLoading) return
		setIsLoading(true)
		loadingModal.fire()
		const ilen = formValues.filter(
			(v) => v.ITF && v.itf_quantity && v.itf_unit,
		).length
		axios
			.post(`${API_BASE_URL}/calculateQuotation`, {
				quotationData: computedState,
				inputData: [...formValues, ...editValues].filter(
					(v) => v.ITF && v.itf_quantity && v.itf_unit,
				),
			})
			.then((response) => {
				const copyFrom = [...formValues]
				let i = 0
				while (i < ilen) {
					copyFrom[i] = response.data.data[i].data
					i++
				}
				setFormValues(copyFrom)
				const copyFrom2 = [...editValues]
				while (i < response.data.data.length) {
					const tmp = copyFrom2[i - ilen].qod_id
					copyFrom2[i - ilen] = response.data.data[i].data
					copyFrom2[i - ilen].qod_id = tmp
					i++
				}
				setEditValues(copyFrom2)
				setSummary(response.data.summary)
				toast.success("Calculated", {
					autoClose: 1000,
					theme: "colored",
				})
			})
			.catch((e) => {
				console.log(e)
				toast.error("Something went wrong", {
					autoClose: 1000,
					theme: "colored",
				})
			})
			.finally(() => {
				setIsLoading(false)
				MySwal.close()
			})
	}

	return (
		<Card
			title={`Quotation Management / ${
				isReadOnly ? "View" : state.quote_id ? "Update" : "Create"
			} Form`}
		>
			<div className="formCreate px-4">
				<form action="">
					<div className="row formEan">
						<div className="col-lg-3 form-group">
							<h6> Create Date </h6>
							<input
								type="date"
								name="created"
								onChange={handleChange}
								value={computedState.created}
							/>
						</div>
					</div>
					<div className="row formEan">
						<div className="col-lg-3 form-group">
							<h6>Client</h6>
							<div className="ceateTransport">
								<select
									value={computedState.client_id}
									onChange={handleChange}
									name="client_id"
								>
									<option>Select Client</option>
									{clients?.map((v) => (
										<option value={v.client_id}>{v.client_name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Consignee</h6>
							<div className="ceateTransport">
								<select
									value={computedState.consignee_id}
									onChange={handleChange}
									name="consignee_id"
								>
									<option>Select Consignee</option>
									{(consignee || [])
										.filter((v) => v.client_id == state.client_id)
										?.map((v) => (
											<option value={v.consignee_id}>{v.consignee_name}</option>
										))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Brands</h6>
							<div className="ceateTransport">
								<select
									value={computedState.brand_id}
									onChange={handleChange}
									name="brand_id"
								>
									<option>Select Brands</option>
									{brands?.map((v) => (
										<option value={v.brand_id}>{v.Brand_name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Currency</h6>
							<div className="ceateTransport">
								<select
									value={computedState.fx_id}
									onChange={handleChange}
									name="fx_id"
								>
									<option>Select Currency</option>
									{currency?.map((v) => (
										<option value={v.fx_id}>{v.currency}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Loading Location</h6>
							<div className="ceateTransport">
								<select
									value={computedState.loading_location}
									onChange={handleChange}
									name="loading_location"
								>
									<option>Select Loading</option>
									{locations?.map((v) => (
										<option value={v.id}>{v.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Port of Origin</h6>
							<div className="ceateTransport">
								<select
									value={computedState.from_port_}
									onChange={handleChange}
									name="from_port_"
								>
									<option>Select Origin</option>
									{ports?.map((v) => (
										<option value={v.port_id}>{v.port_name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Port of Destination</h6>
							<div className="ceateTransport">
								<select
									value={computedState.destination_port_id}
									onChange={handleChange}
									name="destination_port_id"
								>
									<option>Select Destination</option>
									{ports?.map((v) => (
										<option value={v.port_id}>{v.port_name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Airline</h6>
							<div className="ceateTransport">
								<select
									value={computedState.liner_id}
									onChange={handleChange}
									name="liner_id"
								>
									<option>Select Airline</option>
									{liners?.map((v) => (
										<option value={v.liner_id}>{v.liner_name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Transportation</h6>
							<div className="ceateTransport">
								<select
									value={computedState.Transportation_provider}
									onChange={handleChange}
									name="Transportation_provider"
								>
									<option>Select Transportation</option>
									{transport?.map((v) => (
										<option value={v.Transportation_provider}>{v.name}</option>
									))}
								</select>
							</div>
						</div>

						<div className="col-lg-3 form-group">
							<h6>Clearance</h6>
							<div className="ceateTransport">
								<select
									value={computedState.Clearance_provider}
									onChange={handleChange}
									name="Clearance_provider"
								>
									<option>Select Clearance</option>
									{clearance?.map((v) => (
										<option value={v.Clearance_provider}>{v.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Freight Provider</h6>
							<div className="ceateTransport">
								<select
									value={computedState.Freight_provider_}
									onChange={handleChange}
									name="Freight_provider_"
								>
									<option>Select Freight</option>
									{freights?.map((v) => (
										<option value={v.Freight_provider}>{v.name}</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>EX Rate</h6>
							<input
								type="number"
								value={computedState.fx_rate}
								onChange={handleChange}
								name="fx_rate"
							/>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Markup Rate</h6>
							<div className="parentShip">
								<div className="markupShip">
									<input
										type="number"
										placeholder="0"
										value={
											state.mark_up ||
											consignee?.find(
												(v) => v.consignee_id == state.consignee_id,
											)?.profit
										}
										onChange={handleChange}
										name="mark_up"
									/>
								</div>
								<div className="shipPercent">
									<span>%</span>
								</div>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6> Rebate</h6>
							<div className="parentShip">
								<div className="markupShip">
									<input
										type="number"
										placeholder="0"
										readOnly
										value={computedState.rebate}
										name="rebate"
									/>
								</div>
								<div className="shipPercent">
									<span>%</span>
								</div>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Palletized</h6>
							<div className="flex gap-2 items-center">
								<label className="toggleSwitch large" onclick="">
									<input
										name="palletized"
										id="Palletized"
										checked={computedState.palletized}
										onChange={() => {
											setState((prevState) => {
												return {
													...prevState,
													palletized: !prevState.palletized,
												}
											})
										}}
										type="checkbox"
									/>
									<span>
										<span>OFF</span>
										<span>ON</span>
									</span>
									<a> </a>
								</label>
								<label htmlFor="Palletized">Palletized</label>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>CO from Chamber</h6>
							<div className="flex gap-2 items-center">
								<label className="toggleSwitch large" onclick="">
									<input
										name="Chamber"
										id="Chamber"
										checked={computedState.Chamber}
										onChange={() => {
											setState((prevState) => {
												return {
													...prevState,
													Chamber: !prevState.Chamber,
												}
											})
										}}
										type="checkbox"
									/>
									<span>
										<span>OFF</span>
										<span>ON</span>
									</span>
									<a> </a>
								</label>
								<label htmlFor="Chamber">CO from Chamber</label>
							</div>
						</div>
						<div className="col-lg-3 form-group">
							<h6>Ship Before Date</h6>
							<input
								type="date"
								onChange={handleChange}
								value={computedState.load_date}
								name="load_date"
							/>
						</div>
					</div>
					{isReadOnly ? null : (
						<div className="row">
							<div className="addBtnEan">
								<button
									className="mt-0 mb-5"
									type="button"
									onClick={doCalcuate}
								>
									Calculate
								</button>
							</div>
						</div>
					)}
					<div
						id="datatable_wrapper"
						className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive w-full"
					>
						<table
							id="example"
							className="display transPortCreate table table-hover table-striped borderTerpProduce table-responsive"
							style={{ width: "100%" }}
						>
							<thead>
								<tr>
									<th>ITF</th>
									<th>Quantity</th>
									<th>Unit</th>
									<th> Number of Box</th>
									<th>NW</th>
									<th>Unit Price</th>
									<th>Adjust Price</th>
									<th>Profit</th>
									{!isReadOnly && <th>Action</th>}
								</tr>
							</thead>
							<tbody>
								{editValues?.map((v, i) => (
									<tr
										className="rowCursorPointer"
										data-bs-toggle="modal"
										data-bs-target="#myModal"
									>
										<td>
											<select
												onChange={(e) => handleEditValues(i, e)}
												value={v.ITF}
												name="ITF"
												style={{ width: "280px" }}
											>
												<option value="">Select ITF</option>
												{itf?.map((v) => (
													<option value={v.itf_id}>{v.itf_name_en}</option>
												))}
											</select>
										</td>
										<td>
											<input
												onChange={(e) => handleEditValues(i, e)}
												value={v.itf_quantity}
												name="itf_quantity"
												type="number"
												placeholder="enter quantity"
											/>
										</td>
										<td>
											<select
												onChange={(e) => handleEditValues(i, e)}
												value={v.itf_unit}
												style={{ width: "100px" }}
												name="itf_unit"
											>
												<option value="">Select Unit</option>
												{unit?.map((v) => (
													<option value={v.unit_id}>{v.unit_name_en}</option>
												))}
											</select>
										</td>
										<td>
											<input
												type="number"
												readOnly
												value={v.Number_of_boxes}
												style={{ width: "100px" }}
											/>
										</td>
										<td>
											<input readOnly value={v.net_weight} />
										</td>
										<td>
											<input type="number" value={v.calculated_price} />
										</td>
										<td>
											<input
												type="number"
												onChange={(e) => handleEditValues(i, e)}
												name="adjusted_price"
												value={v.adjusted_price || 0}
											/>
										</td>
										<td>
											<div className="flex border-2 border-[#203764] rounded-md overflow-hidden items-center">
												<input
													className="border-0 w-20 mb-0 !rounded-none"
													type="number"
													placeholder="0"
													value={v.profit_percentage}
												/>
												<span className="px-1.5 bg-gray-200 py-2">%</span>
											</div>
										</td>
										{!isReadOnly && (
											<td>
												<button
													type="button"
													className="cursor-pointer"
													onClick={() =>
														MySwal.fire({
															title: "Are you sure?",
															text: "You won't be able to revert this!",
															icon: "warning",
															showCancelButton: true,
															confirmButtonColor: "#3085d6",
															cancelButtonColor: "#d33",
															confirmButtonText: "Yes, delete it!",
														}).then((result) => {
															if (result.isConfirmed) deleteQuotationInput(i)
														})
													}
												>
													<i className={"mdi mdi-minus text-2xl"} />
												</button>
											</td>
										)}
									</tr>
								))}
								{!isReadOnly &&
									formValues?.map((v, i) => (
										<tr
											className="rowCursorPointer"
											data-bs-toggle="modal"
											data-bs-target="#myModal"
										>
											<td>
												<select
													onChange={(e) => addFieldHandleChange(i, e)}
													value={v.ITF}
													name="ITF"
													style={{ width: "280px" }}
												>
													<option value="">Select ITF</option>
													{itf?.map((v) => (
														<option value={v.itf_id}>{v.itf_name_en}</option>
													))}
												</select>
											</td>
											<td>
												<input
													onChange={(e) => addFieldHandleChange(i, e)}
													value={v.itf_quantity}
													name="itf_quantity"
													type="number"
													placeholder="enter quantity"
												/>
											</td>
											<td>
												<select
													onChange={(e) => addFieldHandleChange(i, e)}
													value={v.itf_unit}
													style={{ width: "100px" }}
													name="itf_unit"
												>
													<option value="">Select Unit</option>
													{unit?.map((v) => (
														<option value={v.unit_id}>{v.unit_name_en}</option>
													))}
												</select>
											</td>
											<td>
												<input
													type="number"
													readOnly
													value={v.Number_of_boxes}
													style={{ width: "100px" }}
												/>
											</td>
											<td>
												<input readOnly value={v.net_weight} />
											</td>
											<td>
												<input type="number" value={v.calculated_price} />
											</td>
											<td>
												<input
													type="number"
													onChange={(e) => addFieldHandleChange(i, e)}
													name="adjusted_price"
													value={v.adjusted_price || 0}
												/>
											</td>
											<td>
												<div className="flex border-2 border-[#203764] rounded-md overflow-hidden items-center">
													<input
														className="border-0 w-24 mb-0 !rounded-none"
														type="number"
														placeholder="0"
														value={v.profit_percentage}
													/>
													<span className="px-1.5 bg-gray-200 py-2">%</span>
												</div>
											</td>
											<td>
												<button
													type="button"
													className="cursor-pointer"
													onClick={() => removeFormFields(i)}
												>
													<i className={"mdi mdi-minus text-2xl"} />
												</button>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</form>
			</div>

			{isReadOnly ? null : (
				<div className="addBtnEan px-4">
					<button className="mt-0" type="button" onClick={addFormFields}>
						Add
					</button>
				</div>
			)}
			<div className="row py-4 px-4">
				<div className="col-lg-4">
					<b> Total NW : </b>
					{summary?.Net_Weight || 0}
				</div>
				<div className="col-lg-4">
					<b> Total FOB : </b>
					{summary?.FOB || 0}
				</div>
				<div className="col-lg-4">
					<b> Total Commission : </b>
					{summary?.Commission || 0}
				</div>
				<div className="col-lg-4">
					<b> Total GW : </b>
					{summary?.Gross_weight || 0}
				</div>
				<div className="col-lg-4">
					<b> Total Freight : </b>
					{summary?.Freight || 0}
				</div>
				<div className="col-lg-4">
					<b> Total Rebate : </b>
					{summary?.Rebate || 0}
				</div>
				<div className="col-lg-4">
					<b> Total Box : </b>
					{summary?.Box || 0}
				</div>
				<div className="col-lg-4">
					<b> Total CNF : </b>
					{summary?.CNF || 0}
				</div>
				<div className="col-lg-4">
					<b> Total Profit : </b>
					{summary?.Profit || 0}
				</div>
				<div className="col-lg-4">
					<b> Total CBM : </b>
					{summary?.CBM || 0}
				</div>
				<div className="col-lg-4">
					<b> Total CNF FX : </b>
					{summary?.CNF_FX || 0}
				</div>
			</div>
			<div className="card-footer">
				{isReadOnly ? null : (
					<button
						className="btn btn-primary"
						type="submit"
						name="signup"
						onClick={() => update()}
					>
						{state.quote_id ? "Update" : "Create"}
					</button>
				)}

				<Link className="btn btn-danger" to={"/quotation"}>
					Cancel
				</Link>
			</div>
		</Card>
	)
}

export default CreateQutoation
