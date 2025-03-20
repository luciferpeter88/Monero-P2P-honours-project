import { useLoaderData } from "@remix-run/react";
import { Trash2, Plus, Pencil } from "lucide-react";
import ContactDialog from "../components/ContactDialog";
import { getSession } from "../../../../utils/session.server";
import { redirect } from "@remix-run/node";
import prisma from "../../../../../prisma/prisma";
import { useState } from "react";
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";
// Loader to fetch contacts
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const addressBookEntries = await prisma.addressBook.findMany({
    where: { userId: userIdD },
    select: {
      id: true,
      contactMoneroAddress: true,
      contactNickname: true,
      notes: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return { contacts: addressBookEntries };
};

// Action to handle adding, editing, and deleting
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const formData = await request.formData();
  const intent = formData.get("_intent");

  if (intent === "delete") {
    const id = formData.get("id");
    await prisma.addressBook.delete({
      where: {
        id: Number(id),
      },
    });

    return { success: true };
  }

  if (intent === "edit") {
    const id = formData.get("id");
    const address = formData.get("address");
    const name = formData.get("name");
    const notes = formData.get("notes");
    await prisma.addressBook.update({
      where: { id: Number(id) },
      data: {
        contactMoneroAddress: address,
        contactNickname: name || null,
        notes: notes || null,
      },
    });
    return { success: true };
  }

  if (intent === "add") {
    console.log("user_id", userIdD);
    const data = Object.fromEntries(formData);
    await prisma.addressBook.create({
      data: {
        userId: userIdD,
        contactMoneroAddress: data.address,
        contactNickname: data.name || null,
        notes: data.notes || null,
      },
    });
    return { success: true };
  }

  return null;
};

export default function AddressBook() {
  const [copySuccess, setCopySuccess] = useState(false);
  const { fontSize } = Use();
  const typography = useStoredValue("typography");

  const { contacts } = useLoaderData();
  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  const headerStyle = {
    fontSize: typography?.size.fontSize + 3 || fontSize.size.fontSize + 3,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  const bodyStyle = {
    fontSize: typography?.size.fontSize - 3 || fontSize.size.fontSize - 3,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg">
        <h3 className="font-medium text-xl" style={headerStyle}>
          Address Book
        </h3>

        {/* Table */}
        <div className="overflow-x-auto mt-5 w-full">
          <table className="w-full border-collapse text-left text-sm text-muted-foreground">
            {/* Table Head */}
            <thead className="bg-primary text-white">
              <tr className="w-full" style={bodyStyle}>
                <th className="p-3 text-left w-1/3 font-medium text-white">
                  Name
                </th>
                <th className="p-3 text-left w-1/3 font-medium text-white">
                  Monero Address
                </th>
                <th className="p-3 text-left w-1/3 font-medium text-white">
                  Notes
                </th>
                <th className="p-3 text-left w-[10%] font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="w-full">
              {contacts.length > 0 ? (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className=" bg-third border-t border-primary hover:bg-primary hover:bg-opacity-90"
                    style={bodyStyle}
                  >
                    <td className="p-3 w-1/4">{contact.contactNickname}</td>
                    <td className="p-3 w-1/4">
                      {contact.contactMoneroAddress.slice(0, 6)}.....
                      <button
                        onClick={() =>
                          copyToClipboard(contact.contactMoneroAddress)
                        }
                        className="ml-3 text-secondary hover:text-white"
                      >
                        {copySuccess ? "Copied!" : "Copy"}
                      </button>
                    </td>
                    <td className="p-3 w-1/4">{contact.notes || "-"}</td>
                    <td className="p-3 w-1/4 flex gap-2">
                      {/* Edit Dialog */}
                      <ContactDialog
                        actionType="edit"
                        contact={contact}
                        triggerLabel="Edit"
                        triggerIcon={<Pencil size={14} />}
                      />

                      {/* Delete Dialog */}
                      <ContactDialog
                        actionType="delete"
                        contact={contact}
                        triggerLabel="Delete"
                        triggerIcon={<Trash2 size={14} />}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    No contacts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add New Contact Dialog */}
        <div className="mt-6">
          <ContactDialog
            actionType="add"
            contact={null}
            triggerLabel="Add New Contact"
            triggerIcon={<Plus size={16} />}
          />
        </div>
      </div>
    </div>
  );
}
