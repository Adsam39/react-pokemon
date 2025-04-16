import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function PiloteDetails() {
  const { id } = useParams();
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ergast.com/api/f1/drivers/${id}.json`)
      .then((res) => {
        const data = res.data.MRData.DriverTable.Drivers[0];
        setDriver(data);
      })
      .catch((err) => console.error("Erreur chargement du pilote:", err));
  }, [id]);

  if (!driver) return <p>Chargement...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/pilotes">← Retour</Link>
      <h2>
        {driver.givenName} {driver.familyName}
      </h2>
      <p>
        <strong>Nationalité:</strong> {driver.nationality}
      </p>
      <p>
        <strong>Date de naissance:</strong> {driver.dateOfBirth}
      </p>
      {driver.url && (
        <p>
          <strong>Wikipedia:</strong>{" "}
          <a href={driver.url} target="_blank" rel="noopener noreferrer">
            Voir le profil
          </a>
        </p>
      )}
    </div>
  );
}
