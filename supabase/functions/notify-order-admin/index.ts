
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderDetails {
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total_amount: string;
  pickup_datetime: string;
  pickup_location: string;
  items: any;
  payment_status: string;
  special_instructions?: string;
}

// Configure admin contact details
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "harshsaini20172018@gmail.com";
const ADMIN_PHONE = Deno.env.get("ADMIN_PHONE") || "7075848810";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }
  
  try {
    const orderDetails: OrderDetails = await req.json();
    console.log("Received order notification for order:", orderDetails.order_id);
    
    // Format items for display
    const itemsList = Array.isArray(orderDetails.items) 
      ? orderDetails.items.map((item: any) => 
          `${item.name} x ${item.quantity} (${item.price})`
        ).join('\n')
      : JSON.stringify(orderDetails.items);
    
    // Format WhatsApp message
    const whatsAppMessage = formatWhatsAppMessage(orderDetails, itemsList);
    
    // Format email message
    const emailSubject = `New Order #${orderDetails.order_id} Received`;
    const emailBody = formatEmailBody(orderDetails, itemsList);
    
    console.log("Would send notifications to admin:");
    console.log(`- Email to: ${ADMIN_EMAIL}`);
    console.log(`- WhatsApp to: ${ADMIN_PHONE}`);
    
    // In production, you would integrate with actual email and WhatsApp APIs here
    // This is a placeholder for demonstration
    const notificationLogs = {
      success: true,
      message: "Notification logs created (would send real messages in production)",
      details: {
        whatsApp: { to: ADMIN_PHONE, message: whatsAppMessage },
        email: { to: ADMIN_EMAIL, subject: emailSubject, body: emailBody }
      }
    };
    
    return new Response(
      JSON.stringify(notificationLogs),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error processing notification:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "An unknown error occurred" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
});

/**
 * Format WhatsApp message according to the specified template
 */
function formatWhatsAppMessage(order: OrderDetails, itemsList: string): string {
  return `📢 New Order Request! 🛍️

Customer Details:
👤 Name: ${order.customer_name}
📞 Phone: ${order.customer_phone}
📧 Email: ${order.customer_email}
📍 Pickup Address: ${order.pickup_location}
🕒 Preferred Pickup Time: ${order.pickup_datetime}

Order Details:
📌 Order ID: ${order.order_id}
📋 Items Ordered:

${itemsList}
💰 Total Amount: ${order.total_amount}
💳 Payment Status: ${order.payment_status}

📝 Special Instructions:
${order.special_instructions || "None"}

🚀 Please confirm and process ASAP!`;
}

/**
 * Format email body according to the specified template
 */
function formatEmailBody(order: OrderDetails, itemsList: string): string {
  return `Hello Admin,

A new order request has been received. Please review the details below:

🔹 Customer Details:

Name: ${order.customer_name}
Phone: ${order.customer_phone}
Email: ${order.customer_email}
Pickup Location: ${order.pickup_location}
Preferred Time: ${order.pickup_datetime}

🔹 Order Details:

Order ID: ${order.order_id}
Items Ordered:
${itemsList}
Total Amount: ${order.total_amount}
Payment Mode: ${order.payment_status}

🔹 Special Instructions:
${order.special_instructions || "None"}

Regards,
Saawariya Rasoi Team`;
}
