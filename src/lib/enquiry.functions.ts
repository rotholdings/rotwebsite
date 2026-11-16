import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { randomUUID } from "node:crypto";

const maxReferenceImageBytes = 5 * 1024 * 1024;
const referenceImageTypes = ["image/jpeg", "image/png", "image/webp"] as const;

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter your phone number")
    .max(30, "Phone number is too long"),
  location: z.string().trim().min(2, "Please enter the project location").max(120),
  service: z.string().trim().min(1).max(60),
  budgetRange: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more about your project").max(2000),
  referenceImage: z
    .object({
      type: z.enum(referenceImageTypes),
      data: z.string().min(1).max(7_000_000),
    })
    .optional(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    let uploadedPath: string | null = null;
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      if (data.referenceImage) {
        const imageBytes = Buffer.from(data.referenceImage.data, "base64");
        if (imageBytes.byteLength > maxReferenceImageBytes) {
          return {
            ok: false as const,
            error: "The reference image must be 5 MB or smaller.",
          };
        }

        const extension =
          data.referenceImage.type === "image/jpeg"
            ? "jpg"
            : data.referenceImage.type === "image/png"
              ? "png"
              : "webp";
        const imagePath = `${randomUUID()}.${extension}`;
        const { error: uploadError } = await supabaseAdmin.storage
          .from("project-references")
          .upload(imagePath, imageBytes, {
            contentType: data.referenceImage.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Reference image upload failed:", uploadError.message);
          return {
            ok: false as const,
            error:
              "We couldn't upload your reference image. Please try another image or contact us directly.",
          };
        }
        uploadedPath = imagePath;
      }

      const { error } = await supabaseAdmin.from("enquiry_submissions").insert({
        name: data.name,
        email: data.email,
        phone: data.phone ? data.phone : null,
        location: data.location,
        service: data.service,
        message: data.message,
        budget_range: data.budgetRange || null,
        reference_image_path: uploadedPath,
      });

      if (error) {
        console.error("Enquiry insert failed:", error.message);
        if (uploadedPath) {
          const { error: cleanupError } = await supabaseAdmin.storage
            .from("project-references")
            .remove([uploadedPath]);
          if (cleanupError) {
            console.error("Reference image cleanup failed:", cleanupError.message);
          }
        }
        return {
          ok: false as const,
          error:
            "We couldn't save your enquiry just now. Please reach us on WhatsApp or email in the meantime.",
        };
      }
      return { ok: true as const };
    } catch (err) {
      console.error("Enquiry submission error:", err);
      if (uploadedPath) {
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error: cleanupError } = await supabaseAdmin.storage
            .from("project-references")
            .remove([uploadedPath]);
          if (cleanupError) {
            console.error("Reference image cleanup failed:", cleanupError.message);
          }
        } catch (cleanupError) {
          console.error("Reference image cleanup failed:", cleanupError);
        }
      }
      return {
        ok: false as const,
        error:
          "Something went wrong on our side. Please reach us on WhatsApp or email in the meantime.",
      };
    }
  });
