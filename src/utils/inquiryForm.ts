import type { InquirySubmission } from '../types/database.types';

/**
 * The Apps Script web app URL, from Deploy → New deployment → Web app.
 * It must end in /exec (the /dev URL only works while you are signed in as
 * yourself) and be deployed with "Who has access: Anyone".
 *
 * Not a secret — the browser has to reach it, so it is public either way.
 */
const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwZqRikLRjyLaAv1oG2rS_Osr4vLpxnIoTi640xCPzZLZ3HBhPZHafj64rQhEYbpiQW/exec';

/**
 * The Apps Script answers HTTP 200 even when it failed, putting the real
 * outcome in the body as {"success":false,"error":"..."}. Trust the body.
 */
function readVerdict(body: string): { ok: boolean; error?: string } {
  try {
    const parsed = JSON.parse(body) as { success?: boolean; error?: string };
    if (parsed.success === false) return { ok: false, error: parsed.error ?? 'unknown script error' };
    return { ok: true };
  } catch {
    return { ok: true }; // non-JSON reply: fall back to the HTTP status
  }
}

/**
 * POSTs one contact-form inquiry to the Apps Script, which appends it to the
 * "Inquiry Data" sheet.
 *
 * `text/plain` keeps this a simple request, so the browser sends no CORS
 * preflight — Apps Script cannot answer an OPTIONS request. The script still
 * reads the JSON out of `e.postData.contents`.
 *
 * Deliberately NOT `mode: 'no-cors'`: that makes the reply unreadable, so every
 * failure looks like a success. That is how the previous dead deployment went
 * unnoticed — the form showed a green tick while nothing was ever saved.
 */
export async function submitInquiry(form: InquirySubmission): Promise<void> {
  if (!WEBHOOK_URL) {
    throw new Error('WEBHOOK_URL is empty in src/utils/inquiryForm.ts — paste the /exec URL there.');
  }

  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    redirect: 'follow',
    body: JSON.stringify(form),
  });

  const detail = (await response.text()).slice(0, 300);

  if (!response.ok) {
    throw new Error(`Apps Script returned ${response.status}: ${detail}`);
  }

  const verdict = readVerdict(detail);
  if (!verdict.ok) {
    throw new Error(`Apps Script rejected the row: ${verdict.error}`);
  }
}
