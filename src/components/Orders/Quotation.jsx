import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../Url/Url"
import { Card } from "../../card"
import MySwal from "../../swal"
import { TableView } from "../table"

const Quotation = () => {
	const navigate = useNavigate()
	const [data, setData] = useState([])
	useEffect(() => {
		axios.get(`${API_BASE_URL}/getAllQuotation`).then((res) => {
			setData(res.data.data || [])
		})
	}, [])
	const confirmQuotation = async (id) => {
		try {
			await axios.post(`${API_BASE_URL}/confirmQuotation`, { quote_id: id })
			toast.success("Quotation confirmed successfully")
		} catch (e) {
			toast.error("Something went wrong")
		}
	}
	const columns = useMemo(
		() => [
			{
				Header: "Number",
				accessor: "Quote_Number",
			},
			{
				Header: "Client Name",
				accessor: "client_name",
			},
			{
				Header: "Location",
				accessor: "location_name",
			},
			{
				Header: "Load date",
				accessor: (a) => {
					return a.load_date ? new Date(a.load_date).toLocaleDateString() : "NA"
				},
			},
			{
				Header: "Status",
				accessor: (a) => ({ 2: "Confirmed" })[a.Status] || "Pending",
			},
			{
				Header: "Actions",
				accessor: (a) => (
					<div className="editIcon">
						<Link
							to="/createQutation"
							state={{ from: { ...a, isReadOnly: true } }}
						>
							<i className="mdi mdi-eye" />
						</Link>
						{+a.Status == 1 && (
							<Link to="/createQutation" state={{ from: { ...a } }}>
								<i className="mdi mdi-pencil" />
							</Link>
						)}
						<Link
							to="/createQutation"
							state={{
								from: { ...a, quote_id: undefined, to_copy_id: a.quote_id },
							}}
						>
							<i className="mdi mdi-content-copy" />
						</Link>
						{+a.Status == 1 && (
							<button
								type="button"
								onClick={() => {
									MySwal.fire({
										title: "Are you sure?",
										text: "You won't be able to revert this!",
										icon: "warning",
										showCancelButton: true,
										confirmButtonColor: "#3085d6",
										cancelButtonColor: "#d33",
										confirmButtonText: "Yes, confirm it!",
									}).then((result) => {
										if (result.isConfirmed) confirmQuotation(a.quote_id)
									})
								}}
							>
								<i className="mdi mdi-check-circle" />
							</button>
						)}
					</div>
				),
			},
		],
		[],
	)

	return (
		<Card
			title="Quotation Management"
			endElement={
				<button
					type="button"
					onClick={() => navigate("/createQutation")}
					className="btn button btn-info"
				>
					Create
				</button>
			}
		>
			<TableView columns={columns} data={data} />
		</Card>
	)
}

export default Quotation
