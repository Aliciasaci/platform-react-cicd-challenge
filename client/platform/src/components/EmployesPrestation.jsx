import { Label, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployesPrestation({ prestationId, sendEmployeData }) {
  const [employesPrestation, setEmployesPrestation] = useState([]);

  useEffect(() => {
    const fetchEmployesPrestation = async () => {
      try {
        const response = await axios.get(`https://127.0.0.1:8000/api/prestations/${prestationId}`, {
          headers: {
            'accept': 'application/json'
          }
      });
        setEmployesPrestation(response.data.employes);
        console.log(response.data.employes);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchEmployesPrestation();
  }, [prestationId]);

  const sendData = (e) => {
    // Appelez la fonction de rappel du parent avec les données en tant qu'argument
    console.log(e.target.value);
    sendEmployeData(employesPrestation);
  };

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="employes" value="Choisir un employé" />
      </div>
      <Select id="employes" required onChange={sendData}>
        {employesPrestation.length > 0 ? (
          employesPrestation.map((employe, index) => (
            <option key={index} value={employe.id}>{employe.id} {employe.prenom} </option>
          ))
        ) : (
          <option value="">Loading...</option>
        )}
      </Select>
    </div>
  );
}
