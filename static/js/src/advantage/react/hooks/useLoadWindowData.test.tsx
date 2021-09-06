import React from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";

import { useLoadWindowData } from "./useLoadWindowData";

describe("useLoadWindowData", () => {
  beforeEach(() => {
    window.pendingPurchaseId = "12345";
  });

  afterEach(() => {
    delete window.pendingPurchaseId;
  });

  it("fetches data from the window and inserts into react-query", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    renderHook(() => useLoadWindowData(queryClient), {
      wrapper,
    });
    expect(queryClient.getQueryData("pendingPurchaseId")).toBe("12345");
  });
});