import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../Url/Url"
import { Card } from "../../card"
import { TableView } from "../table"

const ShipToNew = () => {
	const [isOn, setIsOn] = useState(true)
	const [data, setData] = useState([])
	const navigate = useNavigate()

	const columns = React.useMemo(
		() => [
			{
				Header: "Id",
				id: "index",
				accessor: (_row, i) => i + 1,
			},

			{
				Header: "Name / Company",
				accessor: "consignee_name",
			},
			{
				Header: "Status",
				accessor: (a) => (
					<label
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							padding: "10px",
						}}
						className="toggleSwitch large"
						onclick=""
					>
						<input
							onChange={() => setIsOn(!isOn)}
							type="checkbox"
							defaultChecked
						/>
						<span>
							<span>OFF</span>
							<span>ON</span>
						</span>
						<a> </a>
					</label>
				),
			},

			{
				Header: "Actions",
				accessor: (a) => (
					<Link to="/edit_ship_to" state={{ from: a }}>
						<i
							className="mdi mdi-pencil"
							style={{
								width: "20px",
								color: "#203764",
								fontSize: "22px",
								marginTop: "10px",
							}}
						/>
					</Link>
				),
			},

			{
				Header: "Salary",
				accessor: (a) => <>{"100000000"}</>,
			},
		],
		[],
	)

	const getAirportData = () => {
		axios
			.get(`${API_BASE_URL}/getConsignee`)
			.then((response) => {
				setData(response.data.data || [])
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

	useEffect(() => {
		getAirportData()
	}, [])

	return (
		<Card
			title="Consignee Management"
			endElement={
				<button
					type="button"
					onClick={() => navigate("/add_ship_to")}
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

export default ShipToNew
