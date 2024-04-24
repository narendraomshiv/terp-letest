import { useId } from "react";
import { useLocation } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import logo from "../../../assets/logo.png";
import "./Pdf_View.css";
export const Pdf_View = () => {
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
      
         
            <div size="A4"
            
            ref={targetRef}
            style={{ background: "#fff",width:"900px",}}>
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
                                          Siam Eats Co.,Ltd. (0395561000010)
                                        </h5>
                                        <p style={{ marginTop: 2 }}>
                                          16/18 Mu 11 Khlong Nueng, Khlong Luang,
                                        </p>
                                        <p style={{ marginTop: 2 }}>
                                          Pathum Thani 12120 THAILAND
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
                                    padding: "5px 0px"
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
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
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
                                                    <p>O-202309045</p>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
                                                  >
                                                    <p>
                                                      {" "}
                                                      <strong>Date</strong>{" "}
                                                    </p>
                                                  </div>
                                                  <div style={{ width: 40 }}>
                                                    <strong>:</strong>
                                                  </div>
                                                  <div>
                                                    <p>12/6/2020</p>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
                                                  >
                                                    <p>
                                                      {" "}
                                                      <strong>AWB </strong>{" "}
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
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
                                                  >
                                                    <p>
                                                      {" "}
                                                      <strong>Bill To </strong>
                                                    </p>
                                                  </div>
                                                  <div style={{ width: 40 }}>
                                                    <strong>:</strong>
                                                  </div>
                                                  <div>
                                                    <p>xyz</p>
                                                  </div>
                                                </div>
                                              </div>
                                              <div style={{ width: "50%" }}>
                                                <div
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
                                                  >
                                                    <p>
                                                      {" "}
                                                      <strong>TT Ref</strong>
                                                    </p>
                                                  </div>
                                                  <div style={{ width: 40 }}>
                                                    <strong>:</strong>
                                                  </div>
                                                  <div>
                                                    <p>12/2/2023</p>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
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
                                                    <p>12:00(pm)</p>
                                                  </div>
                                                </div>
                                                <div
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
                                                  >
                                                    <p>
                                                      {" "}
                                                      <strong>Delivery By</strong>{" "}
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
                                                  style={{ display: "flex", marginTop: 2 }}
                                                >
                                                  <div
                                                    style={{ marginRight: 10, width: 100 }}
                                                  >
                                                    <p>
                                                      {" "}
                                                      <strong>Ship To </strong>
                                                    </p>
                                                  </div>
                                                  <div style={{ width: 40 }}>
                                                    <strong>:</strong>
                                                  </div>
                                                  <div>
                                                    <p>xyz</p>
                                                  </div>
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
                            borderTop: "4px solid rgb(0, 0, 0)"
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
                                        paddingRight: 20
                                      }}
                                    >
                                      Golden Farms Vegetables &amp; Fruits Trading LLC
                                      Office 43-44, Al Fahidi, Bur Dubai, Dubai, Dubai,
                                      United Arab Emirates, 211860 TRN: 100517855100003{" "}
                                    </p>
                                  </div>
                                  <div style={{ width: "50%" }}>
                                    <p style={{ fontSize: 12, whiteSpace: "normal" }}>
                                      Majid Al Futtaim Hypermarkets Georgia LLC Territory of
                                      Dighomi Educational and Experimental Farm 0131 Tbilisi
                                      Georgia
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
                              <th style={{ textAlign: "center", width: 85 }}>FOB (THB)</th>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>1</td>
                              <td>หน่อ ซี / Asparagus Baby - 100000</td>
                              <td style={{ textAlign: "right" }}>#011456787</td>
                              <td style={{ textAlign: "right" }}>20.00</td>
                              <td style={{ textAlign: "center" }}>Kg</td>
                              <td style={{ textAlign: "right" }}>2</td>
                              <td style={{ textAlign: "right" }}> 9,999,999.99</td>
                            </tr>
                          </tbody>
                        </table>
                        <table style={{ marginTop: 5, width: "100%" }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: 0 }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between"
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
                                        <p>280 Boxes / 26 Item</p>
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
                                        <p>55.00Kg</p>
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
                                        <p>55.00Kg</p>
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
                                        <p>55.00Kg</p>
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
                                        <p>99,999,999.99</p>
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
                                        <p>THB 92,989.40 T</p>
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
                                          width: 150
                                        }}
                                      >
                                        <p
                                          style={{
                                            color: "rgb(255, 255, 255)",
                                            textAlign: "center",
                                            padding: 2
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
                                          width: 150
                                        }}
                                      >
                                        <p
                                          style={{
                                            color: "rgb(255, 255, 255)",
                                            textAlign: "center",
                                            padding: 2
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
