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
    filename: `${from?.Order_number || "default"} Operations ${formatDate(new Date())}.pdf`,
  });
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0'); // Adds leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, add 1
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  
  return (
    <>
      <button onClick={toPDF} type="button" className="btn btn-primary">
        Download
      </button>

      <div
        style={{ width: "990px" }}
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
                      <td style={{ width: "95%",padding:"0px" }}>
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
                                paddingTop: "0px",
                                paddingBottom: "20px",
                                
                              }}
                            >
                              ออเดอร์ /โหลด
                            </h5>
                            <table>
                              <tbody>
                                <tr>
                                  <td style={{ padding:"0px 20px 15px 0px", }}>
                                    <div
                                      style={{ display: "flex",}}
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
                                      style={{ display: "flex", marginTop: 0 }}
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
                                      style={{ display: "flex", marginTop: 0 }}
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
                                  <td style={{padding:"0px"}}>
                                    <div
                                      style={{ display: "flex", marginTop: 0 }}
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
                                      style={{ display: "flex", marginTop: 0 }}
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
                                marginTop: 0,
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
                      <th colSpan={4}style={{paddingTop:"0px",paddingBottom:"15px"}}>รายละเอียดสินค้า</th>
                      <th colSpan={3} style={{paddingTop:"0px",paddingBottom:"15px"}}>ออเดอร์</th>
                      <th colSpan={2} style={{paddingTop:"0px",paddingBottom:"15px"}}>โหลด</th>
                    </tr>
                    <tr>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>Packing</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>Boxes</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>Brand</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>ITF</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>EAN</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>Net Weight</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>BOXES</th>
                      <th style={{paddingTop:"0px",paddingBottom:"15px"}}>empty1</th>
                      <th  style={{paddingTop:"0px",paddingBottom:"15px"}}>Empty2</th>
                    </tr>

                    {tableData?.map((item) => {
                      return (
                        <tr>
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.Packaging}</td>
                          
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.Boxes1}</td>
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.Brand}</td>
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.itf}</td>
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.ean_weight}</td>
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.Net_Weight}</td>
                          <td style={{paddingTop:"0px",paddingBottom:"15px"}}>{item.Boxes2}</td>
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
