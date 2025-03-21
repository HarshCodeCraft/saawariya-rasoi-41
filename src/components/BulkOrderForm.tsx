
import React, { useState } from 'react';
import { MenuItem } from '@/data/menuData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CalendarIcon, ClockIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import PickupLocationMap from './PickupLocationMap';
import { saveOrderToSupabase, sendOrderNotification, generateOrderId, OrderDetails } from '@/utils/orders';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  pickupAddress: z.string().optional(),
  pickupDate: z.date({
    required_error: "Please select a pickup date",
  }),
  pickupTime: z.string().min(1, 'Please select a pickup time'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  paymentMethod: z.enum(['cash', 'online']),
  specialInstructions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BulkOrderFormProps {
  item: MenuItem;
  onClose: () => void;
}

const BulkOrderForm = ({ item, onClose }: BulkOrderFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  
  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      pickupAddress: 'Saawariya Rasoi, Kanpur, Uttar-Pradesh',
      pickupDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      pickupTime: '12:00',
      quantity: 1,
      paymentMethod: 'cash',
      specialInstructions: '',
    },
  });
  
  const handleProceedToConfirmation = async (data: FormValues) => {
    // Calculate total price
    const itemPrice = item.takeawayPrice || item.price;
    const numericPrice = parseFloat(itemPrice.replace('₹', '').replace(',', ''));
    const totalPrice = numericPrice * data.quantity;
    
    // Generate a unique order ID
    const orderId = await generateOrderId();
    
    // Format order details for confirmation and notification
    const details: OrderDetails = {
      orderId,
      customerName: data.name,
      customerEmail: data.email,
      customerPhone: data.phone,
      pickupLocation: data.pickupAddress || 'Saawariya Rasoi, Kanpur',
      pickupDateTime: `${format(data.pickupDate, 'PP')} at ${data.pickupTime}`,
      items: [{
        name: item.name,
        quantity: data.quantity,
        price: itemPrice
      }],
      totalAmount: `₹${totalPrice.toFixed(2)}`,
      paymentStatus: data.paymentMethod === 'cash' ? 'Cash on Pickup' : 'Online Payment',
      specialInstructions: data.specialInstructions || 'None',
    };
    
    setOrderDetails(details);
    setShowConfirmation(true);
  };
  
  const onSubmit = async (data: FormValues) => {
    if (!showConfirmation) {
      handleProceedToConfirmation(data);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (!orderDetails) {
        throw new Error("Order details are missing");
      }
      
      // Save order to Supabase
      const { success: saveSuccess, error: saveError } = await saveOrderToSupabase(orderDetails);
      
      if (!saveSuccess) {
        throw new Error(`Error saving order: ${saveError?.message || "Unknown error"}`);
      }
      
      // Send notifications
      const { success: notifySuccess, error: notifyError } = await sendOrderNotification(orderDetails);
      
      if (!notifySuccess) {
        console.warn("Order was saved but notifications failed:", notifyError);
        // Don't throw here, as we still want to show success since the order was saved
      }
      
      toast({
        title: "Order Placed Successfully",
        description: "Your order has been received. We'll contact you shortly to confirm the details.",
      });
      
      onClose();
    } catch (error) {
      console.error("Error processing order:", error);
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (showConfirmation && orderDetails) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Order Confirmation</h3>
        
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{orderDetails.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{orderDetails.customerPhone}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{orderDetails.customerEmail}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Pickup Date & Time</p>
            <p className="font-medium">{orderDetails.pickupDateTime}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Items</p>
            {orderDetails.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between">
                <p>{item.name} x {item.quantity}</p>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-2 border-t">
            <p className="font-medium">Total Amount</p>
            <p className="font-medium">{orderDetails.totalAmount}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Payment Method</p>
            <p className="font-medium">{orderDetails.paymentStatus}</p>
          </div>
          
          {orderDetails.specialInstructions !== 'None' && (
            <div>
              <p className="text-sm text-muted-foreground">Special Instructions</p>
              <p className="text-sm">{orderDetails.specialInstructions}</p>
            </div>
          )}
        </div>
        
        <PickupLocationMap address={orderDetails.pickupLocation} />
        
        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" type="button" onClick={() => setShowConfirmation(false)}>
            Edit Order
          </Button>
          <Button type="button" onClick={() => onSubmit(form.getValues())} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Order'
            )}
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Customer Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pickupAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Address</FormLabel>
                <FormControl>
                  <Input {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <PickupLocationMap address={form.getValues('pickupAddress') || 'Saawariya Rasoi, Kanpur'} />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Order Details</h3>
          
          <div className="bg-muted p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{item.takeawayPrice || item.price}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pickup Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => 
                          date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="pickupTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pickup Time</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type="time"
                        min="10:00"
                        max="22:00"
                        {...field}
                      />
                    </FormControl>
                    <ClockIcon className="absolute right-3 top-3 h-4 w-4 opacity-50" />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      value="cash"
                      className="mr-2"
                      checked={field.value === 'cash'}
                      onChange={() => field.onChange('cash')}
                    />
                    <label htmlFor="cash">Cash on Pickup</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="online"
                      value="online"
                      className="mr-2"
                      checked={field.value === 'online'}
                      onChange={() => field.onChange('online')}
                    />
                    <label htmlFor="online">Online Payment</label>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="specialInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Instructions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special requests or dietary requirements?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            Proceed to Confirmation
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BulkOrderForm;
