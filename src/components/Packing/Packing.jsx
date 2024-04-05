import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Url/Url";
import { Card } from "../../card";
import { TableView } from "../table";

const EanPacking = () => {
  const [data, setData] = useState([]);
  const getEanPackaging = () => {
    axios.get(`${API_BASE_URL}/getToPack`).then((res) => {
      setData(res.data.data || []);
    });
  };

  useEffect(() => {
    getEanPackaging();
  }, []);

  const [id, setId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [restoredRows, setRestoredRows] = useState([]);

  const form = useForm({
    defaultValues: {
      sortingid: id,
      adjustqty: "",
      crates: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await axios.post(`${API_BASE_URL}/aslWastage`, {
          ...value,
        });
        toast.success("Order update successfully");
        refetch();
      } catch (e) {
        toast.error("Something went wrong");
      }
    },
  });

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (id = null) => {
    setId(id);
    form.reset();
    setIsOpen(true);
  };

  const restoreEanPackage = (id) => {
    if (restoredRows.includes(id)) {
      return; // Do nothing if already restored
    }

    axios
      .post(`${API_BASE_URL}/restoreEanPacking`, {
        sorting_id: id,
      })
      .then((response) => {
        toast.success(" EAN Packing Restore Successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        setRestoredRows([...restoredRows, id]);
        getEanPackaging();
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
        Header: "Quantity",
        accessor: "available_qty",
      },
      {
        Header: "Unit",
        accessor: "Unit",
      },
      {
        Header: "Cost",
        accessor: "sorted_cost",
      },
      {
        Header: "Actions",
        accessor: (a) => {
          return (
            <>
              <Link state={{ from: a }} to="/newEanPacking">
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
              <button type="button" onClick={() => openModal(a.sorting_id)}>
                <i
                  className="mdi mdi-delete"
                  style={{
                    width: "20px",
                    color: "#203764",
                    fontSize: "22px",
                    marginTop: "10px",
                  }}
                />
              </button>
              <button
                type="button"
                onClick={() => restoreEanPackage(a.sorting_id)}
                disabled={restoredRows.includes(a.sorting_id)}
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
    [restoredRows]
  );

  return (
    <>
      <Card title="EAN Packing Management">
        <TableView columns={columns} data={data} />
      </Card>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <div
            className="fixed w-screen h-screen bg-black/20"
            onClick={closeModal}
          />
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full z-50">
            <h3>Edit Details</h3>
            <form.Provider>
              <form
                className="formEan formCreate"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void form.handleSubmit();
                }}
              >
                <div className="form-group">
                  <label>Quantity on Hand</label>
                  <form.Field
                    name="adjustqty"
                    children={(field) => (
                      <input
                        type="number"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>Crates on Hand</label>
                  <form.Field
                    name="crates"
                    children={(field) => (
                      <input
                        type="number"
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </form.Provider>
          </div>
        </div>
      )}
    </>
  );
};

export default EanPacking;
