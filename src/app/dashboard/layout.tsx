import {ProtectedRoute} from "@/components/ProtectedRoute";
import '../globals.css'


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
