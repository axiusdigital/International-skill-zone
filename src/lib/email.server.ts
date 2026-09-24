// Sends transactional emails via the Resend REST API (no SDK needed — just fetch + an API key).
// Server-only: this file must never be imported from route/component code.

const RESEND_API_URL = "https://api.resend.com/emails";

export type RegistrationEmailData = {
  name: string;
  phone: string;
  city: string | null;
  profession: string | null;
  desired_score: string | null;
  age: number | null;
  course: string;
  extra_remarks: string | null;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function row(label: string, value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "";
  return `<tr><td style="padding:6px 12px;color:#64748b;font-size:13px;white-space:nowrap;">${escapeHtml(
    label,
  )}</td><td style="padding:6px 12px;font-size:14px;font-weight:600;">${escapeHtml(
    String(value),
  )}</td></tr>`;
}

/**
 * Notifies the school inbox whenever someone submits the "Book Your Assessment" form.
 * Failures are swallowed by the caller (a missed email must never block a registration).
 */
export async function sendRegistrationNotification(data: RegistrationEmailData) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["REGISTRATION_NOTIFY_EMAIL"] || "internationalskillzone@gmail.com";
  if (!apiKey) {
    console.warn("[email] RESEND_API_KEY not set — skipping registration email notification.");
    return;
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#0f2a5c;margin-bottom:4px;">New Assessment Request</h2>
      <p style="color:#64748b;font-size:13px;margin-top:0;">Someone just submitted the registration form on the website.</p>
      <table style="width:100%;border-collapse:collapse;background:#f8f9fb;border-radius:8px;overflow:hidden;">
        ${row("Name", data.name)}
        ${row("Phone / WhatsApp", data.phone)}
        ${row("City / Country", data.city)}
        ${row("Profession", data.profession)}
        ${row("Desired Score", data.desired_score)}
        ${row("Age", data.age)}
        ${row("Course / Test For", data.course)}
      </table>
      ${
        data.extra_remarks
          ? `<div style="margin-top:16px;"><p style="color:#64748b;font-size:13px;margin-bottom:4px;">Extra remarks:</p><p style="white-space:pre-wrap;font-size:14px;">${escapeHtml(data.extra_remarks)}</p></div>`
          : ""
      }
      <p style="color:#9aa3b2;font-size:11px;margin-top:24px;">This is an automated notification from the International Skill Zone website.</p>
    </div>
  `;

  try {
    const res = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env["REGISTRATION_NOTIFY_FROM"] || "Skill Zone Website <onboarding@resend.dev>",
        to: [to],
        subject: `New Assessment Request — ${data.name}`,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[email] Resend request failed (${res.status}): ${body}`);
    }
  } catch (err) {
    console.error("[email] Failed to send registration notification:", err);
  }
}
