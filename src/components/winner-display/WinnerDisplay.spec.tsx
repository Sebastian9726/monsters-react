import React, { ReactElement } from "react";
import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";
import { WinnerDisplay } from "./WinnerDisplay";
import { act } from "react";

// Helper function that wraps render with act
const renderWithAct = async (component: ReactElement): Promise<RenderResult> => {
  let renderResult: RenderResult | undefined;
  
  await act(async () => {
    renderResult = render(component);
  });
  
  // TypeScript now knows this can't be undefined after the await
  return renderResult!;
};

describe("WinnerDisplay", () => {
  it("renders the default text when no winner text is provided", async () => {
    const { container } = await renderWithAct(<WinnerDisplay text="" />);
    
    const defaultText = container.querySelector(
      ".MuiTypography-root.MuiTypography-body1",
    );

    expect(defaultText).toBeInTheDocument();
  });
});