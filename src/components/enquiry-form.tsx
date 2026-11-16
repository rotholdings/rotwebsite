import { useEffect, useState, type FormEvent } from "react";
import { CircleCheck, MessageCircle } from "lucide-react";
import { company, serviceOptions } from "@/lib/site-data";

type Errors = Partial<Record<"name" | "email" | "phone" | "location" | "message", string>>;

function validate(form: {
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
}): Errors {
  const errors: Errors = {};
  if (form.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (form.phone.trim().length < 7) errors.phone = "Please enter your phone number.";
  else if (form.phone.trim().length > 30) errors.phone = "Phone number is too long.";
  if (form.location.trim().length < 2) errors.location = "Please enter your project location.";
  if (form.message.trim().length < 10)
    errors.message = "Please tell us a little more about your project.";
  return errors;
}

export function EnquiryForm({ initialService }: { initialService?: string }) {
  const [service, setService] = useState(
    serviceOptions.find((option) => option === initialService) ?? serviceOptions[0],
  );
  const [firstName, setFirstName] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [whatsappUrl, setWhatsappUrl] = useState(company.whatsapp);

  useEffect(() => {
    const selectedService = serviceOptions.find((option) => option === initialService);
    if (selectedService) {
      setService(selectedService);
    }
  }, [initialService]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const getValue = (key: string) => String(data.get(key) ?? "").trim();
    const enquiry = {
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      location: getValue("location"),
      service: getValue("service"),
      budgetRange: getValue("budgetRange"),
      message: getValue("message"),
    };
    const nextErrors = validate(enquiry);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const message = [
      `Hello ${company.name}, I would like to enquire about a project.`,
      `Name: ${enquiry.name}`,
      `Email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Project location: ${enquiry.location}`,
      `Service: ${enquiry.service}`,
      enquiry.budgetRange ? `Budget range: ${enquiry.budgetRange}` : "",
      `Project details: ${enquiry.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `${company.whatsapp}?text=${encodeURIComponent(message)}`;
    setFirstName(enquiry.name.split(" ")[0]);
    setWhatsappUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div className="card-luxe p-8 text-center sm:p-12">
        <CircleCheck size={42} strokeWidth={1.3} className="mx-auto text-burgundy" />
        <h3 className="display-title mt-5 text-3xl">Thank you, {firstName}.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your enquiry is ready in WhatsApp. Review the message and press Send to complete it.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-foreground underline underline-offset-4"
        >
          <MessageCircle size={16} strokeWidth={1.75} /> Continue in WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form method="post" onSubmit={onSubmit} noValidate className="card-luxe p-5 sm:p-8 lg:p-10">
      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Full name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={100}
            required
            className="field-input"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-xs text-destructive">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="field-label">
            Email address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={255}
            required
            className="field-input"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-xs text-destructive">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="field-label">
            Phone number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            required
            className="field-input"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 text-xs text-destructive">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="location" className="field-label">
            Project location *
          </label>
          <input
            id="location"
            name="location"
            type="text"
            autoComplete="address-level2"
            maxLength={120}
            required
            className="field-input"
            placeholder="Town or suburb"
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? "location-error" : undefined}
          />
          {errors.location && (
            <p id="location-error" className="mt-2 text-xs text-destructive">
              {errors.location}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="service" className="field-label">
            Service required
          </label>
          <select
            id="service"
            name="service"
            className="field-input"
            value={service}
            onChange={(event) => setService(event.target.value)}
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budgetRange" className="field-label">
            Budget range (optional)
          </label>
          <input
            id="budgetRange"
            name="budgetRange"
            type="text"
            maxLength={120}
            className="field-input"
            placeholder="Share a range or write “to be discussed”"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Project description *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={2000}
            required
            className="field-input resize-y"
            placeholder="What are we making, and what would you like the space to do?"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-xs text-destructive">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <button type="submit" className="btn-primary mt-7 w-full">
        Continue to WhatsApp
      </button>

      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
        This opens WhatsApp with your enquiry message ready to send. See our{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy &amp; POPIA notice
        </a>
        .
      </p>
    </form>
  );
}
