
import { toast } from "@/components/ui/use-toast";

// Structure for order details
interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

export interface BulkOrderDetails {
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

// Admin contact details for notifications
const ADMIN_EMAIL = "harshsaini20172018@gmail.com";
const ADMIN_WHATSAPP = "7075848810";

/**
 * Formats and sends bulk order notifications via WhatsApp and email
 */
export async function sendBulkOrderNotification(orderDetails: BulkOrderDetails): Promise<void> {
  try {
    // Format WhatsApp message
    const whatsappMessage = formatWhatsAppMessage(orderDetails);
    
    // Format email subject and body
    const emailSubject = `New Bulk Order Request – Order #${orderDetails.orderId}`;
    const emailBody = formatEmailBody(orderDetails);
    
    // Send to Zapier webhook for processing
    // In a production app, this would be your backend endpoint or Zapier webhook
    const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/123456/abcdef/"; // Replace with actual webhook
    
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors", // For cross-origin requests
      body: JSON.stringify({
        whatsappMessage,
        emailSubject,
        emailBody,
        orderDetails,
        adminEmail: ADMIN_EMAIL,
        adminWhatsapp: ADMIN_WHATSAPP,
      }),
    });
    
    console.log("Notification sent to admin", { 
      orderDetails, 
      adminEmail: ADMIN_EMAIL,
      adminWhatsapp: ADMIN_WHATSAPP 
    });
    
    // For demo purposes, log the messages that would be sent
    console.log("WhatsApp Message:", whatsappMessage);
    console.log("Email Subject:", emailSubject);
    console.log("Email Body:", emailBody);
    
    // Since we can't directly integrate with WhatsApp/Email APIs in this frontend-only app,
    // we'll show a message to the user that in production, notifications would be sent
    toast({
      title: "Admin Notification",
      description: `In production, WhatsApp (${ADMIN_WHATSAPP}) and email (${ADMIN_EMAIL}) notifications would be sent.`,
    });
    
    return Promise.resolve();
  } catch (error) {
    console.error("Error sending notifications:", error);
    toast({
      title: "Notification Error",
      description: "There was an error sending admin notifications. Please contact us directly.",
      variant: "destructive",
    });
    return Promise.reject(error);
  }
}

/**
 * Format WhatsApp message according to the specified template
 */
function formatWhatsAppMessage(order: BulkOrderDetails): string {
  // Format items list
  const itemsList = order.items.map(item => 
    `${item.name} x ${item.quantity}`
  ).join('\n');
  
  return `📢 New Bulk Order Request! 🛍️

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

🚀 Please confirm and process ASAP!

🔗 Admin Panel: https://admin.saawariyarasoi.com/orders/${order.orderId}`;
}

/**
 * Format email body according to the specified template
 */
function formatEmailBody(order: BulkOrderDetails): string {
  // Format items list
  const itemsList = order.items.map(item => 
    `${item.name} x ${item.quantity}`
  ).join('\n');
  
  return `Hello Admin,

A new bulk order request has been received. Please review the details below:

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

📌 Click here to manage the order: https://admin.saawariyarasoi.com/orders/${order.orderId}

Regards,
Saawariya Rasoi Team`;
}
