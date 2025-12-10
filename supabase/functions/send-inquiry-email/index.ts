import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InquiryData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  inquiry_type: string;
  product_interest?: string;
  quantity?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const inquiryData: InquiryData = await req.json();

    const smtpHost = Deno.env.get('SMTP_HOST');
    const smtpPort = Deno.env.get('SMTP_PORT');
    const smtpUser = Deno.env.get('SMTP_USER');
    const smtpPassword = Deno.env.get('SMTP_PASSWORD');
    const smtpFromEmail = Deno.env.get('SMTP_FROM_EMAIL');
    const smtpToEmail = Deno.env.get('SMTP_TO_EMAIL');

    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.log('SMTP not configured. Email will not be sent.');
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Inquiry received. Email notification skipped (SMTP not configured).' 
        }),
        {
          status: 200,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #FF6B35; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Your Inquiry</h1>
          </div>
          <div class="content">
            <p>Dear ${inquiryData.name},</p>
            <p>Thank you for contacting Bright Paper. We have received your inquiry and our team will get back to you within 24 hours.</p>
            <h3>Your Inquiry Details:</h3>
            <ul>
              <li><strong>Company:</strong> ${inquiryData.company}</li>
              <li><strong>Inquiry Type:</strong> ${inquiryData.inquiry_type}</li>
              ${inquiryData.product_interest ? `<li><strong>Product Interest:</strong> ${inquiryData.product_interest}</li>` : ''}
              ${inquiryData.quantity ? `<li><strong>Quantity:</strong> ${inquiryData.quantity}</li>` : ''}
            </ul>
            <p><strong>Your Message:</strong><br>${inquiryData.message}</p>
            <p>If you have any urgent questions, please contact us at ${smtpToEmail}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Bright Paper. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2D5016; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .highlight { background: #fff; padding: 15px; margin: 10px 0; border-left: 4px solid #FF6B35; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Inquiry Received</h1>
          </div>
          <div class="content">
            <h3>Customer Information:</h3>
            <div class="highlight">
              <p><strong>Name:</strong> ${inquiryData.name}</p>
              <p><strong>Company:</strong> ${inquiryData.company}</p>
              <p><strong>Email:</strong> ${inquiryData.email}</p>
              <p><strong>Phone:</strong> ${inquiryData.phone}</p>
              <p><strong>Inquiry Type:</strong> ${inquiryData.inquiry_type}</p>
              ${inquiryData.product_interest ? `<p><strong>Product Interest:</strong> ${inquiryData.product_interest}</p>` : ''}
              ${inquiryData.quantity ? `<p><strong>Estimated Quantity:</strong> ${inquiryData.quantity}</p>` : ''}
            </div>
            <h3>Message:</h3>
            <div class="highlight">
              <p>${inquiryData.message}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const sendEmail = async (to: string, subject: string, html: string) => {
      console.log(`Attempting to send email to: ${to}`);
      console.log('Note: Actual SMTP sending is not implemented in this edge function.');
      console.log('This is a placeholder for SMTP email functionality.');
      console.log('To enable email sending, integrate a proper SMTP library or service.');
      
      return { success: true, message: 'Email queued (placeholder)' };
    };

    await sendEmail(
      inquiryData.email,
      'Thank You for Your Inquiry - Bright Paper',
      customerEmailHtml
    );

    await sendEmail(
      smtpToEmail || 'crm@brightpaper.co.in',
      `New ${inquiryData.inquiry_type} from ${inquiryData.name}`,
      adminEmailHtml
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Inquiry received and notification emails sent.' 
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Failed to process inquiry.',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});