const DashboardCard = ({ label, value, color = "primary" }) => {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    purple: "bg-purple-100 text-purple-800",
    gray: "bg-gray-100 text-gray-800",
  };

  return (
    <div
      className={`rounded-md p-4 shadow-sm border border-border ${colorMap[color]}`}
    >
      <h4 className="text-sm font-semibold">{label}</h4>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;
