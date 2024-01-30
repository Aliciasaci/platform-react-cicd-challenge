import { Label, Select } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployesPrestation({ prestationId, handleSelect }) {
  const [employesPrestation, setEmployesPrestation] = useState([]);

  useEffect(() => {
    const fetchEmployesPrestation = async () => {
      try {
        const response = await axios.get(`https://127.0.0.1:8000/api/prestations/${prestationId}`, {
          headers: {
            'Accept': 'application/json'
          }
        });
        setEmployesPrestation(response.data.employes);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchEmployesPrestation();
  }, [prestationId]);

  const sendData = (e) => {
    const selectedEmployeeId = e.target.value;
    handleSelect(selectedEmployeeId);
  };

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="employes" value="Choisir un employé" />
      </div>
      <Select id="employes" required onChange={sendData}>
        <option value=""> </option>
        {employesPrestation.length > 0 ? (
          employesPrestation.map((employe) => (
            <option key={employe.id} value={employe.id}>{employe.nom} {employe.prenom} </option>
          ))
        ) : (
          <option value="">Loading...</option>
        )}
      </Select>
    </div>
  );
}
