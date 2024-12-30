// src/components/StatsCard.jsx
const StatsCard = ({ title, value }) => {
    return (
      <div className="bg-white p-4 rounded shadow-md text-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="text-2xl mt-2 text-green-500">{value}</p>
      </div>
    );
  };
  
  export default StatsCard;
  