import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OpeningDaysCard } from "../components/prestacomponents/OpeningDaysCard";

describe("OpeningDaysCard", () => {
  const openingDays = "Lundi,Mardi,Mercredi,Jeudi,Vendredi,Samedi,Dimanche";

  it("renders opening days and hours correctly", () => {
    const openingHours =
      "10:00-19:00,10:00-19:00,10:00-19:00,10:00-20:00,10:00-19:00,10:00-19:00,10:00-19:00";

    render(
      <OpeningDaysCard openingDays={openingDays} openingHours={openingHours} />
    );

    const days = screen.getAllByText("10:00-19:00");
    expect(days).toHaveLength(6);
    expect(screen.getByText("10:00-20:00")).toBeInTheDocument();
  });

  it('displays "Fermé" for closed days', () => {
    const closedOpeningHours =
      "9:00 AM - 5:00 PM,-,9:00 AM - 5:00 PM,-,9:00 AM - 5:00 PM,-,-";

    render(
      <OpeningDaysCard
        openingDays={openingDays}
        openingHours={closedOpeningHours}
      />
    );

    const days = screen.getAllByText("9:00 AM - 5:00 PM");
    expect(days).toHaveLength(3);
    const closedDays = screen.getAllByText("Fermé");
    expect(closedDays).toHaveLength(4);
  });
});
