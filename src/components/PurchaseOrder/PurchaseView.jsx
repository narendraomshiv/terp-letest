import React from 'react'

const PurchaseView = () => {
  return (
    <div>
      <div className="databaseTableSection pt-0">
        {/* End databaseTableSection */}
        <div className="top-space-search-reslute">
          <div className="tab-content p-4 pt-0 pb-0">
            <div className="tab-pane active" id="header" role="tabpanel">
              <div
                id="datatable_wrapper"
                className="information_dataTables dataTables_wrapper dt-bootstrap4 "
              >
                {/*---------------------------table data---------------------*/}
                <div className="d-flex exportPopupBtn" />
                <div className="grayBgColor p-4 pt-2 pb-2">
                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="font-weight-bolder mb-0 pt-2">
                        Purchase Order / View Form
                      </h6>
                      {/* <i class="mdi mdi-view-headline"></i> */}
                    </div>
                  </div>
                </div>
                {/* <div className="formCreate">
                  <form action="">
                    <div className="row">
                      <div className="form-group col-lg-4">
                        <h6>Code</h6>
                        <input
                          type="text"
                          id="name_en"
                          name="name_en"
                          className="form-control"
                          placeholder="nick name"
                          readOnly=""
                          defaultValue=""
                        />
                      </div>
                      <div className="form-group col-lg-4">
                        <h6>Create Date</h6>
                        <input
                          type="date"
                          id="name_en"
                          name="name_en"
                          className="form-control"
                          placeholder="icicc "
                          defaultValue=""
                          readOnly=""
                        />
                      </div>
                      <div className="form-group col-lg-3">
                        <h6>Create By</h6>
                        <input
                          type="text"
                          id="name_en"
                          name="name_en"
                          className="form-control"
                          placeholder="Mr. Bean"
                          defaultValue=""
                          readOnly=""
                        />
                      </div>
                    </div>
                  </form>
                </div> */}
                <div className=" mt-5 borderBottompurchase">
                  <div className='row'>

                  <div className="col-lg-3">
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                        Code <span>:</span>{" "}
                        </strong>
                      </div>
                      <div>
                        <p>#1234()</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                        Create By <span>:</span>{" "}
                        </strong>
                      </div>
                      <div>
                        <p>Mr Henary</p>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>

                <div className="row purchaseViewRow" >
                  <div className="col-lg-3">
                    <h6>Vendor Info</h6>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Name <span>:</span>{" "}
                        </strong>
                      </div>
                      <div>
                        <p>เจ๊ไก่ลำใย()</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Address <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> ลานฤดูกาลล็อค28 คลองหนึ่ง คลองหลวง ปทุมธานี 12120</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Contact <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> 0929826155 </p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Line ID <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> #1324334 </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h6>Order History</h6>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Create Date <span>:</span>{" "}
                        </strong>
                      </div>
                      <div>
                        <p>12/2/2023</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Delivery Date <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> 12/3/2022</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h6>Payment</h6>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Totals<span>:</span>{" "}
                        </strong>
                      </div>
                      <div>
                        <p>12/2/2023</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Bank Name <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> 12/3/2022</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Account Name <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> 12/3/2022</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Account Number <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> 12/3/2022</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <h6>Invoice Details</h6>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Invoice Number <span>:</span>{" "}
                        </strong>
                      </div>
                      <div>
                        <p>12/2/2023</p>
                      </div>
                    </div>
                    <div className="parentPurchaseView">
                      <div className="me-3">
                        <strong>
                          Invoice date <span>:</span>
                        </strong>
                      </div>
                      <div>
                        <p> 12/3/2022</p>
                      </div>
                    </div>
                    <div className="invoicePopup mt-3">
                      {/* Button trigger modal */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Invoice Details
                      </button>
                      {/* Modal */}
                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Invoice Details (PO: PO202310001)
                              </h1>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              > <i class="mdi mdi-close"></i></button>
                            </div>
                            <div className="modal-body">
                              <div>
                                <label htmlFor="">Invoice Number</label>
                              </div>
                              <div>
                                <input type="number" />
                              </div>
                              <div className="mt-3">
                                <label htmlFor="">Invoice Date</label>
                              </div>
                              <div>
                                <input type="date" />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-primary">
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <h5 className='itemInfo'>Items Info :</h5>
                </div>
                <div className="row">
                  <div className="tab-pane active" id="header" role="tabpanel">
                    <div
                      id="datatable_wrapper"
                      className="information_dataTables dataTables_wrapper dt-bootstrap4 table-responsive"
                    >
                      {/*---------------------------table data---------------------*/}
                      <div className="d-flex exportPopupBtn" />
                      <table
                        id="example"
                        className="display table table-hover table-striped borderTerpProduce"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th> Barcode</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Price</th>
                            <th>VAT</th>
                            <th>Total</th>
                            <th>WHT</th>
                            <th>Crate</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            className="rowCursorPointer"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                          >
                            <td scope="row">1</td>
                            <td>Produce</td>
                            <td>ลำไย / Longan</td>
                            <td>PO20231000101</td>
                            <td>140.00 </td>
                            <td> กก/KG</td>
                            <td>THB 35.00</td>
                            <td>0:00</td>
                            <td>THB 4,900.00</td>
                            <td>0:00</td>
                            <td>0</td>
                          </tr>
                        </tbody>
                      </table>
                      {/*--------------------------- table data end--------------------------------*/}
                    </div>
                    {/* <div className="row selectPurchase">
                      <div className="col-lg-3">
                        <select name="" id="">
                          <option value="">Pending</option>
                          <option value="">Picked Up</option>
                          <option value="">Delivery</option>
                        </select>
                      </div>
                    </div> */}
                  </div>
                </div>
                {/*--------------------------- table data end--------------------------------*/}
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" type="submit" name="signup">
                Create
              </button>
              <a className="btn btn-danger" href="#">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PurchaseView
