import React from "react";
import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { renderHook } from "@testing-library/react-hooks";

import { useLoadWindowData } from "./useLoadWindowData";

describe("useLoadWindowData", () => {
  it("fetches data from the window and inserts into react-query", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    renderHook(() => useLoadWindowData(queryClient), {
      wrapper,
    });
    // TODO test that it fetches the stripe key:
    // https://github.com/canonical-web-and-design/ubuntu.com/pull/10423
    expect(queryClient.isFetching()).toBe(0);
  });
});
