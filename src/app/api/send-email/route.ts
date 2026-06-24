import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Lightweight, in-memory rate limiter to prevent SMTP abuse in production
const ipCache = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: Request) {
  try {
    // 1. Origin & CSRF Verification (Security check for production)
    const origin = request.headers.get("origin")
    const host = request.headers.get("host")
    
    if (process.env.NODE_ENV === "production" && origin) {
      const hostUrl = host ? `http://${host}` : ""
      const secureHostUrl = host ? `https://${host}` : ""
      if (origin !== hostUrl && origin !== secureHostUrl) {
        return NextResponse.json(
          { success: false, error: "Unauthorized request origin." },
          { status: 403 }
        )
      }
    }

    // 2. Rate Limiting Check
    const ip = request.headers.get("x-forwarded-for") || "anonymous"
    const now = Date.now()
    const limit = 3 // Maximum 3 emails per minute per IP
    const windowMs = 60 * 1000 // 1 minute window

    const ipData = ipCache.get(ip)

    if (ipData) {
      if (now > ipData.resetTime) {
        // Window expired, reset rate limit tracking for this IP
        ipCache.set(ip, { count: 1, resetTime: now + windowMs })
      } else {
        if (ipData.count >= limit) {
          return NextResponse.json(
            { 
              success: false, 
              error: "Too many requests. Please wait a minute before trying again to prevent spam." 
            },
            { status: 429 }
          )
        }
        ipData.count += 1
      }
    } else {
      // First request from this IP
      ipCache.set(ip, { count: 1, resetTime: now + windowMs })
    }

    // 3. Request Validation
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    // 4. SMTP configuration check
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT
    const smtpUser = process.env.SMTP_USER
    const smtpPassword = process.env.SMTP_PASSWORD

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.warn("SMTP configuration is incomplete in environment variables.")
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not fully configured yet. Please set up the SMTP environment variables.",
        },
        { status: 503 }
      )
    }

    // 5. Configure the nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: process.env.SMTP_SECURE === "true", // true for port 465, false for 587 or others
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    })

    const senderName = process.env.SMTP_FROM_NAME || "Drova Studio"
    const senderEmail = process.env.SMTP_FROM_EMAIL || smtpUser

    // 6. Define social media profiles
    const socialLinks = {
      twitter: "https://x.com/drovastudio",
      instagram: "https://instagram.com/drova.studio",
      threads: "https://threads.net/@drova.studio",
      telegram: "https://t.me/drovastudio",
      email: "mailto:drovastudioofficial@gmail.com"
    }

    // Set up the email options with a premium production template containing social icons
    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject: "Welcome to Drova Studio! ✨",
      text: `Hello!\n\nThank you for sharing your email with us. We have successfully received your request at ${email}.\n\nThis is an automated welcome email sent using Nodemailer in our Next.js application.\n\nFollow our journey:\n- X (Twitter): ${socialLinks.twitter}\n- Instagram: ${socialLinks.instagram}\n- Threads: ${socialLinks.threads}\n- Telegram: ${socialLinks.telegram}\n\nBest regards,\nThe Drova Studio Team`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Drova Studio</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f9fafb;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                border: 1px solid #f3f4f6;
              }
              .header {
                background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                padding: 40px 20px;
                text-align: center;
                color: #ffffff;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 800;
                letter-spacing: -0.5px;
              }
              .content {
                padding: 40px 30px;
                color: #374151;
                line-height: 1.6;
              }
              .content p {
                margin: 0 0 20px 0;
                font-size: 16px;
              }
              .highlight-box {
                background-color: #e0e7ff;
                border-left: 4px solid #6366f1;
                padding: 15px 20px;
                border-radius: 0 8px 8px 0;
                margin: 25px 0;
              }
              .highlight-box p {
                margin: 0;
                font-weight: 600;
                color: #4338ca;
                font-size: 15px;
              }
              .social-container {
                text-align: center;
                margin: 30px 0 10px 0;
                padding-top: 20px;
                border-top: 1px solid #f3f4f6;
              }
              .social-title {
                font-size: 12px;
                font-weight: 600;
                color: #9ca3af;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 15px;
              }
              .social-link {
                display: inline-block;
                margin: 0 8px;
                text-decoration: none;
                transition: opacity 0.2s;
              }
              .social-link:hover {
                opacity: 0.7;
              }
              .social-icon {
                display: block;
                border: 0;
              }
              .footer {
                background-color: #f9fafb;
                padding: 30px 20px;
                text-align: center;
                border-top: 1px solid #f3f4f6;
                font-size: 13px;
                color: #9ca3af;
              }
              .footer p {
                margin: 5px 0;
              }
              .footer a {
                color: #6366f1;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Drova Studio</h1>
              </div>
              <div class="content">
                <p>Hello there,</p>
                <p>Thank you for joining the Drova Studio waitlist!</p>
                <p>We're excited to have you with us as we build the future of AI-powered video creation.</p>
                
                <div class="highlight-box">
                  <p>Registered Email: ${email}</p>
                </div>

                <p>You're officially on the list and will be among the first to hear about product updates, early access opportunities, and new features.</p>
                <p>We're working hard behind the scenes and can't wait to share what we're building.</p>
                <p>Stay tuned, exciting things are coming soon.</p>
                <p>Best regards,<br><strong>The Drova Studio Team</strong></p>

                <!-- Social Media Section inside Email -->
                <div class="social-container">
                  <div class="social-title">Connect With Us</div>
                  <a href="${socialLinks.twitter}" target="_blank" class="social-link">
                    <img src="https://img.icons8.com/ios-filled/32/4b5563/twitterx.png" alt="X" width="20" height="20" class="social-icon" />
                  </a>
                  <a href="${socialLinks.instagram}" target="_blank" class="social-link">
                    <img src="https://img.icons8.com/ios-filled/32/4b5563/instagram-new.png" alt="Instagram" width="20" height="20" class="social-icon" />
                  </a>
                  <a href="${socialLinks.threads}" target="_blank" class="social-link">
                    <img src="https://img.icons8.com/ios-filled/32/4b5563/threads.png" alt="Threads" width="20" height="20" class="social-icon" />
                  </a>
                  <a href="${socialLinks.telegram}" target="_blank" class="social-link">
                    <img src="https://img.icons8.com/ios-filled/32/4b5563/telegram-app.png" alt="Telegram" width="20" height="20" class="social-icon" />
                  </a>
                  <a href="${socialLinks.email}" class="social-link">
                    <img src="https://img.icons8.com/ios-filled/32/4b5563/new-post.png" alt="Email" width="20" height="20" class="social-icon" />
                  </a>
                </div>
              </div>
              <div class="footer">
                <p>© ${new Date().getFullYear()} Drova Studio. All rights reserved.</p>
                <p>You received this email because you entered your email address on our website.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully. Message ID:", info.messageId)

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
      messageId: info.messageId,
    })
  } catch (error: any) {
    console.error("Nodemailer error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected error occurred while sending the email.",
      },
      { status: 500 }
    )
  }
}
