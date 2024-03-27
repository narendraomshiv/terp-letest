import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { API_BASE_URL } from "../../../Url/Url"
import { Card } from "../../../card"
import { TableView } from "../../table"

const BankNew = () => {
	const navigate = useNavigate()
	const [data, setData] = useState([])
	const [isOn, setIsOn] = useState(true)

	const getBankData = () => {
		axios
			.get(`${API_BASE_URL}/getBank`)
			.then((response) => {
				if (response.data.success == true) {
					setData(response.data.bankData)
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	useEffect(() => {
		getBankData()
	}, [])

	const updateBankStatus = (bankID) => {
		const request = {
			bank_id: bankID,
		}

		axios
			.post(`${API_BASE_URL}/updateBankStatus`, request)
			.then((response) => {
				if (response.data.success == true) {
					toast.success(response.data.message, {
						autoClose: 1000,
						theme: "colored",
					})
					getBankData()
					return
				}
			})
			.catch((error) => {
				console.log(error)
			})
	}

	const columns = useMemo(
		() => [
			{
				Header: "Id",
				id: "index",
				accessor: (_row, i) => <>{i + 1}</>,
			},
			{
				Header: "Bank Code",
				accessor: (a) => "BARP093",
			},

			{
				Header: "Name",
				accessor: (a) => <>{a.bank_name}</>,
			},

			{
				Header: "Branch",
				accessor: (a) => "New Delhi",
			},

			{
				Header: "Account",
				accessor: (a) => <>{a.Account_Name}</>,
			},

			{
				Header: "Account Type",
				accessor: (a) => "Bussiness",
			},

			{
				Header: "Status",
				accessor: (a) => (
					<label
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: "10px",
						}}
						className="toggleSwitch large"
						onclick=""
					>
						<input
							onChange={() => {
								setIsOn(!isOn)
							}}
							onClick={() => updateBankStatus(a.bank_id)}
							checked={a.status == "1" ? true : false}
							type="checkbox"
						/>
						<span>
							<span>OFF</span>
							<span>ON</span>
						</span>
						<a></a>
					</label>
				),
			},

			{
				Header: "Actions",
				accessor: (a) => (
					<Link to="/update_bank" state={{ from: a }}>
						<i
							i
							className="mdi mdi-pencil"
							style={{
								width: "22px",
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
				accessor: (a) => "1000000000",
			},
		],
		[],
	)

	return (
		<Card
			title="Bank Management"
			endElement={
				<button
					type="button"
					onClick={() => navigate("/add_bank")}
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

export default BankNew
