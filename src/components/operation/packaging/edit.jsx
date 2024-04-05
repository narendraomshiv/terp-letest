import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../../Url/Url";
import { Card } from "../../../card";
import MySwal from "../../../swal";

export const OrderPackagingEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { from } = location.state || {};
  console.log(from);

  const loadingModal = MySwal.mixin({
    title: "Loading...",
    didOpen: () => {
      MySwal.showLoading();
    },
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
  });
  const isReadOnly = from?.isReadOnly;
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [disabledPackagingButtons, setDisabledPackagingButtons] = useState([]);

  const getOrdersDetails = () => {
    axios
      .get(`${API_BASE_URL}/getOrdersDetails`, {
        params: {
          id: from?.order_id,
        },
      })
      .then((response) => {
        console.log(response);
        setDetails(response.data.data || []);
      })
      .catch((e) => {});
  };

  const handleEditValues = (index, e) => {
    if (isReadOnly || isLoading) return;
    const newEditProduce = [...details];
    newEditProduce[index][e.target.name] = e.target.value;
    setDetails(newEditProduce);
  };

  const { data: unit } = useQuery("getAllUnit");
  const { data: itf } = useQuery("getItf");

  useEffect(() => {
    getOrdersDetails();
  }, []);

  const doPackaging = async (index) => {
    const data = details[index];
    if (!data.buns || !data.adjusted_gw_od)
      return toast.error("Please enter all values", {
        theme: "colored",
      });
    setIsLoading(true);
    loadingModal.fire();
    try {
      await axios
        .post(`${API_BASE_URL}/doOrderPacking`, {
          ...data,
        })
        .then((response) => {
          console.log(response);
          setDetails(response.data.data || []);
        })
        .then((response) => {
          console.log(response);
          toast.success("Order packaged successfully", {
            theme: "colored",
          });
        });
    } catch (e) {
      toast.error("Something went wrong", {
        theme: "colored",
      });
    } finally {
      loadingModal.close();
      setIsLoading(false);

      // Disable the button after it's clicked
      setDisabledPackagingButtons((prevDisabledButtons) => [
        ...prevDisabledButtons,
        index,
      ]);
    }
  };

  const restoreOrderPackaging = (id, index) => {
    // Check if the button is already disabled
    if (disabledButtons.includes(index)) {
      return;
    }

    // Disable the button
    setDisabledButtons((prevDisabledButtons) => [
      ...prevDisabledButtons,
      index,
    ]);

    axios
      .post(`${API_BASE_URL}/RestoreOrderPacking`, {
        opid: id,
      })
      .then((response) => {
        console.log(response);
        toast.success(" Order Packing Restore Successfully", {
          autoClose: 1000,
          theme: "colored",
        });
        getOrdersDetails();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card title="Expense Item Management / Edit Form">
        <div
          id="datatable_wrapper"
          className="information_dataTables dataTables_wrapper dt-bootstrap4 px-4"
        >
          <div className="formCreate ">
            <form action="">
              <div className="row formEan">
                <div className="col-lg-3 form-group">
                  <h6> Order Code </h6>
                  <input
                    readOnly
                    className="border-0"
                    value={from?.Order_number || ""}
                  />
                </div>
                <div className="col-lg-3 form-group">
                  <h6>Shipment Ref </h6>
                  <input
                    readOnly
                    className="border-0"
                    value={from?.Shipment_ref || ""}
                  />
                </div>
                <div className="col-lg-3 form-group">
                  <h6> Load Date </h6>
                  <input
                    readOnly
                    className="border-0"
                    value={
                      from?.load_date
                        ? new Date(from?.load_date).toLocaleDateString()
                        : ""
                    }
                  />
                </div>
                <div className="col-lg-3 form-group">
                  <h6> Load Time </h6>
                  <input
                    readOnly
                    className="border-0"
                    value={
                      from?.load_date
                        ? new Date(from?.load_date).toLocaleTimeString()
                        : ""
                    }
                  />
                </div>
              </div>
              <div
                id="datatable_wrapper"
                className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive mt-"
              >
                <table
                  id="example"
                  className="display transPortCreate table table-hover table-striped borderTerpProduce table-responsive"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>ITF</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                      <th>Number of Box</th>
                      <th>NW</th>
                      <th>Buns</th>
                      <th>Weight Adjustment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {details.map((v, i) => (
                      <tr className="rowCursorPointer align-middle">
                        <td className="">
                          {itf?.find((x) => x.itf_id == v.ITF)?.itf_name_en}
                        </td>
                        <td>
                          {+v.status != 1 ? (
                            <>{v.ean_per_od || 0}</>
                          ) : (
                            <input
                              type="number"
                              className="!w-24 mb-0"
                              onChange={(e) => handleEditValues(i, e)}
                              value={v.ean_per_od || 0}
                              name="ean_per_od"
                            />
                          )}
                        </td>
                        <td>
                          {
                            unit?.find((x) => x.unit_id == v.itf_unit)
                              ?.unit_name_en
                          }
                        </td>
                        <td>
                          {+v.status != 1 ? (
                            <>{v.Number_of_boxes || 0}</>
                          ) : (
                            <input
                              type="number"
                              className="!w-24 mb-0"
                              onChange={(e) => handleEditValues(i, e)}
                              value={v.Number_of_boxes || 0}
                              name="Number_of_boxes"
                            />
                          )}
                        </td>
                        <td>
                          {+v.status != 1 ? (
                            <>{v.net_weight || 0}</>
                          ) : (
                            <input
                              type="number"
                              className="!w-24 mb-0"
                              onChange={(e) => handleEditValues(i, e)}
                              value={v.net_weight || 0}
                              name="net_weight"
                            />
                          )}
                        </td>
                        <td>
                          {+v.status != 1 ? (
                            <>{v.buns || 0}</>
                          ) : (
                            <input
                              type="number"
                              className="!w-24 mb-0"
                              onChange={(e) => handleEditValues(i, e)}
                              value={v.buns || 0}
                              name="buns"
                            />
                          )}
                        </td>
                        <td>
                          {+v.status != 1 ? (
                            <>{v.adjusted_gw_od || 0}</>
                          ) : (
                            <input
                              type="number"
                              className="!w-24 mb-0"
                              onChange={(e) => handleEditValues(i, e)}
                              value={v.adjusted_gw_od || 0}
                              name="adjusted_gw_od"
                            />
                          )}
                        </td>

                        <td>
                          {!isReadOnly && +v.status === 1 && (
                            <button
                              type="button"
                              disabled={disabledPackagingButtons.includes(i)}
                              className="py-1"
                              onClick={() => doPackaging(i)}
                            >
                              <i className="mdi mdi-package-variant-closed text-2xl" />
                            </button>
                          )}

                          {!isReadOnly && +v.status === 0 && (
                            <button
                              type="button"
                              disabled={disabledButtons.includes(i)}
                              onClick={() => {
                                restoreOrderPackaging(v.od_id, i);
                              }}
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
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
        </div>
        <div className="card-footer">
          <Link className="btn btn-danger" to={"/orderPackaging"}>
            Cancel
          </Link>
        </div>
      </Card>
    </>
  );
};
