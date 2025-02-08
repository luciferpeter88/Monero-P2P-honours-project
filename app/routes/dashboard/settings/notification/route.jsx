import React, { useState } from "react";
import {
  Card,
  CardContent,
} from "../../../../../src/components/components/ui/card";

import { Switch } from "../../../../../src/components/components/ui/switch";

export default function Index() {
  const [notifications, setNotifications] = useState({
    newMessage: { enabled: false, method: "email" },
    feedbackReceived: { enabled: false, method: "email" },
    tradeStatusUpdate: { enabled: false, method: "email" },
    systemAlert: { enabled: false, method: "email" },
    promotionalOffers: { enabled: false, method: "email" },
    securityAlert: { enabled: false, method: "email" },
    appUpdates: { enabled: false, method: "email" },
    emailNotifications: { enabled: false },
    pushNotifications: { enabled: false },
    smsNotifications: { enabled: false },
  });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: { ...prev[key], enabled: !prev[key].enabled },
    }));
  };
  const notificationSettings = [
    {
      key: "newMessage",
      label: "New Message",
      description: "Receive a notification when someone sends you a message",
    },
    {
      key: "feedbackReceived",
      label: "Feedback Received",
      description: "Get notified when you receive feedback after a transaction",
    },
    {
      key: "tradeStatusUpdate",
      label: "Trade Status Updates",
      description: "Be informed of updates on your trades and transactions",
    },
    {
      key: "systemAlert",
      label: "System Alerts",
      description: "Important alerts regarding platform status and operations",
    },
    {
      key: "promotionalOffers",
      label: "Promotional Offers",
      description: "Receive special offers and promotions from the platform",
    },
    {
      key: "securityAlert",
      label: "Security Alerts",
      description: "Get notified about suspicious activity and security issues",
    },
    {
      key: "appUpdates",
      label: "App Updates",
      description: "Stay updated with the latest features and improvements",
    },
  ];
  const notificationPreferences = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
      description: "Receive notifications via email",
    },
    {
      key: "pushNotifications",
      label: "Push Notifications",
      description: "Get instant notifications on your device",
    },
    {
      key: "smsNotifications",
      label: "SMS Notifications",
      description: "Receive notifications through text messages",
    },
  ];
  return (
    <React.Fragment>
      <div className="p-6 space-y-1 bg-third rounded-lg mt-5">
        <h1 className="text-xl font-medium">Notification Settings</h1>
        <p className="text-muted-foreground">
          Manage how you receive notifications from the platform
        </p>

        <Card>
          <CardContent className="space-y-4 mt-5 bg-third ">
            {notificationSettings.map(({ key, label, description }) => (
              <div
                key={key}
                className="flex justify-between items-center p-4  hover:bg-primary rounded-lg "
              >
                <div>
                  <h2 className="font-medium text-sm text-white">{label}</h2>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Switch
                    className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted-foreground"
                    checked={notifications[key].enabled}
                    onCheckedChange={() => toggleNotification(key)}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="p-6 space-y-3 bg-third rounded-lg mt-5">
        <h2 className="text-xl font-medium">Notification Preferences</h2>

        <Card>
          <CardContent className="space-y-4 bg-third">
            {notificationPreferences.map(({ key, label, description }) => (
              <div
                key={key}
                className="flex justify-between items-center p-4  hover:bg-primary rounded-lg "
              >
                <div>
                  <h2 className="font-medium text-sm text-white">{label}</h2>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                <Switch
                  className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted-foreground"
                  checked={notifications[key].enabled}
                  onCheckedChange={() => toggleNotification(key)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}
