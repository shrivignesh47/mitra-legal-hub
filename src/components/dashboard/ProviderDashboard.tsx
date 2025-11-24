import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, TrendingUp, DollarSign } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  scheduled_at: string;
  status: string;
  notes: string;
  service: {
    title: string;
    price: number;
  };
  profiles: {
    full_name: string;
  };
}

interface ProviderData {
  id: string;
  specialization: string;
  rating: number;
  total_reviews: number;
  hourly_rate: number;
}

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [providerData, setProviderData] = useState<ProviderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviderData();
    fetchBookings();
    
    // Real-time subscription for bookings
    const channel = supabase
      .channel('provider-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const fetchProviderData = async () => {
    try {
      const { data, error } = await supabase
        .from('providers')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      setProviderData(data);
    } catch (error) {
      console.error('Error fetching provider data:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      if (!providerData?.id) return;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          scheduled_at,
          status,
          notes,
          client_id,
          service:services(title, price)
        `)
        .eq('provider_id', providerData.id)
        .order('scheduled_at', { ascending: false });

      if (error) throw error;
      
      // Fetch client profiles separately
      const bookingsWithProfiles = await Promise.all(
        (data || []).map(async (booking: any) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', booking.client_id)
            .single();
          
          return {
            ...booking,
            profiles: profile || { full_name: 'Unknown' }
          };
        })
      );
      
      setBookings(bookingsWithProfiles);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const totalEarnings = bookings
    .filter(b => b.status === 'completed')
    .reduce((acc, b) => acc + (b.service?.price || 0), 0);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">Provider Dashboard</h1>
        <p className="text-muted-foreground">Manage your legal services and bookings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{providerData?.rating.toFixed(1) || '0.0'}</div>
            <p className="text-xs text-muted-foreground">
              {providerData?.total_reviews || 0} reviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalEarnings}</div>
            <p className="text-xs text-muted-foreground">
              From {bookings.filter(b => b.status === 'completed').length} completed bookings
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hourly Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{providerData?.hourly_rate || 0}</div>
            <p className="text-xs text-muted-foreground">Per hour</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>Manage your client appointments</CardDescription>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No bookings yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{booking.service?.title}</h3>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          <span>{booking.profiles?.full_name}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(booking.scheduled_at), 'PPP')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{format(new Date(booking.scheduled_at), 'p')}</span>
                          </div>
                        </div>

                        {booking.notes && (
                          <p className="text-sm text-muted-foreground">{booking.notes}</p>
                        )}
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ₹{booking.service?.price}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboard;
