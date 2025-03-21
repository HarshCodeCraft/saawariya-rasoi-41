
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClipboardList, ChevronRight, Calendar, Clock, MapPin, ShoppingBag } from 'lucide-react';
import { convertJsonToOrderItems, OrderItem } from '@/utils/orders';
import { Json } from '@/integrations/supabase/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

interface OrderWithItems {
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

const MyOrders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        toast({
          title: "Authentication required",
          description: "Please log in to view your orders",
          variant: "destructive",
        });
        navigate('/auth?mode=login');
        return;
      }
      
      fetchOrders();
    };
    
    checkAuth();
  }, [navigate]);
  
  // Subscribe to realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('orders-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        (payload) => {
          console.log('Realtime update:', payload);
          fetchOrders(); // Refresh orders when there's an update
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      const { data: orderData, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (orderData) {
        const processedOrders = orderData.map(order => {
          return {
            ...order,
            items: convertJsonToOrderItems(order.items as Json),
            status: (order.status as 'pending' | 'processing' | 'ready' | 'completed' | 'cancelled') || 'pending'
          };
        });
        
        setOrders(processedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Failed to load orders",
        description: "There was a problem fetching your order history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getStatusBadgeStyles = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'ready':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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
  
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">My Orders</h1>
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-bold">My Orders</h1>
            </div>
            
            <Button 
              variant="default" 
              onClick={() => navigate('/menu')}
              className="gap-2"
            >
              <ShoppingBag size={16} />
              <span>Place New Order</span>
            </Button>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 md:w-auto w-full">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="ready">Ready</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No orders found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      {activeTab === 'all' 
                        ? "You haven't placed any orders yet. Browse our menu and place your first order!"
                        : `You don't have any ${activeTab} orders.`}
                    </p>
                    {activeTab !== 'all' && (
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveTab('all')}
                        className="mt-4"
                      >
                        View all orders
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg flex items-center gap-2">
                              Order #{order.order_id}
                            </CardTitle>
                            <CardDescription>
                              Placed on {formatDate(order.created_at)} at {formatTime(order.created_at)}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusBadgeStyles(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-sm font-medium">Pickup Date</p>
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
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-2">Items</p>
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-right">Qty</TableHead>
                                  <TableHead className="text-right">Price</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {order.items.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="text-right">{item.quantity}</TableCell>
                                    <TableCell className="text-right">{item.price}</TableCell>
                                  </TableRow>
                                ))}
                                <TableRow>
                                  <TableCell colSpan={2} className="text-right font-medium">Total</TableCell>
                                  <TableCell className="text-right font-medium">{order.total_amount}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                          
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                Payment: {order.payment_status}
                              </span>
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="gap-1"
                              onClick={() => navigate(`/order/${order.order_id}`)}
                            >
                              <span>View Details</span>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default MyOrders;
