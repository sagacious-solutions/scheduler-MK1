import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const save = jest.fn();
    const saving = jest.fn();

    const { getByText } = render(
      <Form
        interviewers={interviewers}
        onSave={save}
        saving={saving}
        name={""}
      />
    );
    fireEvent.click(getByText("Save"));

    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    expect(save).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const save = jest.fn();
    const saving = () => {
      console.log("hello");
    };
    const { queryByText, getByText, onSave } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Miller-Jones"
        onSave={save}
        interviewer={interviewers[0]}
        saving={saving}
      />
    );

    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    fireEvent.click(getByText("Save"));

    expect(save).toHaveBeenCalledTimes(1);

    expect(save).toHaveBeenCalledWith(
      "Lydia Miller-Jones",
      interviewers[0],
      undefined,
      undefined,
      undefined
    );
  });
});
