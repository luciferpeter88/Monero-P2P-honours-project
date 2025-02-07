import {
  Lock,
  Mail,
  Phone,
  Shield,
  Key,
  Settings,
  CheckCircle,
  Smartphone,
} from "lucide-react";
import SectionHeader from "../components/SectionHeader";
import SecurityFeature from "../components/SecurityFeature";

export default function Index() {
  return (
    <div className="w-full mt-5 bg-primary text-white">
      <div className="bg-third p-6 rounded-lg">
        <SectionHeader
          title="Authentication methods"
          description="Protect your funds by improving account security"
        />
        <div className="space-y-4">
          <SecurityFeature
            icon={<Key size={20} className="text-muted-foreground" />}
            title="Passkeys"
            description="Use passkeys for a secure, passwordless login experience, tied to your device"
            buttonLabel="Set up"
            modalType="passkey"
          />
          <SecurityFeature
            icon={<Phone size={20} className="text-muted-foreground" />}
            title="Phone authentication"
            description="Enable phone authentication for additional security during logins and transactions"
            buttonLabel="Set up"
            modalType="phone"
          />
          <SecurityFeature
            icon={<Mail size={20} className="text-muted-foreground" />}
            title="Phone authentication"
            description="Enable phone authentication for additional security during logins and transactions"
            buttonLabel="Set up"
            modalType="phone"
          />
          <SecurityFeature
            icon={<Shield size={20} className="text-muted-foreground" />}
            title="Anti-phishing code"
            description="Set up a personalized code to ensure emails from the platform are authentic"
            buttonLabel="Set up"
            modalType="antiphishing"
          />
          <SecurityFeature
            icon={<Lock size={20} className="text-muted-foreground" />}
            title="Google Authentication"
            description="Sign in with your Google account for secure and fast authentication"
            buttonLabel="Sign in with Google"
            modalType="google-auth"
          />
          <SecurityFeature
            icon={<Smartphone size={20} className="text-muted-foreground" />}
            title="Mobile App Authentication"
            description="Use a mobile authentication app (like Microsoft Authenticator) for secure logins"
            buttonLabel="Set up mobile authentication"
            modalType="mobile-auth"
          />
          <SecurityFeature
            icon={<Mail size={20} className="text-muted-foreground" />}
            title="Email authentication"
            description="Use email authentication for login and transaction confirmations"
            buttonLabel="Change email"
            modalType="email"
          />
          <SecurityFeature
            icon={<Lock size={20} className="text-muted-foreground" />}
            title="Login password"
            description="Set a strong password to protect your account from unauthorized access"
            buttonLabel="Change password"
            modalType="password"
          />
        </div>
      </div>

      {/* Advanced Security */}
      <div className="mt-5 p-6 bg-third rounded-lg">
        <SectionHeader title="Advanced security" />
        <div className="space-y-4">
          <SecurityFeature
            icon={<Settings size={20} className="text-muted-foreground" />}
            title="Device management"
            description="Review and manage all devices currently authorized to access your account"
            buttonLabel="Manage"
            modalType="devices"
          />
          <SecurityFeature
            icon={<CheckCircle size={20} className="text-muted-foreground" />}
            title="Trading permissions"
            description="Control what types of trades and transactions your account is allowed to perform"
            buttonLabel="Turn on"
            modalType="trading"
          />
        </div>
      </div>

      {/* Trusted Devices & IP Logs */}
      <div className="bg-third mt-5 p-6 rounded-lg">
        <SectionHeader title="Trusted Devices and IP Addresses" />
        <div className=" p-4 rounded-lg">
          <table className="w-full text-left text-sm text-muted-foreground">
            <thead className="bg-primary">
              <tr>
                <th className="p-3">Trusted Device</th>
                <th className="p-3">Login IP</th>
                <th className="p-3">Recent Activity</th>
                <th className="p-3">Recent Activity Device</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-700">
                <td className="p-3">Macbook Pro</td>
                <td className="p-3">192.168.1.10</td>
                <td className="p-3">5 min ago</td>
                <td className="p-3">Safari - macOS</td>
              </tr>
              <tr className="border-t border-gray-700">
                <td className="p-3">iPhone 13</td>
                <td className="p-3">192.168.1.20</td>
                <td className="p-3">10 min ago</td>
                <td className="p-3">Chrome - iOS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
