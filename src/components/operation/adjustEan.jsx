// import { useMemo } from "react"
// import { useQuery } from "react-query"
// import { Link, useNavigate } from "react-router-dom"
// import { Card } from "../../card"
// import { TableView } from "../table"
// export const AdjustEan = () => {
// 	const navigate = useNavigate()
// 	const { data } = useQuery("getAdjustEanStock")
// 	const columns = useMemo(
// 		() => [
// 			{
// 				Header: "Name",
// 				accessor: "name",
// 			},
// 			{
// 				Header: "Brand",
// 				accessor: "brand",
// 			},
// 			{
// 				Header: "Quantity Available",
// 				accessor: "qty_available",
// 			},
// 			{
// 				Header: "Average Weight(g)",
// 				accessor: "Average Weight(g)",
// 			},
// 			{
// 				Header: "Average Cost",
// 				accessor: "avg_cost",
// 			},
// 			{
// 				Header: "Actions",
// 				accessor: (a) => (
// 					<div className="editIcon gap-2">
// 						<Link
// 							to="/repackEan"
// 							state={{
// 								from: a,
// 							}}
// 						>
// 							<i className="mdi mdi-pencil" />
// 						</Link>
// 						<i className="mdi mdi-delete" />
// 					</div>
// 				),
// 			},
// 		],
// 		[],
// 	)

// 	return (
// 		<Card title={"Adjust EAN"}>
// 			<TableView columns={columns} data={data} />
// 		</Card>
// 	)
// }

import { useMemo, useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { API_BASE_URL } from "../../Url/Url";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../card";
import { TableView } from "../table";
import { toast } from "react-toastify";

export const AdjustEan = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const getAdustEan = () => {
    axios.get(`${API_BASE_URL}/getAdjustEanStock`).then((res) => {
      setData(res.data.data || []);
    });
  };
  useEffect(() => {
    getAdustEan();
  }, []);
  // const { data } = useQuery("getAdjustEanStock");

  // Static data to be added to the table
  // const staticData = [
  //   {
  //     name: "Static Product 1",
  //     brand: "Static Brand 1",
  //     qty_available: 10,
  //     Average_Weight_g: 200,
  //     avg_cost: 10.5,
  //   },
  //   {
  //     name: "Static Product 2",
  //     brand: "Static Brand 2",
  //     qty_available: 20,
  //     Average_Weight_g: 150,
  //     avg_cost: 8.75,
  //   },
  // ];

  // Merge fetched data with static data
  // const mergedData = [...(data || []), ...staticData];
  const restoreAdjustEan = (id) => {
    console.log(id);
    axios
      .post(`${API_BASE_URL}/restorePackingCommon`, {
        packingCommonid: id,
      })
      .then((response) => {
        console.log(response);
        toast.success(" EAN Packing Restore Successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        getAdustEan();
        // if (response.data.success) {

        //   Swal.fire(
        //     "Admin login sucessfully!",
        //     "You clicked the button!",
        //     "success"
        //   );
        //   navigate("/admin");
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Quantity Available",
        accessor: "qty_available",
      },
      {
        Header: "Average Weight(g)",
        accessor: "Average_Weight_g",
      },
      {
        Header: "Average Cost",
        accessor: "avg_cost",
      },
      {
        Header: "Actions",
        accessor: (a) => (
          <div className="editIcon gap-2">
            <i className="mdi mdi-eye"></i>
            <Link
              to="/repackEan"
              state={{
                from: a,
              }}
            >
              <i className="mdi mdi-pencil" />
            </Link>
            <i className="mdi mdi-delete" />
            <button
              type="button"
              onClick={() => restoreAdjustEan(a.packing_common_id)}
            >
              <i className="mdi mdi-restore" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <Card title={"Adjust EAN"}>
      <TableView columns={columns} data={data} />
    </Card>
  );
};
