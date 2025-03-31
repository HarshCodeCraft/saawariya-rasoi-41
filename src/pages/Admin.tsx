import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, LogOut, Shield, Search, Filter, Calendar, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AdminDashboard from '@/components/AdminDashboard';
import { OrderItem, convertJsonToOrderItems } from '@/utils/orders';
import { Json } from '@/integrations/supabase/types';

interface UserProfile {
  id: string;
  role: string;
  created_at: string;
  email?: string;
}

interface Order {
  id: string;
  user_id?: string;
  user_email?: string;
  user_name?: string;
  user_phone?: string;
  order_date?: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  pickup_location: string;
  pickup_datetime: string;
  items: OrderItem[];
  total_amount: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  is_bulk_order?: boolean;
  special_instructions?: string;
  payment_status: string;
  created_at: string;
}

const Admin = () => {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [bulkOrders, setBulkOrders] = useState<Order[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const ordersPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          toast({
            title: "Authentication required",
            description: "You must be logged in to access the admin panel",
            variant: "destructive",
          });
          navigate('/auth');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionData.session.user.id)
          .single();

        if (profileError || profileData?.role !== 'admin') {
          setIsAdmin(false);
          toast({
            title: "Access denied",
            description: "You do not have admin privileges",
            variant: "destructive",
          });
        } else {
          setIsAdmin(true);
          fetchUserData();
          fetchOrderData();
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) return;
      
      const token = sessionData.session.access_token;
      
      const response = await fetch('https://xwdtqctvqypjtnkwgwxz.functions.supabase.co/list-users', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch users');
      }
      
      const { users } = await response.json();
      
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      
      const userProfiles = profilesData.map(profile => {
        const user = users.find((u: any) => u.id === profile.id);
        return {
          ...profile,
          email: user?.email || 'Email not available',
        };
      });
      
      setProfiles(userProfiles);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        title: "Failed to load user data",
        description: "There was a problem fetching the user profiles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchOrderData = async () => {
    try {
      setRefreshing(true);
      
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (ordersError) {
        throw ordersError;
      }
      
      console.log('Fetched orders:', ordersData);
      
      if (ordersData && ordersData.length > 0) {
        const processedOrders = ordersData.map(order => {
          const orderItems = convertJsonToOrderItems(order.items);
          
          return {
            id: order.id,
            order_id: order.order_id,
            customer_name: order.customer_name,
            customer_email: order.customer_email,
            customer_phone: order.customer_phone,
            user_phone: order.customer_phone,
            pickup_location: order.pickup_location,
            pickup_datetime: order.pickup_datetime,
            items: orderItems,
            total_amount: order.total_amount,
            status: order.status as 'pending' | 'processing' | 'completed' | 'cancelled',
            special_instructions: order.special_instructions,
            payment_status: order.payment_status,
            created_at: order.created_at,
            user_email: order.customer_email,
            user_name: order.customer_name,
            order_date: order.created_at,
            is_bulk_order: orderItems.length > 10
          };
        });
        
        setOrders(processedOrders.filter(order => !order.is_bulk_order));
        setBulkOrders(processedOrders.filter(order => order.is_bulk_order));
      } else {
        const mockOrders: Order[] = [
          {
            id: 'ORD-1001',
            user_id: '123',
            user_email: 'customer1@example.com',
            user_name: 'John Doe',
            order_date: '2023-07-15T10:30:00Z',
            items: [
              { name: 'Paneer Butter Masala', quantity: 2, price: '₹250' },
              { name: 'Naan', quantity: 4, price: '₹40' }
            ],
            total_amount: '₹660',
            status: 'completed',
            is_bulk_order: false,
            customer_phone: '+91 9876543210',
            customer_name: 'John Doe',
            customer_email: 'customer1@example.com',
            pickup_location: 'Saawariya Rasoi, Kanpur',
            pickup_datetime: '2023-07-20T12:00:00Z',
            order_id: 'ORD-1001',
            payment_status: 'completed',
            created_at: '2023-07-15T10:30:00Z'
          },
          {
            id: 'ORD-1002',
            user_id: '456',
            user_email: 'customer2@example.com',
            user_name: 'Jane Smith',
            order_date: '2023-07-16T18:45:00Z',
            items: [
              { name: 'Chicken Biryani', quantity: 1, price: '₹350' },
              { name: 'Raita', quantity: 1, price: '₹50' }
            ],
            total_amount: '₹400',
            status: 'processing',
            is_bulk_order: false,
            customer_phone: '+91 9876543211',
            customer_name: 'Jane Smith',
            customer_email: 'customer2@example.com',
            pickup_location: 'Saawariya Rasoi, Kanpur',
            pickup_datetime: '2023-07-20T12:00:00Z',
            order_id: 'ORD-1002',
            payment_status: 'completed',
            created_at: '2023-07-16T18:45:00Z'
          },
          {
            id: 'BLK-1003',
            user_id: '789',
            user_email: 'customer3@example.com',
            user_name: 'Robert Johnson',
            order_date: '2023-07-17T14:20:00Z',
            items: [
              { name: 'Veg Thali', quantity: 25, price: '₹200' }
            ],
            total_amount: '₹5000',
            status: 'pending',
            is_bulk_order: true,
            special_instructions: 'All meals should be packed separately.',
            pickup_location: 'Saawariya Rasoi, Kanpur',
            pickup_datetime: '2023-07-20T12:00:00Z',
            customer_phone: '+91 9876543212',
            customer_name: 'Robert Johnson',
            customer_email: 'customer3@example.com',
            order_id: 'BLK-1003',
            payment_status: 'pending',
            created_at: '2023-07-17T14:20:00Z'
          },
          {
            id: 'ORD-1004',
            user_id: '012',
            user_email: 'customer4@example.com',
            user_name: 'Sarah Wilson',
            order_date: '2023-07-18T11:10:00Z',
            items: [
              { name: 'Dal Makhani', quantity: 1, price: '₹180' },
              { name: 'Jeera Rice', quantity: 1, price: '₹120' }
            ],
            total_amount: '₹300',
            status: 'completed',
            is_bulk_order: false,
            customer_phone: '+91 9876543213',
            customer_name: 'Sarah Wilson',
            customer_email: 'customer4@example.com',
            pickup_location: 'Saawariya Rasoi, Kanpur',
            pickup_datetime: '2023-07-20T12:00:00Z',
            order_id: 'ORD-1004',
            payment_status: 'completed',
            created_at: '2023-07-18T11:10:00Z'
          },
          {
            id: 'BLK-1005',
            user_id: '345',
            user_email: 'customer5@example.com',
            user_name: 'Michael Brown',
            order_date: '2023-07-19T16:30:00Z',
            items: [
              { name: 'Chole Bhature', quantity: 30, price: '₹150' }
            ],
            total_amount: '₹4500',
            status: 'processing',
            is_bulk_order: true,
            special_instructions: 'Need extra chutney with each order',
            pickup_location: 'Saawariya Rasoi, Kanpur',
            pickup_datetime: '2023-07-22T13:30:00Z',
            customer_phone: '+91 9876543214',
            customer_name: 'Michael Brown',
            customer_email: 'customer5@example.com',
            order_id: 'BLK-1005',
            payment_status: 'pending',
            created_at: '2023-07-19T16:30:00Z'
          }
        ];
        
        const bulkOrdersData = mockOrders.filter(order => order.is_bulk_order);
        const regularOrders = mockOrders.filter(order => !order.is_bulk_order);
        
        setOrders(regularOrders);
        setBulkOrders(bulkOrdersData);
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
      toast({
        title: "Failed to load order data",
        description: "There was a problem fetching the orders",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    fetchUserData();
    fetchOrderData();
  };

  const handleBulkOrderNotification = async (order: Order) => {
    const orderDetails = {
      orderId: order.order_id,
      customerName: order.customer_name,
      customerEmail: order.customer_email,
      customerPhone: order.customer_phone,
      pickupLocation: order.pickup_location || "Saawariya Rasoi, Kanpur",
      pickupDateTime: order.pickup_datetime || "Not specified",
      items: order.items,
      totalAmount: order.total_amount,
      paymentStatus: order.payment_status,
      specialInstructions: order.special_instructions || "None",
    };

    try {
      import('@/utils/notification').then(({ sendBulkOrderNotification }) => {
        sendBulkOrderNotification(orderDetails);
      });
      
      toast({
        title: "Notification Sent",
        description: "The bulk order notification has been sent to the admin.",
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      toast({
        title: "Notification Failed",
        description: "Failed to send the bulk order notification.",
        variant: "destructive",
      });
    }
  };

  const filterOrders = (orderList: Order[]) => {
    return orderList.filter(order => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        searchQuery === '' || 
        order.id.toLowerCase().includes(searchLower) ||
        order.user_name.toLowerCase().includes(searchLower) ||
        order.user_email.toLowerCase().includes(searchLower);
      
      const matchesStatus = 
        statusFilter === 'all' || 
        order.status === statusFilter;
      
      const matchesDate = 
        dateFilter === '' || 
        new Date(order.order_date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString();
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const filteredOrders = filterOrders(orders);
  const filteredBulkOrders = filterOrders(bulkOrders);
  
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const currentBulkOrders = filteredBulkOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalRegularPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const totalBulkPages = Math.ceil(filteredBulkOrders.length / ordersPerPage);

  const generateTopSellingItems = () => {
    const itemMap = new Map();
    
    const allOrders = [...orders, ...bulkOrders];
    
    allOrders.forEach(order => {
      order.items.forEach(item => {
        const existingItem = itemMap.get(item.name);
        const price = parseInt(item.price.replace(/[^0-9]/g, ''));
        const revenue = price * item.quantity;
        
        if (existingItem) {
          itemMap.set(item.name, {
            name: item.name,
            quantity: existingItem.quantity + item.quantity,
            revenue: existingItem.revenue + revenue
          });
        } else {
          itemMap.set(item.name, {
            name: item.name,
            quantity: item.quantity,
            revenue: revenue
          });
        }
      });
    });
    
    const topItems = Array.from(itemMap.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5)
      .map(item => ({
        ...item,
        revenue: `₹${item.revenue}`
      }));
      
    return topItems;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <p className="text-center">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-6 py-24">
          <Alert variant="destructive" className="mx-auto max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription>
              You do not have permission to access the admin panel.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  const allOrders = [...orders, ...bulkOrders];
  const pendingOrders = allOrders.filter(order => order.status === 'pending').length;
  const totalOrders = allOrders.length;
  const totalUsers = new Set(allOrders.map(order => order.user_id)).size;
  const recentOrders = [...allOrders].sort((a, b) => 
    new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
  ).slice(0, 10);
  const topSellingItems = generateTopSellingItems();

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={handleRefresh} 
            className="gap-2"
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            {refreshing ? "Refreshing..." : "Refresh Data"}
          </Button>
          
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-[240px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select 
              className="border rounded p-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <div className="relative">
              <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                className="pl-8 w-[180px]"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="bulk-orders">Bulk Orders</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <AdminDashboard 
              totalOrders={totalOrders}
              totalUsers={totalUsers}
              pendingOrders={pendingOrders}
              recentOrders={recentOrders}
              topSellingItems={topSellingItems}
            />
          </TabsContent>
          
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Regular Orders</CardTitle>
                <CardDescription>
                  Manage all regular takeaway and delivery orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No orders found. Try changing your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{order.user_name}</div>
                            <div className="text-xs text-muted-foreground">{order.user_email}</div>
                          </TableCell>
                          <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="max-h-24 overflow-y-auto text-sm">
                              {order.items.map((item, idx) => (
                                <div key={idx}>
                                  {item.name} x {item.quantity}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{order.total_amount}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                              ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                              ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                              ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                              ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}`
                            }>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">View Details</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {totalRegularPages > 1 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalRegularPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalRegularPages))}
                          disabled={currentPage === totalRegularPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bulk-orders">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Orders</CardTitle>
                <CardDescription>
                  Manage all large volume orders for events and catering
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentBulkOrders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          No bulk orders found. Try changing your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentBulkOrders.map((order) => (
                        <TableRow key={order.id} className="bg-amber-50">
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{order.user_name}</div>
                            <div className="text-xs text-muted-foreground">{order.user_email}</div>
                          </TableCell>
                          <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="max-h-24 overflow-y-auto text-sm">
                              {order.items.map((item, idx) => (
                                <div key={idx}>
                                  {item.name} x {item.quantity}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>{order.total_amount}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                              ${order.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                              ${order.status === 'processing' ? 'bg-blue-100 text-blue-800' : ''}
                              ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                              ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}`
                            }>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View Details</Button>
                              <Button 
                                variant="secondary" 
                                size="sm"
                                onClick={() => handleBulkOrderNotification(order)}
                              >
                                Send Notification
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
                {totalBulkPages > 1 && (
                  <Pagination className="mt-4">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalBulkPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalBulkPages))}
                          disabled={currentPage === totalBulkPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage all users registered in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profiles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-8">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>{profile.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              profile.role === 'admin' 
                                ? 'bg-primary/20 text-primary' 
                                : 'bg-secondary/20 text-secondary-foreground'
                            }`}>
                              {profile.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(profile.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
