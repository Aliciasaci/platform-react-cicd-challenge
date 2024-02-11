import { Label, Select } from "flowbite-react";
import { useTranslation } from "react-i18next";

export default function EmployesPrestation({
  employesPrestation,
  handleSelect,
}) {
  const { t } = useTranslation();
  const sendData = (e) => {
    e.stopPropagation();
    const selectedEmployeeId = e.target.value;
    handleSelect(selectedEmployeeId);
  };

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label
          htmlFor="employes"
          value={t("Reservation_Page_Selected_Employee")}
        />
      </div>
      <Select
        id="employes"
        required
        defaultValue={t("Reservation_Page_Select_Employee_Placeholder")}
        onChange={sendData}
      >
        <option disabled>
          {t("Reservation_Page_Select_Employee_Placeholder")}
        </option>
        {employesPrestation.length > 0 ? (
          employesPrestation.map((employe) => (
            <option key={employe.id} value={employe.id}>
              {employe.nom} {employe.prenom}{" "}
            </option>
          ))
        ) : (
          <option value="">{t("Common_Loading")}</option>
        )}
      </Select>
    </div>
  );
}
