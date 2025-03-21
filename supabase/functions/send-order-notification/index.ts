
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  pickupLocation: string;
  pickupDateTime: string;
  items: OrderItem[];
  totalAmount: string;
  paymentStatus: string;
  specialInstructions: string;
}

// Send notifications to admin via WhatsApp and email
async function sendNotifications(orderDetails: OrderDetails, adminPhone: string, adminEmail: string) {
  console.log("Sending notification for order:", orderDetails);
  console.log("Admin contact details:", { phone: adminPhone, email: adminEmail });
  
  // Format WhatsApp message
  const whatsappMessage = formatWhatsAppMessage(orderDetails);
  
  // Format email subject and body
  const emailSubject = `New Order Request – Order #${orderDetails.orderId}`;
  const emailBody = formatEmailBody(orderDetails);
  
  // In a production environment, you would call the WhatsApp API (via Twilio or similar)
  // and an email service (Resend, SendGrid, etc.)
  
  return {
    success: true,
    message: "Notification logs created (would send real messages in production)",
    details: {
      whatsApp: { to: adminPhone, message: whatsappMessage },
      email: { to: adminEmail, subject: emailSubject, body: emailBody }
    }
  };
}

function formatWhatsAppMessage(order: OrderDetails): string {
  // Format items list
  const itemsList = order.items.map(item => 
    `${item.name} x ${item.quantity}`
  ).join('\n');
  
  return `📢 New Order Request! 🛍️

Customer Details:
👤 Name: ${order.customerName}
📞 Phone: ${order.customerPhone}
📧 Email: ${order.customerEmail}
📍 Pickup Address: ${order.pickupLocation}
🕒 Preferred Pickup Time: ${order.pickupDateTime}

Order Details:
📌 Order ID: ${order.orderId}
📋 Items Ordered:

${itemsList}
💰 Total Amount: ${order.totalAmount}
💳 Payment Status: ${order.paymentStatus}

📝 Special Instructions:
${order.specialInstructions}

🚀 Please confirm and process ASAP!`;
}

function formatEmailBody(order: OrderDetails): string {
  // Format items list
  const itemsList = order.items.map(item => 
    `${item.name} x ${item.quantity}`
  ).join('\n');
  
  return `Hello Admin,

A new order request has been received. Please review the details below:

🔹 Customer Details:

Name: ${order.customerName}
Phone: ${order.customerPhone}
Email: ${order.customerEmail}
Pickup Location: ${order.pickupLocation}
Preferred Time: ${order.pickupDateTime}

🔹 Order Details:

Order ID: ${order.orderId}
Items Ordered:
${itemsList}
Total Amount: ${order.totalAmount}
Payment Mode: ${order.paymentStatus}

🔹 Special Instructions:
${order.specialInstructions}

Regards,
Saawariya Rasoi Team`;
}

serve(async (req) => {
  // CORS handling for preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    // Get admin contact details from environment variables
    const adminPhone = Deno.env.get("ADMIN_PHONE") || "7075848810";
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "harshsaini20172018@gmail.com";
    
    if (req.method === "POST") {
      const orderDetails: OrderDetails = await req.json();
      
      // Send notifications
      const result = await sendNotifications(orderDetails, adminPhone, adminEmail);
      
      return new Response(
        JSON.stringify(result),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 405 
      }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An unknown error occurred" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});
