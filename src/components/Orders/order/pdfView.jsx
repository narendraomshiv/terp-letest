import { useId } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import logo from "../../../assets/logo.png";
import "./pdfView.css"
export const OrderPdfView = () => {
  const location = useLocation();
  const { from } = location.state || {};
  console.log(from);
  const id = useId();
  const { toPDF, targetRef } = usePDF({
    filename: `${id}.pdf`,
  });
  return (
    <>
      <button onClick={toPDF} type="button" className="btn btn-primary">
        Download
      </button>
      <div className="w-full">
        <div
          ref={targetRef}
          className="bg-white print:bg-none p-4 w-[95vw] h-[195mm]"
        >
          <table
            style={{
              width: "100%",
              "padding-bottom": "30px",
              background: "#b5b8bd1f",
            }}
          >
            <tbody>
              <tr>
                <td>
                <table
                    style={{ width: "100%", padding: "10px", display: "block" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            width: "10%",
                            padding: "0px 10px 0px 0px",
                            position: "relative",
                            top: "-40px",
                          }}
                        >
                          <img
                            style={{ height: "80px" }}
                            src={logo}
                            alt
                          />
                        </td>
                        <div style={{ display: "flex" }}>
                          <div style={{padding: "0px 10px 0px 0px" }}>
                            <h5 style={{ fontSize: 16, margin: "0px 0px" }}>Siam Eats Co.,Ltd</h5>
                            <p style={{ marginTop: 10 }}>16/18 Mu 11 Khlong Nueng, Khlong Luang</p>
                            <p style={{ marginTop: 10 }}>Tax ID 395561000010</p>
                          </div>
                          <div style={{ width: "70%" }}>
                            <h5
                              style={{
                                background: "#1b2245",
                                padding: 7,
                                color: "#fff",
                                textAlign: "center",
                                fontSize: 16,
                                margin: "0px 0px"
                              }}
                            >
                              ออเดอร์ /โหลด
                            </h5>
                            <table>
                              <tbody>
                                <tr>
                                  <td style={{ paddingRight: 20 }}>
                                    <div style={{ display: "flex", marginTop: 10 }}>
                                      <div style={{ marginRight: 10, width: 170 }}>
                                        <p>
                                          {" "}
                                          <strong>เลขออเดอร์ :</strong>{" "}
                                        </p>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10 }}>
                                      <div style={{ marginRight: 10, width: 170 }}>
                                        <p>
                                          {" "}
                                          <strong>AWB :</strong>{" "}
                                        </p>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10 }}>
                                      <div style={{ marginRight: 10, width: 170 }}>
                                        <p>
                                          {" "}
                                          <strong>รายละเอียด การสั่งซื้อ :</strong>{" "}
                                        </p>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{ display: "flex", marginTop: 10 }}>
                                      <div style={{ marginRight: 10, width: 170 }}>
                                        <p>
                                          {" "}
                                          <strong>วันที่ :</strong>{" "}
                                        </p>
                                      </div>
                                      <div>
                                        <p>12/2/2023</p>
                                      </div>
                                    </div>
                                    <div style={{ display: "flex", marginTop: 10 }}>
                                      <div style={{ marginRight: 10, width: 170 }}>
                                        <p>
                                          {" "}
                                          <strong>เวลาโหลด :</strong>{" "}
                                        </p>
                                      </div>
                                      <div>
                                        <p>12:00(pm)</p>
                                      </div>
                                    </div>
                                    <div
                                      style={{ display: "flex", marginTop: 10, visibility: "hidden" }}
                                    >
                                      <div style={{ marginRight: 10, width: 170 }}>
                                        <p>
                                          {" "}
                                          <strong>วันที่: </strong>{" "}
                                        </p>
                                      </div>
                                      <div>
                                        <p>O-202309045</p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <div style={{ marginTop: 15, height: 5, backgroundColor: "#1b2245" }}></div>
                          </div>
                        </div>

                      </tr>
                    </tbody>
                  </table>
                  <table
                    className="tableBorder"
                    style={{ width: "100%", padding: "10px" }}
                  >
                    <tbody>
                      <tr className="darkTh">
                        <th colSpan={4}>รายละเอียดสินค้า</th>
                        <th colSpan={3}>ออเดอร์</th>
                        <th colSpan={2}>โหลด</th>
                      </tr>
                      <tr>
                        <th>สินค้า</th>
                        <th>แพ็ค</th>
                        <th>แพ็ค</th>
                        <th>สติ๊กเกอร์</th>
                        <th>กก</th>
                        <th>กล่อง</th>
                        <th>แพ็ค/ชิ้น</th>
                        <th>กล่อง</th>
                        <th>พาเลท</th>
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>F 9.2 V</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>F 9.2 V</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
                      </tr>
                      <tr>
                        <td>พริกแดง / Chilli Red - 100g x 80</td>
                        <td>311</td>
                        <td>F 9.2 V</td>
                        <td>F 9.2 V</td>
                        <td>16.00</td>
                        <td>2</td>
                        <td>160</td>
                        <td />
                        <td />
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