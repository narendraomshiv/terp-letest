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
  const [restoredRows, setRestoredRows] = useState([]);

  const getAdustEan = () => {
    axios.get(`${API_BASE_URL}/getAdjustEanStock`).then((res) => {
      setData(res.data.data || []);
    });
  };
  useEffect(() => {
    getAdustEan();
  }, []);

  const restoreAdjustEan = (id) => {
    if (restoredRows.includes(id)) {
      return; // Do nothing if already restored
    }

    axios
      .post(`${API_BASE_URL}/restorePackingCommon`, {
        packingCommonid: id,
      })
      .then((response) => {
        toast.success("EAN Packing Restore Successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        setRestoredRows([...restoredRows, id]);
        getAdustEan();
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
              disabled={restoredRows.includes(a.packing_common_id)}
            >
              <i className="mdi mdi-restore" />
            </button>
          </div>
        ),
      },
    ],
    [restoredRows]
  );

  return (
    <Card title={"Adjust EAN"}>
      <TableView columns={columns} data={data} />
    </Card>
  );
};
