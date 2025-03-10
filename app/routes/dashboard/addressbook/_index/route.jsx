import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Trash2, Plus, Pencil } from "lucide-react";
import ContactDialog from "../components/ContactDialog";
import { useState } from "react";
// Dummy Data (Replace with database later)
const dummyData = [
  {
    id: 1,
    name: "Alice Doe",
    address: "43Xmr123...abcd",
    notes: "Frequent trades",
  },
  {
    id: 2,
    name: "Bob Crypto",
    address: "47Xmr456...efgh",
    notes: "Business partner",
  },
];

// Loader to fetch contacts
export const loader = async () => {
  return json({ contacts: dummyData });
};

// Action to handle adding, editing, and deleting
export const action = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("_intent");

  if (intent === "delete") {
    const id = formData.get("id");
    console.log(`Deleting contact with ID: ${id}`);
    return json({ success: true });
  }

  if (intent === "edit") {
    console.log("Editing contact:", formData.get("id"));
    // return redirect("/address-book");
  }

  if (intent === "add") {
    console.log("Adding new contact:", Object.fromEntries(formData));
    // return redirect("/address-book");
  }

  return null;
};

export default function AddressBook() {
  const [openModal, setOpenModal] = useState(false);

  const { contacts } = useLoaderData();

  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg">
        <h3 className="font-medium text-xl">Address Book</h3>

        {/* Table */}
        <div className="overflow-x-auto mt-5 w-full">
          <table className="w-full border-collapse text-left text-sm text-muted-foreground">
            {/* Table Head */}
            <thead className="bg-primary text-white">
              <tr className="w-full">
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
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className=" bg-third border-t border-primary hover:bg-primary hover:bg-opacity-90"
                >
                  <td className="p-3 w-1/4">{contact.name}</td>
                  <td className="p-3 w-1/4">{contact.address}</td>
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
              ))}
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
