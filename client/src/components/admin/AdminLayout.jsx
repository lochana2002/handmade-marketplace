import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;