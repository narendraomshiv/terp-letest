import { useEffect, useId, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import logo from "../../../assets/logo.png";
import axios from "axios";
import { API_BASE_URL } from "../../../Url/Url";
import "./Pdf_View.css";
export const Pdf_View = () => {
  const [companyAddress, setCompanyAddress] = useState("");
  const [data, setData] = useState("");
  const [totalDetails, setTotalDetails] = useState("");
  const [tableData, setTableData] = useState([]);
  const location = useLocation();
  const { from } = location.state || {};
  console.log(from.order_id);
  const pdfAllData = () => {
    axios
      .post(`${API_BASE_URL}/GetOrderPdfDetails`, {
        order_id: from?.order_id,
      })
      .then((response) => {
        console.log(response.data);
        setCompanyAddress(response?.data?.Company_Address);
        setData(response?.data?.data);

        setTableData(response?.data?.tableData);
        setTotalDetails(response?.data?.totalDetails);
        
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

  useEffect(() => {
    pdfAllData();
  }, []);

  const id = useId();
  const { toPDF, targetRef } = usePDF({
    filename: `${from?.Order_number || 'default'}.pdf`,
  });
  
  return (
    <>
      <button onClick={toPDF} type="button" className="btn btn-primary">
        Download
      </button>

      <div
        size="A4"
        ref={targetRef}
        style={{ background: "#fff", width: "900px" }}
      >
        <div>
          <table style={{ width: "100%", padding: "20px", display: "block" }}>
            <tbody>
              <tr>
                <td>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr style={{ width: "100%" }}>
                        <td style={{ padding: 0, width: "100%" }}>
                          <div style={{ display: "flex", width: "100%" }}>
                            <div style={{ width: 115 }}>
                              <img alt="" style={{ height: 80 }} />
                            </div>
                            <div>
                              <div>
                                <div style={{ padding: "0px 2px 0px 0px" }}>
                                  <h5 style={{ fontSize: 13, margin: 0 }}>
                                    {companyAddress?.Line_1}
                                  </h5>
                                  <p style={{ marginTop: 2 }}>
                                    {companyAddress?.Line_2}
                                  </p>
                                  <p style={{ marginTop: 2 }}>
                                    {companyAddress?.Line_3}
                                  </p>
                                  <p style={{ marginTop: 2 }}>
                                    {companyAddress?.Line_4}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: "2px 2px 2px 0px" }}>
                          <h3
                            style={{
                              margin: 0,
                              textAlign: "center",
                              fontSize: 14,
                              borderTop: "4px solid rgb(0, 0, 0)",
                              borderBottom: "4px solid rgb(0, 0, 0)",
                              padding: "5px 0px",
                            }}
                          >
                            Packing List / Invoice
                          </h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: "100%", padding: 5 }}>
                    <tbody>
                      <tr>
                        <td style={{ paddingLeft: 0 }}>
                          <div style={{ display: "flex" }}>
                            <div style={{ width: "100%" }}>
                              <table style={{ width: "100%" }}>
                                <tbody>
                                  <tr>
                                    <td style={{ paddingLeft: 0 }}>
                                      <div style={{ display: "flex" }}>
                                        <div style={{ width: "50%" }}>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>Order</strong>
                                              </p>
                                            </div>
                                            <div style={{ width: 40 }}>
                                              <strong>:</strong>
                                            </div>
                                            <div>
                                              <p>{data?.order_number}</p>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>
                                                  Loading Date
                                                </strong>{" "}
                                              </p>
                                            </div>
                                            <div style={{ width: 40 }}>
                                              <strong>:</strong>
                                            </div>
                                            <div>
                                              <p>{data?.Load_date}</p>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>
                                                  Shipment Ref{" "}
                                                </strong>{" "}
                                              </p>
                                            </div>
                                            <div style={{ width: 40 }}>
                                              <strong>:</strong>
                                            </div>
                                            <div>
                                              <p>{data?.Shipment_Ref}</p>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>Bill To </strong>
                                              </p>
                                            </div>
                                            {/* <div style={{ width: 40 }}>
                                                    <strong>:</strong>
                                                  </div>
                                                  <div>
                                                    <p>xyz</p>
                                                  </div> */}
                                          </div>
                                        </div>
                                        <div style={{ width: "50%" }}>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>AWB/BL</strong>
                                              </p>
                                            </div>
                                            <div style={{ width: 40 }}>
                                              <strong>:</strong>
                                            </div>
                                            <div>
                                              <p>{data?.AWB}</p>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>Ship Date</strong>
                                              </p>
                                            </div>
                                            <div style={{ width: 40 }}>
                                              <strong>:</strong>
                                            </div>
                                            <div>
                                              <p>{data?.Ship_date}</p>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>
                                                  Delivery By
                                                </strong>{" "}
                                              </p>
                                            </div>
                                            <div style={{ width: 40 }}>
                                              <strong>:</strong>
                                            </div>
                                            <div>
                                              <p>O-202309045</p>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              marginTop: 2,
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginRight: 10,
                                                width: 100,
                                              }}
                                            >
                                              <p>
                                                {" "}
                                                <strong>Ship To </strong>
                                              </p>
                                            </div>
                                            {/* <div style={{ width: 40 }}>
                                                    <strong>:</strong>
                                                  </div>
                                                  <div>
                                                    <p>xyz</p>
                                                  </div> */}
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    style={{
                      width: "100%",
                      marginBottom: 5,
                      marginTop: 5,
                      borderTop: "4px solid rgb(0, 0, 0)",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ paddingLeft: 0 }}>
                          <div style={{ display: "flex", padding: "5px 0px" }}>
                            <div style={{ width: "50%", paddingRight: 5 }}>
                              <p
                                style={{
                                  fontSize: 12,
                                  whiteSpace: "normal",
                                  paddingRight: 20,
                                }}
                              >
                                {data?.client}
                              </p>
                            </div>
                            <div style={{ width: "50%" }}>
                              <p style={{ fontSize: 12, whiteSpace: "normal" }}>
                                {data?.consignee}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    className="tableBorder"
                    style={{ width: "100%", padding: 2, marginTop: 2 }}
                  >
                    <tbody>
                      <tr className="darkTh">
                        <th style={{ textAlign: "center", width: 20 }}>#</th>
                        <th style={{ textAlign: "center" }}>Item Detail </th>
                        <th style={{ textAlign: "center" }}>HS Code</th>
                        <th style={{ textAlign: "center", width: 60 }}>QTY</th>
                        <th style={{ width: 60, textAlign: "center" }}>UNIT</th>
                        <th style={{ textAlign: "center", width: 60 }}>BOX</th>
                        <th style={{ textAlign: "center", width: 85 }}>
                          FOB (THB)
                        </th>
                      </tr>

                      {tableData?.map((item, i) => {
                        return (
                          <tr>
                            <td style={{ textAlign: "center" }}>{i + 1}</td>
                            <td>{item.ITF}</td>
                            <td style={{ textAlign: "right" }}>
                              {item.HS_CODE}
                            </td>
                            <td style={{ textAlign: "right" }}>
                              {item.Net_Weight}
                            </td>
                            <td style={{ textAlign: "center" }}>{item.Unit}</td>
                            <td style={{ textAlign: "right" }}>{item.Boxes}</td>
                            <td style={{ textAlign: "right" }}> {item.FOB}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <table style={{ marginTop: 5, width: "100%" }}>
                    <tbody>
                      <tr>
                        <td style={{ padding: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Total </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 30 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>{totalDetails.Total_Box}  Boxes /{totalDetails.Items}  Item </p>
                                </div>
                              </div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Total Net Weight </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 30 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>{totalDetails.Net_Weight}</p>
                                </div>
                              </div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Total Gross Weight </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 30 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>{totalDetails.Gross_weight}</p>
                                </div>
                              </div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Total CBM </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 30 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>{totalDetails.CBM}</p>
                                </div>
                              </div>
                            </div>
                            <div style={{ marginLeft: 24 }}>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Total Packages</strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 20 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>0</p>
                                </div>
                              </div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>FOB (THB) </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 20 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>{totalDetails.FOB}</p>
                                </div>
                              </div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Air Freight </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 20 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>{totalDetails.Freight}</p>
                                </div>
                              </div>
                              <div style={{ display: "flex", marginTop: 2 }}>
                                <div style={{ marginRight: 10, width: 130 }}>
                                  <p>
                                    {" "}
                                    <strong>Exchange Rate </strong>{" "}
                                  </p>
                                </div>
                                <div style={{ width: 20 }}>
                                  <strong>:</strong>
                                </div>
                                <div>
                                  <p>THB 33.0000</p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div style={{ marginTop: 2 }}>
                                <div
                                  style={{
                                    backgroundColor: "rgb(27, 34, 69)",
                                    width: 150,
                                  }}
                                >
                                  <p
                                    style={{
                                      color: "rgb(255, 255, 255)",
                                      textAlign: "center",
                                      padding: 2,
                                    }}
                                  >
                                    <strong>Total THB</strong>
                                  </p>
                                </div>
                                <div>
                                  <p style={{ textAlign: "right" }}>1234678</p>
                                </div>
                              </div>
                              <div style={{ marginTop: 2 }}>
                                <div
                                  style={{
                                    backgroundColor: "rgb(27, 34, 69)",
                                    width: 150,
                                  }}
                                >
                                  <p
                                    style={{
                                      color: "rgb(255, 255, 255)",
                                      textAlign: "center",
                                      padding: 2,
                                    }}
                                  >
                                    <strong>TOTAL USD</strong>
                                  </p>
                                </div>
                                <div>
                                  <p style={{ textAlign: "right" }}>1234678</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
