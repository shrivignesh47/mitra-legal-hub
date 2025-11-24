import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Star } from 'lucide-react';
import { format } from 'date-fns';

interface Booking {
  id: string;
  scheduled_at: string;
  status: string;
  notes: string;
  service: {
    title: string;
    category: string;
    price: number;
  };
  provider: {
    user_id: string;
    specialization: string;
    rating: number;
    profiles: {
      full_name: string;
    };
  };
}

const ClientDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
    
    // Real-time subscription for bookings
    const channel = supabase
      .channel('client-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `client_id=eq.${user?.id}`
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

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          scheduled_at,
          status,
          notes,
          service:services(title, category, price),
          provider:providers(
            user_id,
            specialization,
            rating
          )
        `)
        .eq('client_id', user?.id)
        .order('scheduled_at', { ascending: false });

      if (error) throw error;
      
      // Fetch provider profiles separately
      const bookingsWithProfiles = await Promise.all(
        (data || []).map(async (booking: any) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', booking.provider.user_id)
            .single();
          
          return {
            ...booking,
            provider: {
              ...booking.provider,
              profiles: profile || { full_name: 'Unknown' }
            }
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

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold text-gradient-primary mb-2">Client Dashboard</h1>
        <p className="text-muted-foreground">Manage your legal service bookings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Bookings</CardTitle>
            <CardDescription>View and manage your scheduled legal consultations</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No bookings yet</p>
                <Button className="mt-4" onClick={() => window.location.href = '/#providers'}>
                  Find Providers
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{booking.service.title}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{booking.provider.profiles.full_name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4" />
                              <span>{booking.provider.rating.toFixed(1)}</span>
                            </div>
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
                            ₹{booking.service.price}
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
    </div>
  );
};

export default ClientDashboard;
