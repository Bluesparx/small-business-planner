import React from "react";

export const PredictionsTable = ({ predictions }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-green-600">
        Predicted Stock Prices
      </h2>
      <table className="mt-4 border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Predicted Close</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((item, index) => (
            <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">
              {new Date(item.Date).toISOString().split('T')[0]}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {item["Predicted Close"].toFixed(2)}
            </td>
          </tr>          
          ))}
        </tbody>
      </table>
    </div>
  );
};
