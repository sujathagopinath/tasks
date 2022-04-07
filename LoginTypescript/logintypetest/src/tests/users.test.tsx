import React from "react";
import { Users } from "../components/users";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";

describe("renders user lists", () => {
  const renderComponent = () => render(<Users />);

  test("renders list of users", async () => {
    renderComponent();
    fireEvent.click(screen.getByText("Get Data"));

    await waitFor(() => {
      const userList = screen.getAllByRole("listitem");
      expect(userList).toHaveLength(10);
    });
  });
});
