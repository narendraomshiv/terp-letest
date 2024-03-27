import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../Url/Url";
import { Card } from "../../card";
const AddShipTo = () => {
  const location = useLocation();
  const { from } = location.state || {};
  console.log(from);
  const navigate = useNavigate();
  const [state, setState] = useState({
    consignee_id: from?.consignee_id || "",
    CODE: from?.CODE || "",
    brand: from?.brand || "",
    client_id: from?.client_id || "",
    consignee_name: from?.consignee_name || "",
    consignee_tax_number: from?.consignee_tax_number || "",
    consignee_email: from?.consignee_email || "",
    consignee_phone: from?.consignee_phone || "",
    consignee_address: from?.consignee_address || "",
    Default_location: from?.Default_location || "",
    currency: from?.currency || "",
    port_of_orign: from?.port_of_orign || "",
    destination_port: from?.destination_port || "",
    Commission_Currency: from?.Commission_Currency || "",
    liner_Drop: from?.liner_Drop || "",
    profit: from?.profit || "",
    rebate: from?.rebate || "",
    commission: from?.commission || "",
    commission_value: from?.commission_value || "",
    notify_name: from?.notify_name || "",
    notify_tax_number: from?.notify_tax_number || "",
    notify_email: from?.notify_email || "",
    notify_phone: from?.notify_phone || "",
    notify_address: from?.notify_address || "",
  });
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? (checked ? "THB" : "FX") : value;
    setState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  
  const { data: brands } = useQuery("getBrand");
  const { data: client } = useQuery("getAllClients");
  const { data: port } = useQuery("getAllAirports");
  const { data: liner } = useQuery("getLiner");
  const { data: commission } = useQuery("getDropdownCommissionType");
  const { data: locations } = useQuery("getLocation");
  const { data: currency } = useQuery("getCurrency");

  const update = () => {
    // Update state to pass 'THB' or 'FX' based on Commission_Currency
    const updatedState = {
      ...state,
      Commission_Currency: state.Commission_Currency ? "THB" : "FX",
    };

    axios
      .post(
        `${API_BASE_URL}/${
          from?.consignee_id ? "updateConsignee" : "createConsignee"
        }`,
        updatedState
      )
      .then((response) => {
        navigate("/shipToNew");
        toast.success("Updated", {
          autoClose: 1000,
          theme: "colored",
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Network Error", {
          autoClose: 1000,
          theme: "colored",
        });
        return false;
      });
  };
  console.log(state.Commission_Currency);
  return (
    <Card title={`Ship To / ${from?.consignee_id ? "Update" : "Create"} Form`}>
      <div className="top-space-search-reslute">
        <div className="tab-content px-2 md:!px-4">
          <div className="tab-pane active" id="header" role="tabpanel">
            <div
              id="datatable_wrapper"
              className="information_dataTables dataTables_wrapper dt-bootstrap4 "
            >
              <div className="formCreate">
                <form action="">
                  <div className="row">
                    <div className="form-group col-lg-3">
                      <h6> Client</h6>

                      <div className="ceateTransport">
                        <select
                          name="client_id"
                          onChange={handleChange}
                          value={state.client_id}
                        >
                          <option value="">Select Client</option>
                          {client?.map((item) => (
                            <option value={item.client_id}>
                              {item.client_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-3">
                      <h6>Code</h6>
                      <input
                        type="text"
                        name="CODE"
                        className="w-full"
                        value={state.CODE}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-3">
                      <h6>Name</h6>
                      <input
                        type="text"
                        name="consignee_name"
                        className="w-full"
                        value={state.consignee_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-3">
                      <h6>Tax Number</h6>
                      <input
                        type="text"
                        className="w-full"
                        name="consignee_tax_number"
                        value={state.consignee_tax_number}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-lg-4">
                      <h6>Email</h6>
                      <input
                        type="email"
                        className="w-full"
                        name="consignee_email"
                        value={state.consignee_email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group col-lg-4">
                      <h6>Phone Number</h6>
                      <input
                        type="text"
                        className="w-full"
                        name="consignee_phone"
                        value={state.consignee_phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-4">
                      <h6> Brand</h6>
                      <div className="ceateTransport">
                        <select
                          value={state.brand}
                          name="brand"
                          onChange={handleChange}
                        >
                          <option value="">Select Brand</option>
                          {brands?.map((item) => (
                            <option value={item.brand_id}>
                              {item.Brand_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group col-lg-3">
                      <h6> Location</h6>

                      <div className="ceateTransport">
                        <select
                          value={state.Default_location}
                          name="Default_location"
                          onChange={handleChange}
                        >
                          <option value="">Select Location</option>
                          {locations?.map((item) => (
                            <option value={item.id}>{item.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-3">
                      <h6> Port of origin</h6>
                      <div className="ceateTransport">
                        <select
                          value={state.port_of_orign}
                          name="port_of_orign"
                          onChange={handleChange}
                        >
                          <option value="">Select Airport</option>
                          {port?.map((item) => (
                            <option value={item.port_id}>
                              {item.port_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-3">
                      <h6> Port of Destination</h6>
                      <div className="ceateTransport">
                        <select
                          value={state.destination_port}
                          name="destination_port"
                          onChange={handleChange}
                        >
                          <option value="">Select Airport</option>
                          {port?.map((item) => (
                            <option value={item.port_id}>
                              {item.port_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-3">
                      <h6> Airline</h6>
                      <div className="ceateTransport">
                        <select
                          value={state.liner_Drop}
                          name="liner_Drop"
                          onChange={handleChange}
                        >
                          <option value="">Please Select Airline</option>
                          {liner?.map((item) => (
                            <option value={item.liner_id}>
                              {item.liner_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-lg-4">
                      <h6> Invoice Currency</h6>

                      <div className="ceateTransport">
                        <select
                          value={state.currency}
                          name="currency"
                          onChange={handleChange}
                        >
                          <option value="">Select Location</option>
                          {currency?.map((item) => (
                            <option value={item.currency_id}>
                              {item.currency}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group col-lg-4">
                      <h6>Markup </h6>
                      <div className="parentShip">
                        <div className="markupShip">
                          <input
                            type="number"
                            value={state.profit}
                            name="profit"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="shipPercent">
                          <span>%</span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-lg-4">
                      <h6>Rebate</h6>
                      <div className="parentShip">
                        <div className="markupShip">
                          <input
                            type="number"
                            value={state.rebate}
                            name="rebate"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="shipPercent">
                          <span>%</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group col-lg-4">
                      <h6> Commission</h6>
                      <div className="ceateTransport">
                        <select
                          value={state.commission}
                          name="commission"
                          onChange={handleChange}
                        >
                          <option value="">Select Commission</option>
                          {commission?.map((item) => (
                            <option value={item.id}>
                              {item.commission_name_en}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group col-lg-4">
                      <h6>Commission Value</h6>
                      <input
                        type="number"
                        className="w-full"
                        value={state.commission_value}
                        name="commission_value"
                        onChange={handleChange}
                      />
                    </div>
                    {/* <div className="form-group col-lg-3">
                      <h6> Commission Currency</h6>
                      <div className="ceateTransport">
                        <select
                          value={state.brand}
                          name="brand"
                          onChange={handleChange}
                        >
                          <option value="">Select Brand</option>
                          {brands?.map((item) => (
                            <option value={item.brand_id}>
                              {item.Brand_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}
                    <div className="form-group col-lg-4 shipToToggle">
                      <h6>Commission Currency</h6>
                      <label
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "10px",
                        }}
                        className="toggleSwitch large"
                      >
                        <input
                          type="checkbox"
                          checked={state.Commission_Currency === "THB"}
                          onChange={handleChange}
                          name="Commission_Currency"
                        />
                        <span>
                          <span>FX</span>
                          <span> THB</span>
                        </span>
                        <a> </a>
                      </label>
                    </div>
                    <div className="form-group col-lg-12">
                      <h6>Address</h6>
                      <textarea
                        name="consignee_address"
                        className="border-2 rounded-md border-[#203764] w-full"
                        onChange={handleChange}
                        value={state.consignee_address}
                      />
                    </div>

                    <h6
                      className="mt-4"
                      style={{
                        fontWeight: "600",
                        marginBottom: "10px",
                        fontSize: "20px",
                      }}
                    >
                      Notify :
                    </h6>

                    <div className="form-group col-lg-6">
                      <h6> Name</h6>

                      <input
                        type="text"
                        className="form-control"
                        value={state.notify_name}
                        name="notify_name"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <h6>Tax Number</h6>
                      <input
                        type="text"
                        className="form-control"
                        value={state.notify_tax_number}
                        name="notify_tax_number"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <h6> Email</h6>
                      <input
                        type="email"
                        className="form-control"
                        value={state.notify_email}
                        name="notify_email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-6">
                      <h6> Phone Number</h6>
                      <input
                        type="text"
                        className="form-control"
                        value={state.notify_phone}
                        name="notify_phone"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-lg-12">
                      <h6>Address</h6>
                      <textarea
                        className="border-2 rounded-md border-[#203764] w-full"
                        value={state.notify_address}
                        name="notify_address"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="card-footer text-center">
            <button className="btn btn-primary" onClick={update} type="button">
              {from?.consignee_id ? "Update" : "Create"}
            </button>
            <Link className="btn btn-danger" to="/shipToNew">
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddShipTo;
