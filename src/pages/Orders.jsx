// import { useEffect } from "react";
// import { useState } from "react";
// import axios from "axios";
// import { backendUrl, currency, currencyCode } from "../App";
// import { toast } from "react-toastify";
// import { assets } from "../assets/assets.js";

// const Orders = ({ token }) => {
//   const [orders, setOrders] = useState([]);

//   const fetchAllOrders = async () => {
//     if (!token) {
//       return null;
//     }
//     try {
//       const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
//       if (response.data.success) {
//         setOrders(response.data.orders);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const statusHandler = async (event, orderId) => {
//     try {
//       const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } });
//       if (response.data.success) {
//         await fetchAllOrders();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(response.data.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllOrders();
//   }, [token]);

//   return (
//     <div>
//       <h3>Order Page</h3>
//       <div>
//         {orders.map((order, index) => (
//           <div
//             className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
//             key={index}
//           >
//             <img className="w-12" src={assets.parcel_icon} alt="" />

//             {/* 1 Section */}
//             <div>
//               <div>
//                 {order.items.map((item, index) => {
//                   console.log("Items  = ", item);

//                   if (index === order.items.length - 1) {
//                     return (
//                       <div key={index}>
//                         <p>
//                           Name: {item.name} x {item.quantity}
//                         </p>
//                         {item.size && <p>Size: {item.size}</p>}
//                       </div>
//                     );
//                   } else {
//                     return (
//                       <div className="pb-2" key={index}>
//                         <p>
//                           Name: {item.name} x {item.quantity}
//                         </p>
//                         {item.size && <p>Size: {item.size}</p>}
//                         {item.formData && (
//                           <div>
//                             <p>Certificate: {item.formData.certificate}</p>
//                             <p>Language: {item.formData.language}</p>
//                             <p>Signature Line: {item.formData.signature_line}</p>
//                             <p>Signature Line: {item.formData.signature_line}</p>
//                             {item.formData.transfer_signature && <p>Transfer Signature: {item.formData.transfer_signature}</p>}
//                             <p>Witness: {item.formData.witness}</p>
//                             <p>Husband Name: {item.formData.husband_name}</p>
//                             <p>Wife Name: {item.formData.wife_name}</p>
//                             <p>Name Order: {item.formData.name_order}</p>
//                             <p>Gregorian Date: {item.formData.gregorian_date}</p>
//                             <p>Islamic Date: {item.formData.islamic_date}</p>
//                             <p>City: {item.formData.city}</p>
//                             {item.formData.mahr && <p>Mahr: {item.formData.mahr}</p>}
//                             {item.formData.customization.length > 0 && <p>Extra Customization: {item.formData.customization.join(", ")}</p>}
//                             <p>Note: {item.formData.note}</p>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   }
//                 })}
//               </div>
//               {console.log("Order = ", order)}
//               <p className="mt-3 mb-2 font-medium">Customer Name: {order.address.firstName + " " + order.address.lastName}</p>
//               <div>
//                 <p>Street: {order.address.street + ","}</p>
//                 <p>City, State, Country, ZipCode: {order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
//               </div>
//               <p>Phone: {order.address.phone}</p>
//             </div>
//             {/* 2 Section */}
//             <div>
//               <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
//               <p className="mt-3">Method : {order.paymentMethod}</p>
//               <p>Payment : {order.payment ? "Done" : "Pending"}</p>
//               <p>Date : {new Date(order.date).toLocaleDateString()}</p>
//             </div>
//             {/* 3 Section */}
//             <p className="text-sm sm:text-[15px]">
//               {currency + " "}
//               {order.amount}
//               {currencyCode}
//             </p>
//             {/* 4 Section */}
//             <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-medium">
//               <option value="Order Placed">Order Placed</option>
//               <option value="Packing">Packing</option>
//               <option value="Shipped">Shipped</option>
//               <option value="Out for delivery">Out for delivery</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Orders;
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency, currencyCode } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + "/api/order/status", { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-0 sm:p-4">
      <h3 className="text-lg font-semibold mb-4">Orders</h3>
      <div className="space-y-4">
        {orders.map((order, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border rounded-lg shadow-sm bg-white overflow-hidden">
              {/* Summary Section */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 cursor-pointer hover:bg-gray-50" onClick={() => setOpenIndex(isOpen ? null : index)}>
                <div className="flex items-start sm:items-center space-x-3">
                  <img className="w-10 h-10" src={assets.parcel_icon} alt="" />
                  <div className="pr-3">
                    <p className="text-sm sm:text-base font-medium text-gray-800">{order.items.map((item) => item.name).join(", ")}</p>
                    <p className="text-sm text-gray-500">
                      {order.items.length} items — {currency} {order.amount} {currencyCode}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 text-sm text-gray-600">
                  <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                  <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Expandable Details */}
              {isOpen && (
                <div className="px-4 pb-4 space-y-4 text-sm text-gray-700 border-t">
                  {/* Items Details */}
                  <div>
                    <h4 className="font-semibold mb-2 mt-4">Products</h4>
                    {order.items.map((item, i) => (
                      <div key={i} className="mb-3 p-3 border rounded-md bg-gray-50">
                        <div className="space-y-1">
                          <div className="font-medium sm:flex sm:items-center sm:justify-between">
                            <p>
                              {item.name} × {item.quantity}
                            </p>
                            <p className="mt-1 sm:mt-0">
                              {currency} {item.price} {currencyCode}
                            </p>
                          </div>
                          {item.size && <p>Size: {item.size}</p>}
                        </div>

                        {item.formData && (
                          <div className="mt-2 ml-3 space-y-1 text-gray-600">
                            <p>Certificate: {item.formData.certificate}</p>
                            <p>Language: {item.formData.language}</p>
                            <p>Signature Line: {item.formData.signature_line}</p>
                            {item.formData.transfer_signature && <p>Transfer Signature: {item.formData.transfer_signature}</p>}
                            <p>Witness: {item.formData.witness}</p>
                            <p>Husband Name: {item.formData.husband_name}</p>
                            <p>Wife Name: {item.formData.wife_name}</p>
                            <p>Name Order: {item.formData.name_order}</p>
                            <p>Gregorian Date: {item.formData.gregorian_date}</p>
                            <p>Islamic Date: {item.formData.islamic_date}</p>
                            <p>City: {item.formData.city}</p>
                            {item.formData.mahr && <p>Mahr: {item.formData.mahr}</p>}
                            {item.formData.customization.length > 0 && <p>Extra Customization: {item.formData.customization.join(", ")}</p>}
                            <p>Note: {item.formData.note}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Customer Details */}
                  <div>
                    <h4 className="font-semibold mb-2">Customer Details:</h4>
                    <div className="space-y-1 ml-2">
                      <p>
                        Name: {order.address.firstName} {order.address.lastName}
                      </p>
                      <p>Street: {order.address.street}</p>
                      <p>
                        Address: {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
                      </p>
                      <p>Phone: {order.address.phone}</p>
                      <p>Payment Method: {order.paymentMethod}</p>
                    </div>
                  </div>

                  {/* Order Status */}
                  <div>
                    <h4 className="font-semibold mb-2">Update Status</h4>
                    <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 border rounded-md">
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
