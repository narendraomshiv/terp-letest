import React from 'react'

const OrderView = () => {
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
                                                 Orders / View Form
                                            </h6>
                                        </div>
                                    </div>
                                </div>

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

                                <div className="row purchaseViewRow mt-4" >
                                    <div className="col-lg-4">
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Client  <span>:</span>{" "}
                                                </strong>
                                            </div>
                                            <div>
                                                <p>Retaj Kuwait Company For Vegetables and Fruits)</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Ship To <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p>Retaj Kuwait Company For Vegetables and Fruits</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Airport <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> Kuwait - Kuwait [KWI] </p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Airline <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> Emirates [EK via HKT] </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">

                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Currency <span>:</span>{" "}
                                                </strong>
                                            </div>
                                            <div>
                                                <p>USD</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    EX Rate <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> 36:00</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Markup Rate <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> 15</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Rebate <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> 00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">

                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Clearance<span>:</span>{" "}
                                                </strong>
                                            </div>
                                            <div>
                                                <p>hti</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Palletized <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> No</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    CO from Chamber <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> No</p>
                                            </div>
                                        </div>
                                        <div className="parentPurchaseView">
                                            <div className="me-3">
                                                <strong>
                                                    Ship Date <span>:</span>
                                                </strong>
                                            </div>
                                            <div>
                                                <p> 12/3/2022</p>
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
                                                        <th>ITF</th>
                                                        <th>Quantity</th>
                                                        <th> Unit</th>
                                                        <th>Number of Box</th>
                                                        <th>NW</th>
                                                        <th> Unit Price</th>
                                                        <th>Profit</th>

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

                                                    </tr>
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

                                                    </tr>
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

                                                    </tr>
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

                                                    </tr>
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

                                                    </tr>


                                                </tbody>
                                            </table>
                                            <div className="row">
                                                <div className="col-lg-3">
                                                    <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                                Total Box<span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 365</p>
                                                        </div>
                                                    </div>
                                                    <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Total Freight<span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 154,050.10</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Total NW <span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 1440</p>
                                                        </div>
                                                    </div>
                                                    <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Total FOB<span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p>212610.07</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Total GW<span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p>1730g</p>
                                                        </div>
                                                    </div>
                                                    <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Profit before Rebate <span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 154,050.10</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Total CBM <span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 8.6</p>
                                                        </div>
                                                    </div>
                                                    <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Profit after Rebate<span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 154,050.10</p>
                                                        </div>
                                                    </div>
                                                    <div className="parentPurchaseView">
                                                        <div className="me-3">
                                                            <strong>
                                                            Profit(%)<span>:</span>
                                                            </strong>
                                                        </div>
                                                        <div>
                                                            <p> 20.81</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default OrderView
