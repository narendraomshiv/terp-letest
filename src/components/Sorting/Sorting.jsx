import axios from "axios";
import { useMemo, useState, useEffect } from "react";

import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Url/Url";
import { Card } from "../../card";
import { TableView } from "../table";

const Sorting = () => {
  const { data: sorted, refetch } = useQuery("getSorting");
  // const { data, refetch2 } = useQuery("getViewToSort");
  const [data, setData] = useState([]);
  const getSortData=()=>{
    axios.get(`${API_BASE_URL}/getViewToSort`).then((res) => {
      setData(res.data.data || []);
    });

  }
  useEffect(() => {
    getSortData();
  }, []);
  const revertSorting = (sorting_id) => {
    axios
      .post(`${API_BASE_URL}/revertSorting`, { sorting_id })
      .then((response) => {
        toast.success("Reverted sorted Successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        getSortData();
        refetch();
        // refetch2();
      });
  };

  const restoreSorting = (id) => {
    console.log(id);
    axios
      .post(`${API_BASE_URL}/restoreSorting`, {
        receiving_id: id,
      })
      .then((response) => {
        console.log(response);
        toast.success(" sorted Restore Successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        getSortData();
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
  const columns = React.useMemo(
    () => [
      {
        Header: "Code",
        accessor: "pod_code",
      },
      {
        Header: "Name",
        accessor: "produce",
      },
      {
        Header: "Crates",
        accessor: "cartes_to_sort",
      },
      {
        Header: "Quantity",
        accessor: "qty_to_sort",
      },
      {
        Header: "Unit",
        accessor: "Unit",
      },
      {
        Header: "Actions",
        accessor: (a) => {
          console.log(a);
          // 	const q = sorted?.find((b) => b.pod_code == a.pod_code)
          // 	return  (
          // 		<button
          // 			type="button"
          // 			onClick={(_) => revertSorting(q.sorting_id)}
          // 			className="cursor-pointer"
          // 		>
          // 			<i
          // 				className="mdi mdi-restore"
          // 				style={{
          // 					width: "20px",
          // 					color: "#203764",
          // 					fontSize: "22px",
          // 					marginTop: "10px",
          // 				}}
          // 			/>
          // 		</button>
          // 	) (
          // 		<Link state={{ from: a }} to="/newSorting">
          // 			<i
          // 				className="mdi mdi-check"
          // 				style={{
          // 					width: "20px",
          // 					color: "#203764",
          // 					fontSize: "22px",
          // 					marginTop: "10px",
          // 				}}
          // 			/>
          // 		</Link>
          // 	)
          return (
            <>
              <Link state={{ from: a }} to="/newSorting">
                <i
                  className="mdi mdi-check"
                  style={{
                    width: "20px",
                    color: "#203764",
                    fontSize: "22px",
                    marginTop: "10px",
                  }}
                />
              </Link>

              <button
                type="button"
                onClick={() => restoreSorting(a.receiving_id)}
              >
                <i
                  className="mdi mdi-restore"
                  style={{
                    width: "20px",
                    color: "#203764",
                    fontSize: "22px",
                    marginTop: "10px",
                  }}
                />
              </button>
            </>
          );
        },
      },
    ],
    [sorted]
  );

  return (
    <Card title="Sorting Management">
      <TableView columns={columns} data={data || []} />
    </Card>
  );
};

export default Sorting;
