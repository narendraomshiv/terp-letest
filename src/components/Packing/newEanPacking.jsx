import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Url/Url";
import MySwal from "../../swal";
import { ComboBox } from "../combobox";
import { TableView } from "../table";

const NewEanPacking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state || {};
  console.log(from.Produce_id);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const loadingModal = MySwal.mixin({
    title: "Loading...",
    didOpen: () => {
      MySwal.showLoading();
    },
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const defaultState = {
    pod_code: from?.pod_code,
    sorting_id: from?.sorting_id,
    qty_used: from?.available_qty,
    user_id: localStorage.getItem("id"),
    number_of_staff: "",
    start_time: "",
    end_time: "",

  };

  const defaultData = {
    ean_id: null,
    unit_id: null,
    brand_id: null,
    ean_quantity: 0,
  };

  const [state, setState] = useState(defaultState);
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(defaultData);
  // const [filterdata, setFilterdata] = useState("");

  const [packingCommonId, setPackingCommonId] = useState(null);
  const [datatable, setDatatable] = useState([]);
  const [assigned, setAssigned] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  console.log(state.start_time);
  const { data: unitType } = useQuery("getAllUnit");
  const { data: brands } = useQuery("getBrand");
  const { data: eanData } = useQuery("getEan");
  console.log(eanData);

  const columns = useMemo(
    () => [
      {
        Header: "EAN",
        accessor: "ean_name_en",
      },
      {
        Header: "Quantity",
        accessor: "ean_qty",
      },
      {
        Header: "Unit",
        accessor: "packing_ean_unit",
      },
      {
        Header: "Ean Cost",
        accessor: "ean_cost",
      },
      {
        Header: "Average Weight",
        accessor: "average_weight",
      },
      {
        Header: "Ean Per KG",
        accessor: "EanPerKg",
      },
      {
        Header: "Ean Per Hour",
        accessor: "EanPerHour",
      },
      // {
      // 	Header: "Actions",
      // 	accessor: (a) => {
      // 		return (
      // 			<div className="editIcon">
      // 				<button type="button">
      // 					<i className="mdi mdi-eye" />
      // 				</button>
      // 				<button type="button" onClick={() => getDetailItem(a.packing_common_id)}>
      // 					<i className="mdi mdi-pencil"/>
      // 				</button>
      // 				<button type="button">
      // 					<i className="mdi mdi-cached" />
      // 				</button>
      // 				<button type="button">
      // 					<i className="mdi mdi-delete" />
      // 				</button>
      // 			</div>
      // 		)
      // 	},
      // },
    ],
    []
  );

  useEffect(() => {
    getPackingCommon();
  }, []);

  useEffect(() => {
    if (packingCommonId) {
      getDatatable(packingCommonId);
    }

    setState((prevState) => ({ ...prevState, defaultData }));
  }, [toggle === true]);

  const getPackingCommon = () => {
    const request = {
      pod_code: from?.pod_code,
      sorting_id: from?.sorting_id,
    };

    loadingModal.fire();

    axios.post(`${API_BASE_URL}/getPackingCommon`, request).then((response) => {
      console.log(response);
      if (response.data.data) {
        const { packing_common_id, number_of_staff, start_time, end_time } =
          response.data.data;

        // setPackingCommonId((prevState) => packing_common_id);
        setState((prevState) => {
          return {
            ...prevState,
            number_of_staff: "",
            start_time: "",
            end_time: "",
          };
        });

        // getDatatable(packing_common_id);
      }

      MySwal.close();
    });
  };

  const getDatatable = async (packing_common_id) => {
    await axios
      .post(`${API_BASE_URL}getEanDetailViews`, {
        packing_common_id: packing_common_id,
        // last_inserted_id: filterdata,
      })
      .then((response) => {
        console.log(response);
        if (response.data.data) {
          setDatatable(response.data.data);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChangeData = (e, name) => {
    setData((prevState) => ({ ...prevState, [name]: e }));
  };

  const handleChangeQty = (e) => {
    setData((prevState) => ({ ...prevState, ean_quantity: e.target.value }));
  };

  const checkPackCommonId = async () => {
    console.log(packingCommonId);
    if (!packingCommonId) {
      const { qty_used, number_of_staff, start_time, end_time } = state;

      if (!qty_used || !number_of_staff || !start_time || !end_time) {
        return toast.error("Please fill all fields");
      }

      await axios
        .post(`${API_BASE_URL}/addPackingCommon`, state)
        .then((response) => {
          setPackingCommonId((prevState) => response.data.packing_common_id);
        })
        .catch((error) => {
          return toast.error(error);
        });
    }

    openModal();
  };

  const calculate = async () => {
    loadingModal.fire();

    await axios
      .post(`${API_BASE_URL}createEanPacking`, {
        packing_common_id: packingCommonId,
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Ean updated successfully");
          setToggle(!toggle);
        }
      });

    MySwal.close();
  };

  const saveNewDetails = async () => {
    const { ean_id, unit_id, brand_id, ean_quantity } = data;

    if (!ean_id || !unit_id || brand_id === null || !ean_quantity) {
      return toast.error("Please fill all fields");
    }

    const request = {
      ean_id: ean_id,
      unit_id: unit_id,
      brand_id: brand_id,
      ean_quantity: ean_quantity,
      packing_common_id: packingCommonId,
      number_of_staff: state.number_of_staff,
      start_time: state.start_time,
      end_time: state.end_time,
      user_id: localStorage.getItem("id"),
      assigned_order: selectedOrder,
    };

    axios
      .post(`${API_BASE_URL}/createEanProducne`, request)
      .then((response) => {
        console.log(response);
        // const lidValue = response.data.data[0][0]["@LID"];
        // console.log(lidValue);
        // setFilterdata(lidValue);
        if (response.status === 200) {
          toast.success("EanPacking detail added successfully");
          closeModal();
          setToggle(!toggle);
        }
      })
      .catch((error) => {
        return toast.error(error);
      });
  };

  const handleNewSlecter = () => {
    axios
      .post(`https://siameats.com/api//AssignOrderDropDownList`, {
        produce_id: from.Produce_id,
      })
      .then((response) => {
        console.log(response.data.data[0], "this is new item");
        setAssigned(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleNewSlecter();
  }, []);

  console.log(selectedOrder, "this is selected value");

  return (
    <main className="main-content">
      <div className="container-fluid">
        <nav
          className="navbar navbar-main navbar-expand-lg px-0 shadow-none border-radius-xl"
          id="navbarBlur"
          navbar-scroll="true"
        >
          <div className="container-fluid py-1 px-0">
            <nav aria-label="breadcrumb"></nav>
          </div>
        </nav>

        <div className="container-fluid pt-1 py-4 px-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 mb-4">
              <div className="bg-white">
                <div className="databaseTableSection pt-0">
                  <div className="grayBgColor" style={{ padding: "18px" }}>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 className="font-weight-bolder mb-0">
                          Operation / EAN Packing Management
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="top-space-search-reslute">
                    <div className="tab-content px-2 md:!px-4">
                      <div
                        className="tab-pane active"
                        id="header"
                        role="tabpanel"
                      >
                        <div
                          id="datatable_wrapper"
                          className="information_dataTables dataTables_wrapper dt-bootstrap4"
                        >
                          <div className="formCreate">
                            <div className="row">
                              <div className="form-group col-lg-3">
                                <h6>Name</h6>
                                <input
                                  type="text"
                                  className="form-control border-0"
                                  readOnly
                                  value={from?.produce}
                                />
                              </div>
                              <div className="form-group col-lg-3">
                                <h6>Unit</h6>
                                <input
                                  type="text"
                                  className="form-control border-0"
                                  readOnly
                                  value={from?.Unit}
                                />
                              </div>
                              <div className="form-group col-lg-3">
                                <h6>Quantity</h6>
                                <input
                                  type="number"
                                  className="form-control border-0"
                                  readOnly
                                  value={from?.available_qty}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="formCreate">
                            <form action="">
                              <div className="row">
                                <div className="form-group col-lg-3">
                                  <h6>Quantity used</h6>
                                  <input
                                    onChange={handleChange}
                                    type="number"
                                    name="qty_used"
                                    className="form-control"
                                    value={state.qty_used}
                                  />
                                </div>
                                <div className="form-group col-lg-3">
                                  <h6>Number of Staff</h6>
                                  <input
                                    onChange={handleChange}
                                    type="number"
                                    name="number_of_staff"
                                    className="form-control"
                                    value={state.number_of_staff}
                                  />
                                </div>
                                <div className="form-group col-lg-3">
                                  <h6>Start Time</h6>
                                  <input
                                    onChange={handleChange}
                                    type="time"
                                    name="start_time"
                                    className="form-control"
                                    value={state.start_time}
                                  />
                                </div>
                                <div className="form-group col-lg-3">
                                  <h6>End Time</h6>
                                  <input
                                    onChange={handleChange}
                                    type="time"
                                    name="end_time"
                                    className="form-control"
                                    value={state.end_time}
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2 items-center justify-between flex-wrap">
                                <div className="addBtnEan flex flex-wrap gap-3 items-center mb-4">
                                  <button
                                    type="button"
                                    onClick={() => calculate()}
                                    disabled={!packingCommonId}
                                  >
                                    Calculate
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => checkPackCommonId()}
                                  >
                                    Add
                                  </button>
                                </div>
                              </div>
                              {/* <TableView columns={columns} data={datatable} /> */}
                              <table
                                id="example"
                                className="display transPortCreate table table-hover table-striped borderTerpProduce table-responsive"
                                style={{ width: "100%" }}
                              >
                                <thead>
                                  <tr>
                                    <th>EAN</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th>Ean Cost</th>
                                    <th>Average Weight</th>
                                    <th>Ean Per KG</th>
                                    <th>Ean Per Hour</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {datatable.map((item, index) => (
                                    <tr key={index}>
                                      <td>{item.ean_name_en}</td>
                                      <td>{item.ean_qty}</td>
                                      <td>{item.packing_ean_unit}</td>
                                      <td>{item.ean_cost}</td>
                                      <td>{item.average_weight}</td>
                                      <td>{item.EanPerKg}</td>
                                      <td>{item.EanPerHour}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <Link className="btn btn-danger" to={"/eanPacking"}>
                        Close
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isOpenModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed w-screen h-screen bg-black/20"
              onClick={closeModal}
            />
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full z-50">
              <h3>Edit Details</h3>
              <div className="formEan formCreate">
                <div className="form-group mb-3">
                  <label>EAN</label>
                  <ComboBox
                    options={eanData
                      ?.filter((v) => v.ean_name_en.includes(from?.produce))
                      ?.map((item) => ({
                        id: item.ean_id, //
                        name: item.ean_name_en,
                      }))}
                    value={data?.ean_id}
                    onChange={(e) => handleChangeData(e, "ean_id")}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={data?.ean_quantity}
                    name="ean_quantity"
                    onChange={(e) => handleChangeQty(e)}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Unit</label>
                  <ComboBox
                    options={unitType?.map((item) => ({
                      id: item.unit_id,
                      name: item.unit_name_en,
                    }))}
                    value={data?.unit_id}
                    onChange={(e) => handleChangeData(e, "unit_id")}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Brand</label>
                  <ComboBox
                    options={brands?.map((item) => ({
                      id: item.brand_id,
                      name: item.Brand_name,
                    }))}
                    value={data?.brand_id}
                    onChange={(e) => handleChangeData(e, "brand_id")}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Assigned Order</label>
                  <select
                    value={selectedOrder}
                    onChange={(e) => setSelectedOrder(e.target.value)}
                  >
                    <option value="">Select...</option>
                    {assigned.map((item, index) => (
                      <option key={index} value={item.od_id}>
                        {item.Dropdown}
                      </option>
                    ))}
                  </select>
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
                    type="button"
                    onClick={() => saveNewDetails()}
                    className="bg-black text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default NewEanPacking;
