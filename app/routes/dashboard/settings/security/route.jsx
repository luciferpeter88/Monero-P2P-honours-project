import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../src/components/components/ui/dialog";
import { Button } from "../../../../../src/components/components/ui/button";
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
import { Input } from "../../../../../src/components/components/ui/input";
import { Switch } from "../../../../../src/components/components/ui/switch";

export default function Index() {
  return (
    <div className="w-full mt-5 bg-third text-white rounded-lg p-6 shadow-lg">
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

      {/* Advanced Security */}
      <SectionHeader title="Advanced security" />
      <div className="space-y-4">
        <SecurityFeature
          icon={<Settings size={20} className="text-gray-400" />}
          title="Device management"
          description="Review and manage all devices currently authorized to access your account"
          buttonLabel="Manage"
          modalType="devices"
        />
        <SecurityFeature
          icon={<CheckCircle size={20} className="text-gray-400" />}
          title="Trading permissions"
          description="Control what types of trades and transactions your account is allowed to perform"
          buttonLabel="Turn on"
          modalType="trading"
        />
      </div>

      {/* Trusted Devices & IP Logs */}
      <SectionHeader title="Trusted Devices and IP Addresses" />
      <div className="bg-gray-800 p-4 rounded-lg">
        <table className="w-full text-left text-sm text-gray-400">
          <thead className="bg-gray-700">
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
  );
}

// ✅ Section Header Component
function SectionHeader({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-medim">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

// ✅ Security Feature Component (Reusable)
function SecurityFeature({ icon, title, description, buttonLabel, modalType }) {
  return (
    <div className="flex justify-between items-center hover:bg-primary p-4 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            {buttonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SecurityModal field={modalType} />
        </DialogContent>
      </Dialog> */}
      <Switch className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted-foreground" />
    </div>
  );
}

// ✅ Security Modal Component (Handles Setup)
function SecurityModal({ field }) {
  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-white">
          Set up {field}
        </DialogTitle>
      </DialogHeader>

      <form method="post" className="space-y-4">
        <Input
          type="text"
          name={field}
          placeholder={`Enter new ${field}`}
          required
          className="w-full border p-2 bg-gray-800 text-white rounded"
        />
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-2">
          Confirm {field}
        </Button>
      </form>
    </div>
  );
}
