import { getSession } from "../../../../utils/session.server";
import prisma from "../../../../../prisma/prisma";
import { useLoaderData, redirect } from "@remix-run/react";
import { Mail, Percent, Phone, User, UserCheck } from "lucide-react";
import ProfileField from "../components/ProfileField";
import ProfilePhoto from "../components/ProfilePhoto";
import AccountOption from "../components/AccountOptions";
import uploadImage from "../../../../utils/uploadPicture.server";
import useStoredValue from "../../components/useStoredValue";

export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");

  if (!userIdD) {
    return { error: "Unauthorized" }, { status: 401 };
  }
  const user = await prisma.user.findUnique({
    where: { id: userIdD },
    select: {
      id: true,
      username: true,
      email: true,
      phone: true,
      imageSrc: true,
      tradingFee: true,
    },
  });
  return { user };
};

export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }

  const formData = await request.formData();
  const nickname = formData.get("nickname");
  const photo = formData.get("profilePhoto");
  const deletePhoto = formData.get("deletePhoto");
  const actionType = formData.get("action");
  const actionAccount = formData.get("actionAccount");
  let imgSrc = "";
  if (photo?.name) {
    imgSrc = await uploadImage(photo, userIdD);
  }
  const email = formData.get("email");
  const phone = formData.get("phone");
  const tradingFee = Number(formData.get("tradingFee"));
  if (actionType === "delete" && deletePhoto) {
    await prisma.user.update({
      where: { id: userIdD },
      data: {
        imageSrc: null,
      },
    });
  }
  await prisma.user.update({
    where: { id: userIdD },
    data: {
      username: nickname ? nickname : undefined,
      email: email ? email : undefined,
      phone: phone ? phone : undefined,
      tradingFee: tradingFee ? tradingFee : undefined,
      imageSrc: imgSrc.filePath ? imgSrc.filePath : undefined,
    },
  });
  if (actionAccount === "freeze") {
    await prisma.user.update({
      where: { id: userIdD },
      data: {
        accountStatus: "frozen",
      },
    });
    return redirect("/");
  } else if (actionAccount === "close") {
    await prisma.user.update({
      where: { id: userIdD },
      data: {
        accountStatus: "closed",
      },
    });
    return redirect("/");
  }

  return {
    success: true,
  };
};

export default function Index() {
  const data = useLoaderData();
  const user = data?.user;
  const colorType = useStoredValue("colourType");

  return (
    <div className="mt-5">
      <div
        className="bg-third text-white rounded-lg p-6 "
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h2 className="text-xl font-medium mb-4">My Profile</h2>
        <div
          className="space-y-6 bg-third"
          style={{ backgroundColor: colorType?.tertiary }}
        >
          <ProfileField
            icon={<User size={20} className="text-muted-foreground" />}
            title="Nickname"
            description="This is your display name that will appear to others on the platform"
            value={user.username}
            modalType="nickname"
            colorType={colorType}
          />
          <ProfilePhoto imgSrc={user.imageSrc} colorType={colorType} />
          <ProfileField
            icon={<Mail size={20} className="text-muted-foreground" />}
            title="Email"
            description="We use this email for account verification and important notifications"
            value={user.email}
            modalType="email"
            colorType={colorType}
          />
          <ProfileField
            icon={<Phone size={20} className="text-muted-foreground" />}
            title="Phone Number"
            description="Your phone number helps secure your account with two-factor authentication"
            value={user.phone || "not set"}
            modalType="phone"
            colorType={colorType}
          />
          <ProfileField
            icon={<Percent size={20} className="text-muted-foreground" />}
            title="Trading Fee Level"
            description="This shows the current discount or rate applied to your trading fees based on your activity"
            value={user.tradingFee || "not set"}
            modalType="tradingFee"
            buttonLabel="More Details"
            colorType={colorType}
          />
        </div>
      </div>
      <div
        className="bg-third text-white rounded-lg p-6 mt-5"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h2 className="text-xl font-medium">Account Management</h2>
        <div className="mt-4 space-y-4">
          <AccountOption
            icon={<UserCheck size={20} className="text-muted-foreground" />}
            title="Freeze Account"
            modalType="Are you sure you want to freeze your account?"
            description="Temporarily disable your account to prevent any activity while keeping your data intact"
            actionType="freeze"
            colorType={colorType}
          />
          <AccountOption
            icon={<User size={20} className="text-muted-foreground" />}
            title="Close Account"
            modalType="Are you sure you want to close your account?"
            description="Once you close your account, it is permanent and can't be restored"
            actionType="close"
            colorType={colorType}
          />
        </div>
      </div>
    </div>
  );
}
