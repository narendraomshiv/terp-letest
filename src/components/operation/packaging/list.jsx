import axios from "axios"
import { useMemo } from "react"
import { useQuery } from "react-query"
import { Link, useNavigate } from "react-router-dom"
import { API_BASE_URL } from "../../../Url/Url"
import { Card } from "../../../card"
import { TableView } from "../../table"

export const OrderPackagingList = () => {
	const navigate = useNavigate()
	const { data } = useQuery("getOrders")
	const confirmQuotation = async (id) => {
		try {
			await axios.post(`${API_BASE_URL}/confirmOrder`, { quote_id: id })
			toast.success("Order confirmed successfully")
		} catch (e) {
			toast.error("Something went wrong")
		}
	}
	
	const columns = useMemo(
		() => [
			{
				Header: "Number",
				accessor: "Order_number",
			},
			{
				Header: "TTREF",
				accessor: "Shipment_ref",
			},
			{
				Header: "Consignee Name",
				accessor: "consignee_name",
			},
			{
				Header: "Load Date",
				accessor: (a) => {
					return a.load_date ? new Date(a.load_date).toLocaleDateString() : "NA"
				},
			},
			{
				Header: "Load Time",
				accessor: (a) => {
					return a.load_date ? new Date(a.load_date).toLocaleTimeString() : "NA"
				},
			},
			{
				Header: "Supplier",
				accessor: (a) => a.supplier_name,
			},
			{
				Header: "Freight BL",
				accessor: (a) => a.Freight_bl,
			},
			{
				Header: "Status",
				accessor: (a) => ({ 2: "Confirmed" })[a.Status] || "Pending",
			},
			{
				Header: "Actions",
				accessor: (a) => (
					<div className="editIcon gap-2">
						{/* <Link
							to="/createOrder"
							state={{ from: { ...a, isReadOnly: true } }}>
							<i className="mdi mdi-eye"></i>
						</Link> */}
						{+a.Status == 0 && (
							<Link to="/orderPackagingEdit" state={{ from: { ...a } }}>
								<i className="mdi mdi-pencil" />
							</Link>
						)}
						{+a.Status == 0 && (
							<>
								<button
									type="button"
									onClick={() => {
										// MySwal.fire({
										// 	title: "Are you sure?",
										// 	text: "You won't be able to revert this!",
										// 	icon: "warning",
										// 	showCancelButton: true,
										// 	confirmButtonColor: "#3085d6",
										// 	cancelButtonColor: "#d33",
										// 	confirmButtonText: "Yes, confirm it!",
										// }).then((result) => {
										// 	if (result.isConfirmed) confirmQuotation(a.quote_id)
										// })
									}}
								>
									{/* <i class="mdi mdi-delete "></i> */}
								</button>
								<button
									type="button"
								
								>
									<i className="mdi mdi-check" />
									{/* <i className="mdi mdi-restore" /> */}
									
								</button>
							</>
						)}
					</div>
				),
			},
		],
		[],
	)

	return (
		<Card
			title={"Order Packaging Management"}
			endElement={
				<button
					type="button"
					onClick={() => navigate("/orderPackagingEdit")}
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
