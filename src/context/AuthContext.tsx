import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Profile, UserRole, Order, DownloadLog, ServiceRequest } from '../types';
import { INITIAL_SERVICE_REQUESTS } from '../data/seedData';

interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  role: UserRole | null;
  isAdmin: boolean;
  isContributor: boolean;
  isCustomer: boolean;
  orders: Order[];
  downloadLogs: DownloadLog[];
  userRequests: ServiceRequest[];
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    pass: string,
    fullName: string,
    phone?: string,
    company?: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchMockRole: (role: UserRole) => void;
  recordOrder: (order: Order) => void;
  recordDownload: (log: DownloadLog) => void;
  submitServiceRequest: (req: ServiceRequest) => void;
  updateServiceRequest: (id: string, updates: Partial<ServiceRequest>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial mock users for test drive when Supabase credentials are pending
const MOCK_PROFILES: Record<UserRole, Profile> = {
  admin: {
    id: 'user-admin-01',
    email: 'admin@sheetora.com',
    full_name: 'مدير منصة شيتورا',
    phone: '+201099887766',
    company_name: 'Sheetora HQ',
    preferred_language: 'ar',
    role: 'admin',
    created_at: '2026-01-01T00:00:00Z',
  },
  customer: {
    id: 'user-client-01',
    email: 'client@al-nour.eg',
    full_name: 'م. أحمد حسام',
    phone: '+201012345678',
    company_name: 'شركة النور للنقل والتوزيع',
    preferred_language: 'ar',
    role: 'customer',
    created_at: '2026-02-10T12:00:00Z',
  },
  contributor: {
    id: 'user-contributor-01',
    email: 'author@excelcraft.com',
    full_name: 'طارق صلاح (مطور إكسل)',
    phone: '+201122334455',
    company_name: 'ExcelCraft Studio',
    preferred_language: 'ar',
    role: 'contributor',
    created_at: '2026-03-05T09:00:00Z',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => {
    const saved = localStorage.getItem('sheetora_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return MOCK_PROFILES.customer;
      }
    }
    // Default logged in user as customer for immediate exploration
    return MOCK_PROFILES.customer;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('sheetora_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'ord-1001',
        user_id: 'user-client-01',
        order_number: 'ORD-2026-041',
        total_egp: 299,
        currency: 'EGP',
        status: 'paid',
        payment_provider: 'paymob',
        created_at: '2026-04-05T10:00:00Z',
        paid_at: '2026-04-05T10:02:15Z',
        items: [
          {
            id: 'item-101',
            order_id: 'ord-1001',
            template_id: 'tpl-egypt-payroll-2026',
            title_snapshot: 'مسير رواتب الشركات المتكامل (الضرائب والتأمينات المصرية)',
            unit_price_egp: 299,
            quantity: 1,
            subtotal_egp: 299,
          },
        ],
      },
    ];
  });

  const [downloadLogs, setDownloadLogs] = useState<DownloadLog[]>(() => {
    const saved = localStorage.getItem('sheetora_downloads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [
      {
        id: 'dl-1',
        user_id: 'user-client-01',
        template_id: 'tpl-cashflow-planner-free',
        downloaded_at: '2026-04-01T14:22:00Z',
      },
      {
        id: 'dl-2',
        user_id: 'user-client-01',
        template_id: 'tpl-egypt-payroll-2026',
        order_id: 'ord-1001',
        downloaded_at: '2026-04-05T10:05:00Z',
      },
    ];
  });

  const [userRequests, setUserRequests] = useState<ServiceRequest[]>(() => {
    const saved = localStorage.getItem('sheetora_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SERVICE_REQUESTS;
      }
    }
    return INITIAL_SERVICE_REQUESTS;
  });

  // Persist local state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('sheetora_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sheetora_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sheetora_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('sheetora_downloads', JSON.stringify(downloadLogs));
  }, [downloadLogs]);

  useEffect(() => {
    localStorage.setItem('sheetora_requests', JSON.stringify(userRequests));
  }, [userRequests]);

  // If Supabase is configured, listen to real auth changes
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          fetchSupabaseProfile(session.user.id, session.user.email || '');
        }
      });

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            await fetchSupabaseProfile(session.user.id, session.user.email || '');
          } else {
            setUser(null);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const fetchSupabaseProfile = async (userId: string, email: string) => {
    if (!supabase) return;
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      const { data: roleRow } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (profile) {
        setUser({
          id: profile.id,
          email: profile.email || email,
          full_name: profile.full_name || 'مستخدم شيتورا',
          phone: profile.phone,
          company_name: profile.company_name,
          preferred_language: profile.preferred_language || 'ar',
          role: (roleRow?.role as UserRole) || 'customer',
          created_at: profile.created_at,
        });
      }
    } catch (err) {
      console.warn('Failed to fetch profile from Supabase:', err);
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          await fetchSupabaseProfile(data.user.id, data.user.email || email);
        }
        return { success: true };
      }

      // Fallback local authentication
      const isEmailAdmin = email.toLowerCase().includes('admin');
      const isEmailContributor = email.toLowerCase().includes('author') || email.toLowerCase().includes('contributor');
      const targetRole: UserRole = isEmailAdmin ? 'admin' : isEmailContributor ? 'contributor' : 'customer';

      const matchedProfile = {
        ...MOCK_PROFILES[targetRole],
        email,
      };
      setUser(matchedProfile);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'خطأ في تسجيل الدخول';
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    email: string,
    pass: string,
    fullName: string,
    phone?: string,
    company?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: {
            data: {
              full_name: fullName,
              phone: phone || null,
              company_name: company || null,
            },
          },
        });
        if (error) throw error;
        if (data.user) {
          setUser({
            id: data.user.id,
            email,
            full_name: fullName,
            phone,
            company_name: company,
            preferred_language: 'ar',
            role: 'customer',
            created_at: new Date().toISOString(),
          });
        }
        return { success: true };
      }

      // Fallback local registration (strictly customer role - no privilege escalation)
      const newCustomer: Profile = {
        id: `user-${Date.now()}`,
        email,
        full_name: fullName,
        phone: phone || null,
        company_name: company || null,
        preferred_language: 'ar',
        role: 'customer',
        created_at: new Date().toISOString(),
      };
      setUser(newCustomer);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذر إتمام التسجيل';
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
  };

  const switchMockRole = (targetRole: UserRole) => {
    setUser(MOCK_PROFILES[targetRole]);
  };

  const recordOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const recordDownload = (log: DownloadLog) => {
    setDownloadLogs((prev) => [log, ...prev]);
  };

  const submitServiceRequest = (req: ServiceRequest) => {
    setUserRequests((prev) => [req, ...prev]);
  };

  const updateServiceRequest = (id: string, updates: Partial<ServiceRequest>) => {
    setUserRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates, updated_at: new Date().toISOString() } : r))
    );
  };

  const role = user?.role || null;
  const isAdmin = role === 'admin';
  const isContributor = role === 'contributor';
  const isCustomer = role === 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        role,
        isAdmin,
        isContributor,
        isCustomer,
        orders,
        downloadLogs,
        userRequests,
        login,
        register,
        logout,
        switchMockRole,
        recordOrder,
        recordDownload,
        submitServiceRequest,
        updateServiceRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
