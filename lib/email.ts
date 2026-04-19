import { Resend } from 'resend'

const FROM_ADDRESS = 'Ivara <hello@ivara.health>'

function getResend(): Resend {
  // Lazy init - only instantiated at request time, not at build time
  return new Resend(process.env.RESEND_API_KEY)
}

function getEmailContent(language: 'en' | 'hi') {
  if (language === 'hi') {
    return {
      subject: 'Aap Ivara ki waitlist mein hain! 🌸',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FDF6EE; border-radius: 12px; overflow: hidden;">
          <div style="background: #C4714F; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Ivara</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">Checkups ke beech ka safety net</p>
          </div>
          <div style="padding: 32px;">
            <h2 style="color: #1A1A1A; font-size: 22px; margin-top: 0;">Dhanyavaad! Aap waitlist mein hain. 🌸</h2>
            <p style="color: #444; line-height: 1.7;">Jab Ivara aapke sheher mein launch hogi, hum aapko sabse pehle batayenge.</p>
            <p style="color: #444; line-height: 1.7; font-style: italic;">"Jab doctor se milne mein waqt lage, Ivara hoti hai na."</p>
            <p style="color: #444; line-height: 1.7;">Aapka intezaar khatam hoga. Abhi ke liye, Ivara aa rahi hai.</p>
            <div style="margin: 32px 0; padding: 20px; background: #F5EDE3; border-radius: 8px; border-left: 4px solid #C4714F;">
              <p style="margin: 0; color: #1D4E4A; font-size: 14px;">Aapka data aapka hai. Aapki permission ke bina kabhi share nahi hoga. DPDP Act 2023 compliant.</p>
            </div>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid #F5EDE3; text-align: center;">
            <p style="color: #999; font-size: 12px; margin: 0;">© 2026 Ivara Health. Sabhi adhikar surakshit.</p>
          </div>
        </div>
      `
    }
  }
  return {
    subject: "You're on the Ivara waitlist! 🌸",
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #FDF6EE; border-radius: 12px; overflow: hidden;">
        <div style="background: #C4714F; padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Ivara</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">The safety net between checkups</p>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #1A1A1A; font-size: 22px; margin-top: 0;">You're on the list. 🌸</h2>
          <p style="color: #444; line-height: 1.7;">Thank you for joining the Ivara waitlist. We'll reach out the moment we launch in your city.</p>
          <p style="color: #444; line-height: 1.7; font-style: italic;">"Between your checkups, a lot can change. We're watching."</p>
          <p style="color: #444; line-height: 1.7;">You won't have to wait alone much longer.</p>
          <div style="margin: 32px 0; padding: 20px; background: #F5EDE3; border-radius: 8px; border-left: 4px solid #C4714F;">
            <p style="margin: 0; color: #1D4E4A; font-size: 14px;">Your data is yours. Never shared without your explicit consent. DPDP Act 2023 compliant.</p>
          </div>
        </div>
        <div style="padding: 20px 32px; border-top: 1px solid #F5EDE3; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 0;">© 2026 Ivara Health. All rights reserved.</p>
        </div>
      </div>
    `
  }
}

export async function sendWaitlistConfirmation(email: string, language: 'en' | 'hi' = 'en'): Promise<void> {
  const { subject, html } = getEmailContent(language)
  try {
    await getResend().emails.send({ from: FROM_ADDRESS, to: email, subject, html })
  } catch (err) {
    // Don't fail the waitlist signup if email fails - log and continue
    console.error('[Resend] Failed to send confirmation email:', err)
  }
}
