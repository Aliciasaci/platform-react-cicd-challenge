// import "@testing-library/jest-dom";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { EmployeesCard } from "../components/publicDisplayEtablissement/EmployeesCard";

// describe("EmployeesCard", () => {
//   it("renders employee cards correctly", () => {
//     const employees = [
//       {
//         nom: "Jean",
//         prenom: "Pierre",
//         description: "Je suis Pierre",
//       },
//       {
//         nom: "Dupont",
//         prenom: "Jean",
//         description: "Je suis Jean",
//       },
//       {
//         nom: "Martin",
//         prenom: "Paul",
//         description: "Je suis Paul",
//       },
//     ];

//     render(<EmployeesCard employees={employees} />);

//     expect(screen.getByText("Pierre")).toBeInTheDocument();
//     expect(screen.getByText("Jean")).toBeInTheDocument();
//     expect(screen.getByText("Paul")).toBeInTheDocument();
//   });

//   it("should display the description on hover", () => {
//     const employees = [
//       {
//         nom: "Jean",
//         prenom: "Pierre",
//         description: "Je suis Pierre",
//       },
//     ];

//     render(<EmployeesCard employees={employees} />);
//     // hover over the first employee
//     const employee = screen.getByText("Pierre");
//     fireEvent.mouseEnter(employee);

//     expect(screen.getByText("Je suis Pierre")).toBeInTheDocument();
//   });
// });
