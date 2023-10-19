// import SortSeller from "./SortSeller";
// import { IoLocationSharp } from "react-icons/io5";
// export default function ECommerceCard() {
//   const top5Counts = SortSeller();

//   return (
//     <div className="max-w-[1400px] mx-auto">
//       <h1 className="text-[30px] font-bold text-red-500">Best Seller</h1>
//       <div className="flex items-center justify-center">
//         {top5Counts?.map((item) => (
//           <div
//             className="max-w-md w-full sm:w-full lg:w-full py-6 px-3"
//             key={item.id}
//           >
//             <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//               <div className="relative">
//                 <img
//                   src={`${item?.images !== undefined && item?.images[0]?.url}`}
//                   alt=""
//                   className="h-[250px] w-[450px]"
//                 />
//                 {/*Tag */}
//                 <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold absolute top-0">
//                   New
//                 </span>
//               </div>

//               <div className="p-4">
//                 <p className="uppercase tracking-wide text-lg font-bold text-gray-700">
//                   {item.name}
//                 </p>
//                 <p className="text-3xl text-gray-900">
//                   {item?.price !== undefined && item?.price.toLocaleString()}
//                   VND
//                 </p>
//                 <div className="flex items-center">
//                   <IoLocationSharp />
//                   <p className="text-gray-700">742 Evergreen Terrace</p>
//                 </div>
//               </div>
//               <div className="flex p-4 border-t border-gray-300 text-gray-700">
//                 <div className="flex-1 inline-flex items-center">
//                   <p>
//                     <span className="text-gray-900 font-bold">
//                       {item.totalRating}
//                     </span>{" "}
//                     Rating
//                   </p>
//                 </div>
//                 <div className="flex-1 inline-flex items-center">
//                   <p>
//                     <span className="text-gray-900 font-bold">
//                       {item.purchased}
//                     </span>{" "}
//                     Đã Bán
//                   </p>
//                 </div>
//               </div>
//               <div className="px-4 pt-3 pb-4 border-t border-gray-300 bg-gray-100">
//                 <button className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full">
//                   Add To Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
