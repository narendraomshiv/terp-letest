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
  const [selectedLinerId, setSelectedLinerId] = useState(null);
  const [Journey, setJourney] = useState([]);

  console.log(selectedLinerId);
  const navigate = useNavigate();
  // const { data, refetch } = useQuery("getOrders");

  const [data, setData] = useState([]);
  const orderData = () => {
    axios.get(`${API_BASE_URL}/getOrders`).then((res) => {
      setData(res.data.data || []);
    });
  };
  useEffect(() => {
    orderData();
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
        new Date(dataFind?.load_date || null).toISOString().split("T")[0] || "",
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
          orderData();
          refetch();
        } catch (e) {
          console.log(e);
          // toast.error("Something went wrong");
        }
      }
      closeModal();
    },
  });
  useEffect(() => {
    if (selectedLinerId !== null || dataFind?.Freight_liner) {
      const linerId =
        selectedLinerId !== null ? selectedLinerId : dataFind?.Freight_liner;
      axios
        .post(`${API_BASE_URL}/getjourneyNumber`, { liner_id: linerId })
        .then((response) => {
          setJourney(response.data.data || []);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedLinerId, dataFind?.Freight_liner]);
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
  const handleJourneySelection = async (selectedJourneyId) => {
    const journey_id = selectedJourneyId; // assuming selectedJourneyId comes directly as the ID
    const order_id = id; // Assuming 'id' is already storing the order_id you need

    try {
      // Sending a POST request to the server with journey_id and order_id
      const response = await axios.post(
        `${API_BASE_URL}/getOrderFreightDetails`,
        {
          journey_id,
          order_id,
        }
      );
      // Logging the entire response object to see all details
      console.log("Response from getOrderFreightDetails:", response);

      // Show success message

      // Check if data is available and update form fields
      const data = response.data;
      if (data) {
        // Log the data object to see its structure and values
        console.log("Received data:", data.data);

        // Updating form fields with the received data
        form.setFieldValue("Load_time", data.data.Load_time);
        form.setFieldValue("ETD", data.data.ETD);
        form.setFieldValue("ETA", data.data.ETA);
        form.setFieldValue(
          "Ship_date",
          new Date(data.data.Freight_ship_date).toISOString().split("T")[0]
        );
        form.setFieldValue(
          "Arrival_date",
          new Date(data.data.Freight_arrival_date).toISOString().split("T")[0]
        );
      } else {
        // Log if data is missing or undefined
        console.log("No data received in response");
      }
    } catch (error) {
      // Log the error if the request fails
      console.error("Failed to fetch freight details:", error);
      toast.error("Error fetching freight details");
    }
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
        Header: "TT REF",
        accessor: "Shipment_ref",
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
            <Link to="/orderPdf_View">
              <i class="mdi mdi-file-account-outline"></i>
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
                        onChange={(e) => {
                          // Here, `e` is expected to be the ID of the selected item if ComboBox passes it like that,
                          // otherwise you might need to adjust how you retrieve the value
                          field.handleChange(e);
                          setSelectedLinerId(e); // Assuming `e` directly is the liner_id, adjust if needed
                        }}
                      />
                    )}
                  />
                </div>
                <div className="form-group">
                  <label>Journey Number</label>

                  <form.Field
                    name="journey_number"
                    children={(field) => (
                      <ComboBox
                        options={Journey?.map((v) => ({
                          id: v.ID,
                          name: v.journey_number,
                        }))}
                        defaultValues={dataFind?.Freight_journey_number}
                        value={field.state.value}
                        onChange={(e) => {
                          field.handleChange(e);
                          handleJourneySelection(e);
                        }}
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
