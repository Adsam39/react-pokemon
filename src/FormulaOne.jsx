import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FormulaOne() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get(
          "https://ergast.com/api/f1/2024/drivers.json?limit=1000"
        );
        const driversData = response.data.MRData.DriverTable.Drivers;
        setDrivers(driversData);
      } catch (error) {
        console.error("Erreur lors du chargement des pilotes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Liste des pilotes F1</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {drivers.map((driver) => (
            <li key={driver.driverId}>
              <Link to={`/pilotes/${driver.driverId}`}>
                {driver.givenName} {driver.familyName} ({driver.nationality}) -{" "}
                {driver.dateOfBirth}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
