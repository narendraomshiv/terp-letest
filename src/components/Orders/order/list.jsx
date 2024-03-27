import { useForm } from "@tanstack/react-form";
import axios from "axios";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../Url/Url";
import { Card } from "../../../card";
import MySwal from "../../../swal";
import { ComboBox } from "../../combobox";
import { TableView } from "../../table";

const Orders = () => {
  const navigate = useNavigate();
  // const { data, refetch } = useQuery("getOrders");

  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/getOrders`).then((res) => {
      setData(res.data.data || []);
    });
  }, []);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: liner } = useQuery("getLiner");
  const [id, setID] = useState(null);
  const dataFind = useMemo(() => {
    return data?.find((v) => +v.order_id == +id);
  }, [id, data]);
  const form = useForm({
    defaultValues: {
      Liner: dataFind?.Freight_liner || "",
      journey_number: dataFind?.Freight_journey_number || "",
      bl: dataFind?.Freight_bl || "",
      Load_date:
        new Date(dataFind?.Freight_load_date || null)
          .toISOString()
          .split("T")[0] || "",
      Load_time: dataFind?.Freight_load_time || "",
      Ship_date:
        new Date(dataFind?.Freight_ship_date || null)
          .toISOString()
          .split("T")[0] || "",
      ETD: dataFind?.Freight_etd || "",
      Arrival_date:
        new Date(dataFind?.Freight_arrival_date || null)
          .toISOString()
          .split("T")[0] || "",
      ETA: dataFind?.Freight_eta || "",
    },
    onSubmit: async ({ value }) => {
      if (dataFind?.order_id) {
        try {
          await axios.post(`${API_BASE_URL}/updateOrderFreight`, {
            order_id: dataFind?.order_id,
            ...value,
          });
          toast.success("Order update successfully");
          refetch();
        } catch (e) {
          toast.error("Something went wrong");
        }
      }
      closeModal();
    },
  });
  const closeModal = () => {
    setIsOpenModal(false);
  };
  const openModal = (id = null) => {
    setID(id);
    form.reset();
    setIsOpenModal(true);
  };
  const deleteOrder = (id) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post(`${API_BASE_URL}/deleteOrder`, { id: id });
          toast.success("Order delete successfully");
          refetch();
        } catch (e) {
          toast.error("Something went wrong");
        }
      }
    });
  };
  const columns = useMemo(
    () => [
      {
        Header: "Number",
        accessor: "Order_number",
      },
      {
        Header: "Consignee Name",
        accessor: "consignee_name",
      },
      {
        Header: "Location",
        accessor: "location_name",
      },
      {
        Header: "Load Date",
        accessor: (a) => {
          return a?.Freight_load_date
            ? new Date(a?.Freight_load_date).toLocaleDateString()
            : "NA";
        },
      },
      {
        Header: "Load Time",
        accessor: (a) => {
          return a?.Freight_load_time || "NA";
        },
      },
      {
        Header: "Status",
        accessor: (a) => ({ 2: "Confirmed" }[a.Status] || "Pending"),
      },
      {
        Header: "Actions",
        accessor: (a) => (
          <div className="editIcon">
            <Link
              to="/createOrder"
              state={{ from: { ...a, isReadOnly: true } }}
            >
              <i className="mdi mdi-eye" />
            </Link>
            {+a.Status == 0 && (
              <Link to="/createOrder" state={{ from: { ...a } }}>
                <i className="mdi mdi-pencil" />
              </Link>
            )}
            <Link to="/orderPdfView" state={{ from: { ...a } }}>
              <i className="mdi mdi-file-pdf-box" />
            </Link>
            <Link
              to="/createQutation"
              state={{
                from: { ...a, quote_id: undefined, to_copy_id: a.quote_id },
              }}
            >
              <i className="mdi mdi-content-copy" />
            </Link>
            <button type="button" onClick={() => openModal(a.order_id)}>
              <i className="mdi mdi-airplane-clock" />
            </button>

            {+a.Status == 0 && (
              <button type="button" onClick={() => deleteOrder(a.order_id)}>
                <i className="mdi mdi-delete " />
              </button>
            )}
          </div>
        ),
      },
    ],
    [data, form]
  );

  return (
    <>
      <Card
        title="Order Management"
        endElement={
          <button
            type="button"
            onClick={() => navigate("/createOrder")}
            className="btn button btn-info"
          >
            Create
          </button>
        }
      >
        <TableView columns={columns} data={data} />
      </Card>

      {isOpenModal && (
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
                <div className="form-group mb-3">
                  <label>Liner</label>
                  <form.Field
                    name="Liner"
                    children={(field) => (
                      <ComboBox
                        options={liner?.map((v) => ({
                          id: v.liner_id,
                          name: v.liner_name,
                        }))}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e)}
                      />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>Journey Number</label>
                  <form.Field
                    name="journey_number"
                    children={(field) => (
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>BL</label>
                  <form.Field
                    name="bl"
                    children={(field) => (
                      <input
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    )}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="form-group w-full">
                    <label>Load Date</label>
                    <form.Field
                      name="Load_date"
                      children={(field) => (
                        <input
                          type="date"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label>Load Time</label>
                    <form.Field
                      name="Load_time"
                      children={(field) => (
                        <input
                          type="time"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="form-group w-full">
                    <label>Ship Date</label>
                    <form.Field
                      name="Ship_date"
                      children={(field) => (
                        <input
                          type="date"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label>ETD</label>
                    <form.Field
                      name="ETD"
                      children={(field) => (
                        <input
                          type="time"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="form-group w-full">
                    <label>Arrival Date</label>
                    <form.Field
                      name="Arrival_date"
                      children={(field) => (
                        <input
                          type="date"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
                  <div className="form-group">
                    <label>ETA</label>
                    <form.Field
                      name="ETA"
                      children={(field) => (
                        <input
                          type="time"
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    />
                  </div>
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

export default Orders;
