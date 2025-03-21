import React from "react";

const SummaryCards = ({ icon, text, number, color, className }) => {
  return (
    <div className={`rounded flex bg-white shadow-lg ${className}`}>
      <div
        className={`text-3xl flex justify-center items-center ${color} text-white px-4`}
      >
        {icon}
      </div>
      <div className="pl-4 py-1">
        <p className="text-lg font-semibold">{text}</p>
        <p className="text-xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCards;

// import React from "react";

// const SummaryCards = ({ icon, text, number, color, className }) => {
//   return (
//     <div className={`rounded-lg bg-white shadow-xl ${className}`}>
//       <div
//         className={`text-3xl flex justify-center items-center ${color} text-white px-4`}
//       >
//         {icon}
//       </div>
//       <div className="pl-4 py-1">
//         <p className="text-lg font-semibold">{text}</p>
//         <p className="text-xl font-bold">{number}</p>
//       </div>
//     </div>
//   );
// };

// export default SummaryCards;
