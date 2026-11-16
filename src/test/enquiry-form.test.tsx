import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EnquiryForm } from "@/components/enquiry-form";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("EnquiryForm", () => {
  it("opens a prefilled WhatsApp enquiry without an image upload field", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<EnquiryForm />);
    const form = screen.getByRole("button", { name: "Continue to WhatsApp" }).closest("form")!;

    expect(form).toHaveAttribute("method", "post");

    fireEvent.change(screen.getByLabelText("Full name *"), { target: { value: "John Maphosa" } });
    fireEvent.change(screen.getByLabelText("Email address *"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Phone number *"), {
      target: { value: "+27831234567" },
    });
    fireEvent.change(screen.getByLabelText("Project location *"), {
      target: { value: "Mabopane" },
    });
    fireEvent.change(screen.getByLabelText("Project description *"), {
      target: { value: "I would like a custom kitchen." },
    });

    fireEvent.submit(form);

    expect(open).toHaveBeenCalledOnce();
    const url = new URL(String(open.mock.calls[0][0]));
    const message = url.searchParams.get("text");
    expect(url.origin + url.pathname).toBe("https://wa.me/27839503019");
    expect(message).toContain("Name: John Maphosa");
    expect(message).toContain("Service: Custom Kitchens");
    expect(message).toContain("Project details: I would like a custom kitchen.");
    expect(screen.queryByLabelText(/Reference image/i)).not.toBeInTheDocument();
    expect(screen.getByText(/press Send to complete it/i)).toBeInTheDocument();
  });
});
