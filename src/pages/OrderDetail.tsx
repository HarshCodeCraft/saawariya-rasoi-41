
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { convertJsonToOrderItems, OrderItem } from '@/utils/orders';
import { Json } from '@/integrations/supabase/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { ChevronLeft, CalendarIcon, Clock, MapPin, Phone, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

interface OrderDetail {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_location: string;
  pickup_datetime: string;
  items: OrderItem[];
  total_amount: string;
  status: 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled';
  payment_status: string;
  special_instructions?: string;
  created_at: string;
}

const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast({
          title: "Authentication required",
          description: "Please log in to view order details",
          variant: "destructive",
        });
        navigate('/auth?mode=login');
        return;
      }
      
      fetchOrderDetails();
    };
    
    checkAuth();
  }, [navigate, orderId]);
  
  // Subscribe to realtime updates for this specific order
  useEffect(() => {
    if (!orderId) return;
    
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `order_id=eq.${orderId}`
        },
        (payload) => {
          console.log('Order updated:', payload);
          fetchOrderDetails(); // Refresh order details when there's an update
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);
  
  const fetchOrderDetails = async () => {
    if (!orderId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('order_id', orderId)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setOrder({
          ...data,
          items: convertJsonToOrderItems(data.items as Json),
          status: (data.status as 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled') || 'pending'
        });
      } else {
        setError('Order not found');
      }
    } catch (error: any) {
      console.error('Error fetching order details:', error);
      setError(error.message || 'Failed to load order details');
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const getStatusStepStyles = (orderStatus: string, stepStatus: string) => {
    const statusMap: Record<string, number> = {
      'pending': 1,
      'processing': 2,
      'ready': 3,
      'completed': 4,
      'cancelled': 5
    };
    
    const orderStep = statusMap[orderStatus] || 0;
    const currentStep = statusMap[stepStatus] || 0;
    
    if (orderStatus === 'cancelled' && stepStatus !== 'cancelled') {
      return 'bg-gray-200 text-gray-400';
    }
    
    // Current status
    if (orderStep === currentStep) {
      return 'bg-primary text-primary-foreground';
    }
    
    // Completed status
    if (orderStep > currentStep) {
      return 'bg-emerald-100 text-emerald-800';
    }
    
    // Future status
    return 'bg-gray-200 text-gray-400';
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/my-orders')}>
                <ChevronLeft className="h-4 w-4" />
                <span>Back to My Orders</span>
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-4 w-48" />
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (error || !order) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/my-orders')}>
                <ChevronLeft className="h-4 w-4" />
                <span>Back to My Orders</span>
              </Button>
            </div>
            
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error || 'Order not found'}. Please try again or contact support.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/my-orders')}>
              <ChevronLeft className="h-4 w-4" />
              <span>Back to My Orders</span>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Order #{order.order_id}</CardTitle>
                  <CardDescription>
                    Placed on {formatDate(order.created_at)} at {formatTime(order.created_at)}
                  </CardDescription>
                </div>
                <Badge className={getStatusBadgeStyles(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Order Progress */}
              {order.status !== 'cancelled' ? (
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    <div className="text-center w-1/4">
                      <div className={`mx-auto rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium mb-1 ${getStatusStepStyles(order.status, 'pending')}`}>
                        1
                      </div>
                      <p className="text-xs font-medium">Pending</p>
                    </div>
                    <div className="text-center w-1/4">
                      <div className={`mx-auto rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium mb-1 ${getStatusStepStyles(order.status, 'processing')}`}>
                        2
                      </div>
                      <p className="text-xs font-medium">Processing</p>
                    </div>
                    <div className="text-center w-1/4">
                      <div className={`mx-auto rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium mb-1 ${getStatusStepStyles(order.status, 'ready')}`}>
                        3
                      </div>
                      <p className="text-xs font-medium">Ready</p>
                    </div>
                    <div className="text-center w-1/4">
                      <div className={`mx-auto rounded-full w-10 h-10 flex items-center justify-center text-xs font-medium mb-1 ${getStatusStepStyles(order.status, 'completed')}`}>
                        4
                      </div>
                      <p className="text-xs font-medium">Completed</p>
                    </div>
                  </div>
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10"></div>
                </div>
              ) : (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Order Cancelled</AlertTitle>
                  <AlertDescription>
                    This order has been cancelled. Please contact support if you believe this is an error.
                  </AlertDescription>
                </Alert>
              )}
              
              {/* Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Order Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Pickup Date & Time</p>
                        <p className="text-sm text-muted-foreground">
                          {order.pickup_datetime}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Pickup Location</p>
                        <p className="text-sm text-muted-foreground">
                          {order.pickup_location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Payment Status</p>
                        <p className="text-sm text-muted-foreground">
                          {order.payment_status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Customer Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{order.customer_name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{order.customer_name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer_phone}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer_email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Items */}
              <div>
                <h3 className="text-lg font-medium mb-4">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-start gap-2">
                        <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center text-xs">
                          {item.quantity}
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                        </div>
                      </div>
                      <p>{item.price}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between items-center font-medium">
                    <p>Total</p>
                    <p>{order.total_amount}</p>
                  </div>
                </div>
              </div>
              
              {/* Special Instructions */}
              {order.special_instructions && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Special Instructions</h3>
                  <p className="text-sm">{order.special_instructions}</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline" onClick={() => navigate('/my-orders')}>
                Back to All Orders
              </Button>
              
              {order.status === 'ready' && (
                <Button variant="default" className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Confirm Pickup</span>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
