import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Url/Url";
import { TableView } from "../table";
import { Card } from "../../card";

const InventoryBoxes = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const getBoxesList = () => {
    axios.get(`${API_BASE_URL}/getBoxesAvailable`).then((res) => {
      console.log(res);
      setData(res.data.data || []);
    });
  };
  useEffect(() => {
    getBoxesList();
  }, []);

  console.log(data);
  const columns = React.useMemo(
	() => [
	  {
		Header: "Description",
		accessor: "Description",
	  },
	  {
		Header: "Item Name",
		accessor: "item_name",
	  },
	  {
		Header: "Unit Name",
		accessor: "unit_name",
	  },
	  {
		Header: "Quantity Available",
		accessor: "qty_available",
	  },
	  {
		Header: "Average Cost",
		accessor: "avg_cost",
	  },
	//   {
	// 	Header: "Status",
	// 	accessor: "status",
	//   },
	  {
		Header: "Actions",
		accessor: (a) => (
		  <>
			<i className=" ps-2 mdi mdi-eye" />
			<i className=" ps-2 mdi mdi-pencil" />
		  </>
		),
	  },
	],
	[]
  );
  
  return (
    <Card
      title="Available Boxes Management"
      endElement={
        <button
          type="button"
          onClick={() => navigate("/createUser")}
          className="btn button btn-info"
        >
          Create
        </button>
      }
    >
      <TableView columns={columns} data={data} />
    </Card>
  );
};

export default InventoryBoxes;
