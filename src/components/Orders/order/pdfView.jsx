import { useId } from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import axios from "axios";
import { API_BASE_URL } from "../../../Url/Url";
import logo from "../../../assets/logo.png";
import "./pdfView.css";
export const OrderPdfView = () => {
  const location = useLocation();
  const [companyAddress, setCompanyAddress] = useState("");
  const [data, setData] = useState("");
  const [totalDetails, setTotalDetails] = useState("");
  const [tableData, setTableData] = useState([]);
  const { from } = location.state || {};
  console.log(from);
  console.log(from.order_id);
  const pdfAllData = () => {
    axios
      .post(`${API_BASE_URL}/OrderPdfDetails`, {
        order_id: from?.order_id,
      })
      .then((response) => {
        console.log(response.data);
        setCompanyAddress(response?.data?.Company_Address);
        setData(response?.data?.data);

        setTableData(response?.data?.data);
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
    filename: `${from?.Order_number || "default"}.pdf`,
  });
  return (
    <>
      <button onClick={toPDF} type="button" className="btn btn-primary">
        Download
      </button>

      <div
        style={{ width: "900px" }}
        ref={targetRef}
        className="bg-white print:bg-none"
      >
        <table
          style={{
            width: "100%",
            paddingBottom: 30,
            background: "#b5b8bd1f",
            padding: "5px 20px",
            display: "block",
          }}
        >
          <tbody>
            <tr>
              <td>
                <table style={{ width: "100%", padding: 10, display: "block" }}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: 90,
                          padding: "0px 10px 0px 0px",
                          position: "relative",
                          top: "-38px",
                        }}
                      >
                        <img
                          style={{ height: 60 }}
                          src="../assets/img/newLOgo.png"
                          alt=""
                        />
                      </td>
                      <td style={{ width: "95%" }}>
                        <div style={{ display: "flex" }}>
                          <div
                            style={{ width: 300, padding: "0px 10px 0px 0px" }}
                          >
                            <h5 style={{ fontSize: 16, margin: "0px 0px" }}>
                              {companyAddress.Line_1}
                            </h5>
                            <p style={{ marginTop: 10 }}>
                              {companyAddress.Line_2}
                            </p>
                            <p style={{ marginTop: 10, whiteSpace: "wrap" }}>
                              {companyAddress.Line_3}
                            </p>
                            <p style={{ marginTop: 10, whiteSpace: "wrap" }}>
                              {companyAddress.Line_4}
                            </p>
                          </div>
                          <div style={{ width: "100%" }}>
                            <h5
                              style={{
                                background: "#1b2245",
                                color: "#fff",
                                textAlign: "center",
                                fontSize: 16,
                                paddingTop: "5px",
                                paddingBottom: "20px",
                                height: "30px",
                              }}
                            >
                              ออเดอร์ /โหลด
                            </h5>
                            <table>
                              <tbody>
                                <tr>
                                  <td style={{ paddingRight: 20 }}>
                                    <div
                                      style={{ display: "flex", marginTop: 5 }}
                                    >
                                      <div
                                        style={{ marginRight: 10, width: 100 }}
                                      >
                                        <p>
                                          {" "}
                                          <strong>เลขออเดอร์ #</strong>{" "}
                                        </p>
                                      </div>
                                      <div style={{ width: 10 }}>
                                        <strong>:</strong>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                    <div
                                      style={{ display: "flex", marginTop: 5 }}
                                    >
                                      <div
                                        style={{ marginRight: 10, width: 100 }}
                                      >
                                        <p>
                                          {" "}
                                          <strong>เลขสั่งซื้อ </strong>{" "}
                                        </p>
                                      </div>
                                      <div style={{ width: 10 }}>
                                        <strong>:</strong>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                    <div
                                      style={{ display: "flex", marginTop: 10 }}
                                    >
                                      <div
                                        style={{ marginRight: 10, width: 100 }}
                                      >
                                        <p>
                                          {" "}
                                          <strong>AWB</strong>{" "}
                                        </p>
                                      </div>
                                      <div style={{ width: 10 }}>
                                        <strong>:</strong>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      style={{ display: "flex", marginTop: 10 }}
                                    >
                                      <div
                                        style={{ marginRight: 10, width: 100 }}
                                      >
                                        <p>
                                          {" "}
                                          <strong>เลขออเดอร์</strong>{" "}
                                        </p>
                                      </div>
                                      <div style={{ width: 10 }}>
                                        <strong>:</strong>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                    <div
                                      style={{ display: "flex", marginTop: 10 }}
                                    >
                                      <div
                                        style={{ marginRight: 10, width: 100 }}
                                      >
                                        <p>
                                          {" "}
                                          <strong>เลขสั่งซื้อ</strong>{" "}
                                        </p>
                                      </div>
                                      <div style={{ width: 10 }}>
                                        <strong>:</strong>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        marginTop: 10,
                                        visibility: "hidden",
                                      }}
                                    >
                                      <div
                                        style={{ marginRight: 10, width: 100 }}
                                      >
                                        <p>
                                          {" "}
                                          <strong>เลขสั่งซื้อ </strong>{" "}
                                        </p>
                                      </div>
                                      <div style={{ width: 10 }}>
                                        <strong>:</strong>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div
                              style={{
                                marginTop: 15,
                                height: 5,
                                backgroundColor: "#1b2245",
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  className="tableBorder"
                  style={{ width: "100%", padding: 10 }}
                >
                  <tbody>
                    <tr className="darkTh">
                      <th colSpan={4}>รายละเอียดสินค้า</th>
                      <th colSpan={3}>ออเดอร์</th>
                      <th colSpan={2}>โหลด</th>
                    </tr>
                    <tr>
                      <th>Packing</th>
                      <th>Boxes</th>
                      <th>Brand</th>
                      <th>ITF</th>
                      <th>EAN</th>
                      <th>Net Weight</th>
                      <th>BOXES</th>
                      <th>empty1</th>
                      <th>Empty2</th>
                    </tr>

                    {tableData?.map((item) => {
                      return (
                        <tr>
                          <td>{item.Packaging}</td>
                          
                          <td>{item.Boxes1}</td>
                          <td>{item.Brand}</td>
                          <td>{item.itf}</td>
                          <td>{item.ean_weight}</td>
                          <td>{item.Net_Weight}</td>
                          <td>{item.Boxes2}</td>
                          <td />
                          <td />
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
