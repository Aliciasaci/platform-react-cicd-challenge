import { Label, Select } from "flowbite-react";

export default function EmployesPrestation({
  employesPrestation,
  handleSelect,
}) {
  const sendData = (e) => {
    e.stopPropagation();
    const selectedEmployeeId = e.target.value;
    handleSelect(selectedEmployeeId);
  };

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="employes" value="Choisir un employé" />
      </div>
      <Select
        id="employes"
        required
        defaultValue={"Selectionnez un employé"}
        onChange={sendData}
      >
        <option disabled>Selectionnez un employé</option>
        {employesPrestation.length > 0 ? (
          employesPrestation.map((employe) => (
            <option key={employe.id} value={employe.id}>
              {employe.nom} {employe.prenom}{" "}
            </option>
          ))
        ) : (
          <option value="">Loading...</option>
        )}
      </Select>
    </div>
  );
}
