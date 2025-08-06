import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: string | string[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRoles, 
  redirectTo = '/login' 
}: ProtectedRouteProps) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  // Show loading skeleton while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto space-y-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </div>
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRoles && !hasRole(requiredRoles)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

// Convenience components for specific roles
export const AdminRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles="admin">{children}</ProtectedRoute>
);

export const HRRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles={['admin', 'hr']}>{children}</ProtectedRoute>
);

export const EmployeeRoute = ({ children }: { children: ReactNode }) => (
  <ProtectedRoute requiredRoles="employee">{children}</ProtectedRoute>
);