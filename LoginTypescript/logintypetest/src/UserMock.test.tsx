import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import Users from "./users";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Mocktest", () => {
  const renderComponent = () => render(<Users />);

  test("renders Mocked value", async () => {
    renderComponent();

    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: "Joe Doe",
        },
        {
          id: 2,
          name: "Jane Doe",
        },
      ],
    });

    fireEvent.click(screen.getByText("Get Data"));

    await waitFor(() => {
      const userList = screen.getAllByRole("listitem");
      expect(userList[0]).toHaveTextContent("Joe Doe");
    });
  });
});
