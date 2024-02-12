import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OpeningDaysCard } from "../components/publicDisplayEtablissement/OpeningDaysCard";

describe("OpeningDaysCard", () => {
  const openingDays = {
    lundi: {
      checked: true,
      timeRange: {
        startTime: "09:00",
        endTime: "19:00",
      },
    },
    mardi: {
      checked: true,
      timeRange: {
        startTime: "09:00",
        endTime: "19:00",
      },
    },
    mercredi: {
      checked: true,
      timeRange: {
        startTime: "09:00",
        endTime: "19:00",
      },
    },
    jeudi: {
      checked: false,
      timeRange: {
        startTime: "",
        endTime: "",
      },
    },
    vendredi: {
      checked: false,
      timeRange: {
        startTime: "",
        endTime: "",
      },
    },
    samedi: {
      checked: false,
      timeRange: {
        startTime: "",
        endTime: "",
      },
    },
    dimanche: {
      checked: true,
      timeRange: {
        startTime: "10:00",
        endTime: "20:00",
      },
    },
  };

  const stringObject =
    '{"lundi":{"checked":true,"timeRange":{"startTime":"09:00","endTime":"19:00"}},"mardi":{"checked":true,"timeRange":{"startTime":"09:00","endTime":"19:00"}},"mercredi":{"checked":true,"timeRange":{"startTime":"09:00","endTime":"19:00"}},"jeudi":{"checked":false,"timeRange":{"startTime":"","endTime":""}},"vendredi":{"checked":false,"timeRange":{"startTime":"","endTime":""}},"samedi":{"checked":false,"timeRange":{"startTime":"","endTime":""}},"dimanche":{"checked":true,"timeRange":{"startTime":"10:00","endTime":"20:00"}}}';

  it("renders opening days and hours correctly", () => {
    render(<OpeningDaysCard openingDays={stringObject} />);

    const days = screen.getAllByText("09:00 - 19:00");
    const closed = screen.getAllByText("Common_Closed");
    expect(days).toHaveLength(3);
    expect(screen.getByText("10:00 - 20:00")).toBeInTheDocument();
    expect(closed).toHaveLength(3);
  });
});
