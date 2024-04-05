import axios from "axios";
import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Url/Url";
import { Card } from "../../card";
import { TableView } from "../table";

const Sorting = () => {
  const { data: sorted, refetch } = useQuery("getSorting");
  const [data, setData] = useState([]);
  const [restoredRows, setRestoredRows] = useState([]);

  const getSortData = () => {
    axios.get(`${API_BASE_URL}/getViewToSort`).then((res) => {
      setData(res.data.data || []);
    });
  };

  useEffect(() => {
    getSortData();
  }, []);

  const restoreSorting = (id) => {
    if (restoredRows.includes(id)) {
      return; // Do nothing if already restored
    }

    axios
      .post(`${API_BASE_URL}/restoreSorting`, {
        receiving_id: id,
      })
      .then((response) => {
        toast.success("Sorted restored successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        setRestoredRows([...restoredRows, id]);
        getSortData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = useMemo(
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
        accessor: (a) => (
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
              disabled={restoredRows.includes(a.receiving_id)}
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
        ),
      },
    ],
    [restoredRows]
  );

  return (
    <Card title="Sorting Management">
      <TableView columns={columns} data={data || []} />
    </Card>
  );
};

export default Sorting;
