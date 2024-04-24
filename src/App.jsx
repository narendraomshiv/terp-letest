import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { IsLoginAuthenticateContext } from "./Contexts/LoginContext";
import PrivateRoute from "./PrivateRoute";
import Asll from "./components/Asl/Asll";
import AddClient from "./components/ClientManageMent/AddClient";
import AddShipTo from "./components/ClientManageMent/AddShipTo";
import Client from "./components/ClientManageMent/Client";
import ClientNew from "./components/ClientManageMent/ClientNew";
import CreateClient from "./components/ClientManageMent/CreateClient";
import EditClient from "./components/ClientManageMent/EditClient";
import ShipTo from "./components/ClientManageMent/ShipTo";
import ShipToNew from "./components/ClientManageMent/ShipToNew";
import Footer from "./components/Footer/Footer";
import Inventory from "./components/Inventory/Inventory";
import Language from "./components/Language";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Claim from "./components/Orders/Claim";
import ClaimDetails from "./components/Orders/ClaimDetails";
import CreateQutoation from "./components/Orders/CreateQutoation";
import Invoice from "./components/Orders/Invoice";
import InvoiceDetails from "./components/Orders/InvoiceDetails";
import Operation from "./components/Orders/Operation";
import OperationDetails from "./components/Orders/OperationDetails";
import Quotation from "./components/Orders/Quotation";
import UpdateOperation from "./components/Orders/UpdateOperation";
import CreateOrder from "./components/Orders/order/CreateOrder";
import Orders from "./components/Orders/order/list";
import { OrderPdfView } from "./components/Orders/order/pdfView";

import AddPacking from "./components/Packing/AddPacking";
import Hpl from "./components/Packing/Hpl";
import HplDetails from "./components/Packing/HplDetails";
import HplNew from "./components/Packing/HplNew";
import Packing from "./components/Packing/Packing";
import EanPacking from "./components/Packing/Packing";
import PackingDetails from "./components/Packing/PackingDetails";
import PackingNew from "./components/Packing/PackingNew";
import NewEanPacking from "./components/Packing/newEanPacking";
import CreatePurchaseOrder from "./components/PurchaseOrder/CreatePurchaseOrder";
import PurchaseOrder from "./components/PurchaseOrder/PurchaseOrder";
import Receiving from "./components/Receiving/Receiving";
import Acceptreceiving from "./components/Receiving/acceptReceving";
import AddAirline from "./components/Setup/AirlineManageMent/AddAirline";
import AirlineNew from "./components/Setup/AirlineManageMent/AirlineNew";
import AirportCreate from "./components/Setup/AirportManagement/AirportCreate";
import AirportNew from "./components/Setup/AirportManagement/AirportNew";
import AddBank from "./components/Setup/Bank/AddBank";
import BankNew from "./components/Setup/Bank/BankNew";
import UpdateBank from "./components/Setup/Bank/UpdateBank";
import BoxesNew from "./components/Setup/Boxes/BoxesNew";
import CreateBoxNew from "./components/Setup/Boxes/CreateBoxNew";
import UpdateBox from "./components/Setup/Boxes/UpdateBox";
import ClearanceNew from "./components/Setup/ClearanceManagement/ClearanceNew";
import UpdateClearanceNew from "./components/Setup/ClearanceManagement/UpdateClearanceNew";
import AddCurrency from "./components/Setup/CurrencyManageMent/AddCurrency";
import CurrencyNew from "./components/Setup/CurrencyManageMent/CurrencyNew";
import UpdateCurrency from "./components/Setup/CurrencyManageMent/UpdateCurrency";
import AddEan from "./components/Setup/Ean/AddEan";
import EanNew from "./components/Setup/Ean/EanNew";
import UpdateEan from "./components/Setup/Ean/UpdateEan";
import AddExtra from "./components/Setup/ExtraManageMent/AddExtra";
import Extra from "./components/Setup/ExtraManageMent/Extra";
import FreightMangement from "./components/Setup/FreightMangeMent/FreightMangement";
import FreightNew from "./components/Setup/FreightMangeMent/FreightNew";
import UpdateFreight from "./components/Setup/FreightMangeMent/UpdateFreight";
import Hourly from "./components/Setup/HourlyRate/Hourly";
import UpdateHourly from "./components/Setup/HourlyRate/updateHourly";
import AddItf from "./components/Setup/Itf/AddItf";
import Itf from "./components/Setup/Itf/Itf";
import ItfNew from "./components/Setup/Itf/ItfNew";
import CreateLocation from "./components/Setup/Location/CreateLocation";
import Location from "./components/Setup/Location/Location";
import UpdateLocation from "./components/Setup/Location/UpdateLocation";
import CreatePackagingNew from "./components/Setup/Packaging/CreatePackagingNew";
import PackagingUpdate from "./components/Setup/Packaging/EditPackaging";
import PackagingCreate from "./components/Setup/Packaging/PackagingCreate";
import PackagingNew from "./components/Setup/Packaging/PackagingNew";
import UpdatePackaging from "./components/Setup/Packaging/UpdatePackaging";
import AddPallet from "./components/Setup/Pallets/AddPallet";
import EditPallet from "./components/Setup/Pallets/EditPalet";
import Pallet from "./components/Setup/Pallets/Pallet";
import ProduceCreateNew from "./components/Setup/Produce/ProduceCreateNew";
import ProduceNew from "./components/Setup/Produce/ProduceNew";
import UpdateProduce from "./components/Setup/Produce/UpdateProduce";
import TransportNew from "./components/Setup/TransportManagement/TransportNew";
import UpdateTransport from "./components/Setup/TransportManagement/UpdateTransport";
import UnitCreate from "./components/Setup/UnitCount/CreateUnit";
import EditUnit from "./components/Setup/UnitCount/EditUnit";
import UnitCountNew from "./components/Setup/UnitCount/UnitCountNew";
import Sorting from "./components/Sorting/Sorting";
import NewSorting from "./components/Sorting/addSorting";
import AddVendor from "./components/VendorManagement/AddVendor";
import Vendor from "./components/VendorManagement/Vendor";
import EditExpenseItems from "./components/expenseItem/edit";
import { ExpenseItemList } from "./components/expenseItem/list";
import { AdjustEan } from "./components/operation/adjustEan";
import { OperationDashboard } from "./components/operation/dashboard";
import { EANAvailable } from "./components/operation/eanAvailable";
import { EanRepack } from "./components/operation/eanRepack";
import { OrderPackagingEdit } from "./components/operation/packaging/edit";
import { OrderPackagingList } from "./components/operation/packaging/list";
import DashboardNew from "./pages/DashboardNew";
import { Pdf_View } from "./components/Orders/order/Pdf_View";
import Users from "./components/Setup/user/Users";
import CreateUser from "./components/Setup/user/CreateUser";
import UserResetPass from "./components/Setup/user/UserResetPass";
import InventoryProduce from "./components/operation/InventoryProduce";
import InventoryPackaging from "./components/operation/InventoryPackaging";
import InventoryBoxes from "./components/operation/InventoryBoxes";
import UpdateUser from "./components/Setup/user/UpdateUser";
 
function App() {
  console.log('time:6:24,date:17/04/2024')
  const [isAuthenticate] = useContext(IsLoginAuthenticateContext);
  return (
    <>
      {isAuthenticate ? <Navbar /> : ""}
      <div
        style={{ minHeight: "calc(100vh - 148px)" }}
        className="px-2 py-4 main-content"
      >
        <div className="container-fluid">
          <Routes>
            {isAuthenticate ? (
              <Route element={<PrivateRoute isAuthenticate={isAuthenticate} />}>
                <Route path="/dashboard" element={<DashboardNew />} />
                <Route path="/" element={<DashboardNew />} />
                <Route path="/unit_create" element={<UnitCreate />} />
                <Route path="/unit_edit" element={<EditUnit />} />
                <Route path="/packaging_create" element={<PackagingCreate />} />
                <Route path="/packaging_update" element={<PackagingUpdate />} />
                <Route path="/airport_create" element={<AirportCreate />} />
                <Route path="/airport_update" element={<AirportCreate />} />
                <Route
                  path="/create_clearance"
                  element={<UpdateClearanceNew />}
                />
                <Route
                  path="/update_clearance"
                  element={<UpdateClearanceNew />}
                />
                <Route path="/freight" element={<FreightMangement />} />
                <Route path="/add_freight" element={<UpdateFreight />} />
                <Route path="/update_freight" element={<UpdateFreight />} />
                <Route path="/add_ean" element={<AddEan />} />
                <Route path="/update_ean" element={<UpdateEan />} />
                <Route path="/itf" element={<Itf />} />
                <Route path="/add_itf" element={<AddItf />} />
                <Route path="/edit_itf" element={<AddItf />} />
                <Route path="/add_currency" element={<AddCurrency />} />
                <Route path="/udpate_currency" element={<UpdateCurrency />} />
                <Route path="/add_airline" element={<AddAirline />} />
                <Route path="/update_airline" element={<AddAirline />} />
                <Route path="/add_bank" element={<AddBank />} />
                <Route path="/update_bank" element={<UpdateBank />} />
                <Route path="/pallet" element={<Pallet />} />
                <Route path="/add_pallet" element={<AddPallet />} />
                <Route path="/edit_pallet" element={<EditPallet />} />
                <Route path="/hourly" element={<Hourly />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/client" element={<Client />} />
                <Route path="/add_client" element={<AddClient />} />
                <Route path="/edit_client" element={<EditClient />} />
                <Route path="/vendor" element={<Vendor />} />
                <Route path="/add_vendor" element={<AddVendor />} />
                <Route path="/update_vendor" element={<AddVendor />} />
                <Route path="/packing" element={<Packing />} />
                <Route path="/packing_details" element={<PackingDetails />} />
                <Route path="/add_packing" element={<AddPacking />} />
                <Route path="/hpl" element={<Hpl />} />
                <Route path="/hpl_details" element={<HplDetails />} />
                <Route path="/purchase_orders" element={<PurchaseOrder />} />
                <Route path="/receiving" element={<Receiving />} />
                <Route path="/ship_to" element={<ShipTo />} />
                <Route path="/add_ship_to" element={<AddShipTo />} />
                <Route path="/edit_ship_to" element={<AddShipTo />} />
                <Route path="/quotation" element={<Quotation />} />
                <Route
                  path="/operation_details"
                  element={<OperationDetails />}
                />
                <Route path="/claim" element={<Claim />} />
                <Route path="/claim_details" element={<ClaimDetails />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/invoice_details" element={<InvoiceDetails />} />
                <Route path="/operations" element={<Operation />} />
                <Route path="/update_operation" element={<UpdateOperation />} />
                <Route path="/asl" element={<Asll />} />
                <Route path="/sorting" element={<Sorting />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/language" element={<Language />} />
                <Route path="/produceNew" element={<ProduceNew />} />
                <Route path="/unitCount" element={<UnitCountNew />} />
                <Route path="/boxes" element={<BoxesNew />} />
                <Route path="/packagingNew" element={<PackagingNew />} />
                <Route path="updatePackaging" element={<UpdatePackaging />} />
                <Route path="/airlineNew" element={<AirlineNew />} />
                <Route path="/airportNew" element={<AirportNew />} />
                <Route path="/bankNew" element={<BankNew />} />
                <Route path="/clearanceNew" element={<ClearanceNew />} />
                <Route path="/currencyNew" element={<CurrencyNew />} />
                <Route path="/eanNew" element={<EanNew />} />
                <Route path="/freightNew" element={<FreightNew />} />
                <Route path="/itfNew" element={<ItfNew />} />
                <Route path="/transportNew" element={<TransportNew />} />
                {/* <Route path="/dashboardNew" element={<Dashboard />} /> */}
                <Route
                  path="/produceCreateNew"
                  element={<ProduceCreateNew />}
                />
                <Route path="/createBoxNew" element={<CreateBoxNew />} />
                <Route path="/updateProduce" element={<UpdateProduce />} />
                <Route path="/updateBox" element={<UpdateBox />} />
                <Route
                  path="/createClearanceNew"
                  element={<UpdateClearanceNew />}
                />
                <Route
                  path="/updateClearanceNew"
                  element={<UpdateClearanceNew />}
                />
                <Route path="/extra" element={<Extra />} />
                <Route path="/addExtra" element={<AddExtra />} />
                <Route
                  path="/createPackagingNew"
                  element={<CreatePackagingNew />}
                />
                <Route path="/addTransport" element={<UpdateTransport />} />
                <Route path="/updateTransport" element={<UpdateTransport />} />
                <Route path="/location" element={<Location />} />
                <Route path="/createLocation" element={<CreateLocation />} />
                <Route path="/updateLocation" element={<UpdateLocation />} />
                <Route path="/clientNew" element={<ClientNew />} />
                <Route path="/createClient" element={<CreateClient />} />
                <Route path="/updateClient" element={<CreateClient />} />
                <Route path="/shipToNew" element={<ShipToNew />} />
                <Route path="/createOrder" element={<CreateOrder />} />
                <Route
                  path="/createPurchaseOrder"
                  element={<CreatePurchaseOrder />}
                />
                <Route
                  path="/updatePurchaseOrder"
                  element={<CreatePurchaseOrder />}
                />
                <Route path="/hplNew" element={<HplNew />} />
                <Route path="/createQutation" element={<CreateQutoation />} />
                <Route path="/createUser" element={<CreateUser />} />
                <Route path="/updateUser" element={<UpdateUser />} />

                <Route path="/userResetPass" element={<UserResetPass />} />
                
                <Route path="/packingNew" element={<PackingNew />} />
                <Route path="/updateHourly" element={<UpdateHourly />} />
                <Route path="/addHourly" element={<UpdateHourly />} />
                <Route path="/acceptReceiving" element={<Acceptreceiving />} />
                <Route path="/eanPacking" element={<EanPacking />} />
                <Route path="/newEanPacking" element={<NewEanPacking />} />
                <Route
                  path="/orderPackaging"
                  element={<OrderPackagingList />}
                />
                <Route
                  path="/orderPackagingEdit"
                  element={<OrderPackagingEdit />}
                />
                <Route path="/operation" element={<Operation />} />
                <Route path="/newSorting" element={<NewSorting />} />
                <Route
                  path="/dashboardOperation"
                  element={<OperationDashboard />}
                />
                <Route path="/eanAvailable" element={<EANAvailable />} />
                <Route path="/adjustEan" element={<AdjustEan />} />
                <Route path="/repackEan" element={<EanRepack />} />
                <Route path="/orderPdfView" element={<OrderPdfView />} />
                <Route path="/orderPdf_View" element={<Pdf_View />} />

                <Route path="/expenseItem" element={<ExpenseItemList />} />
                <Route path="/expenseItemEdit" element={<EditExpenseItems />} />
                <Route path="/user" element={<Users />} />
                <Route path="/inventoryProduce" element={<InventoryProduce />} />
                <Route path="/inventoryPackaging" element={<InventoryPackaging />} />
                <Route path="/inventoryBoxes" element={<InventoryBoxes />} />
              </Route>
            ) : (
              <>
                <Route path="/*" element={<Login />} />
              </>
            )}
          </Routes>
        </div>
      </div>

      {isAuthenticate && <Footer />}
      <ToastContainer autoClose={1000} theme="colored" />
    </>
  );
}

export default App;
