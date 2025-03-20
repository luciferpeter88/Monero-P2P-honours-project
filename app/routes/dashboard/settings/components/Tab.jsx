import { Link, useLocation } from "@remix-run/react";
import { UserPen, ShieldCheck, SunMoon, Bell } from "lucide-react";
export default function Tabs({ colorType }) {
  const location = useLocation(); // Get current route path

  // Define tab options with paths
  const tabs = [
    {
      id: "tab1",
      name: "Profile",
      icon: <UserPen size={16} />,
      path: "/dashboard/settings",
    },
    {
      id: "tab2",
      name: "Security",
      icon: <ShieldCheck size={16} />,
      path: "/dashboard/settings/security",
    },
    {
      id: "tab3",
      name: "Appearance",
      icon: <SunMoon size={16} />,
      path: "/dashboard/settings/appearance",
    },
    {
      id: "tab4",
      name: "Notification",
      icon: <Bell size={16} />,
      path: "/dashboard/settings/notification",
    },
  ];

  return (
    <div
      className="relative flex items-center bg-third rounded-lg p-1 w-full mx-auto"
      style={{ backgroundColor: colorType?.tertiary }}
    >
      {/* Moving Indicator */}
      <div
        className={` h-8 bg-white rounded-md transition-all duration-200 shadow-md`}
      />

      {/* Tab Labels */}
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          to={tab.path}
          className={`flex-1 text-center py-2 text-sm font-medium relative z-10 ${
            location.pathname === tab.path
              ? "text-secondary bg-primary rounded-lg"
              : "text-muted-foreground"
          }`}
          style={
            location.pathname === tab.path
              ? {
                  color: colorType?.secondary,
                  backgroundColor: colorType?.primary,
                }
              : {}
          }
        >
          <div className="flex items-center justify-center gap-2">
            {tab.icon}
            {tab.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
