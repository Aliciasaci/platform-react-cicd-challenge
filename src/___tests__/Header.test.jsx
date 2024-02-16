import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";
import { AppContext } from "../context";

describe("Header", () => {
    test("renders without crashing", () => {
        render(
            <Router>
                <AppContext.Provider value={{ userToken: null, setUserToken: jest.fn() }}>
                    <Header />
                </AppContext.Provider>
            </Router>
        );

        expect(screen.getByText("PICKME")).toBeInTheDocument();
        expect(screen.getByText("Etablissements")).toBeInTheDocument();
    });

    test("displays Profile button when user is authenticated", () => {
        render(
            <Router>
                <AppContext.Provider value={{ userToken: "mockUserToken", setUserToken: jest.fn() }}>
                    <Header />
                </AppContext.Provider>
            </Router>
        );

        expect(screen.getByText("PICKME")).toBeInTheDocument();
        expect(screen.getByText("Etablissements")).toBeInTheDocument();
    });
});
