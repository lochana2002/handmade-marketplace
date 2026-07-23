import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaTags,
  FaCog,
} from "react-icons/fa";

function AdminSidebar() {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin",
    },
    {
      name: "Products",
      icon: <FaBoxOpen />,
      path: "/admin/products",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      name: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      name: "Categories",
      icon: <FaTags />,
      path: "/admin/categories",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8 text-orange-500">
        ArtisanHub
      </h1>

      <div className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            to={menu.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition
            ${
              location.pathname === menu.path
                ? "bg-orange-500"
                : "hover:bg-gray-700"
            }`}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;