import { Mail, Percent, Phone, User, UserCheck } from "lucide-react";
import ProfileField from "../components/ProfileField";
import ProfilePhoto from "../components/ProfilePhoto";
import AccountOption from "../components/AccountOptions";
export default function Index() {
  return (
    <div className="mt-5">
      <div className="bg-third text-white rounded-lg p-6 ">
        <h2 className="text-xl font-medium mb-4">My Profile</h2>
        <div className="space-y-6 bg-third">
          <ProfileField
            icon={<User size={20} className="text-muted-foreground" />}
            title="Nickname"
            description="This is your display name that will appear to others on the platform"
            value="Lucifer"
            modalType="nickname"
          />
          <ProfilePhoto />
          <ProfileField
            icon={<Mail size={20} className="text-muted-foreground" />}
            title="Email"
            description="We use this email for account verification and important notifications"
            value="kaszapnagyp@gmail.com"
            modalType="email"
          />
          <ProfileField
            icon={<Phone size={20} className="text-muted-foreground" />}
            title="Phone Number"
            description="Your phone number helps secure your account with two-factor authentication"
            value="(555) 123-4567"
            modalType="phone"
          />
          <ProfileField
            icon={<Percent size={20} className="text-muted-foreground" />}
            title="Trading Fee Level"
            description="This shows the current discount or rate applied to your trading fees based on your activity"
            value="VIP 0: 0.01%"
            buttonLabel="More Details"
          />
        </div>
      </div>
      <div className="bg-third text-white rounded-lg p-6 mt-5">
        <h2 className="text-xl font-medium">Account Management</h2>
        <div className="mt-4 space-y-4">
          <AccountOption
            icon={<UserCheck size={20} className="text-muted-foreground" />}
            title="Freeze Account"
            description="Temporarily disable your account to prevent any activity while keeping your data intact"
          />
          <AccountOption
            icon={<User size={20} className="text-muted-foreground" />}
            title="Close Account"
            description="Once you close your account, it is permanent and can't be restored"
          />
        </div>
      </div>
    </div>
  );
}
