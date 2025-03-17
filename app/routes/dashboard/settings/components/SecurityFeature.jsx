import { Switch } from "../../../../../src/components/components/ui/switch";
import { Form } from "@remix-run/react";

export default function SecurityFeature({
  icon,
  title,
  description,
  modalType,
  status,
}) {
  return (
    <div className="flex justify-between items-center hover:bg-primary p-4 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Form method="post">
        <input type="hidden" name="type" value={modalType} />
        <Switch
          checked={status}
          className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted-foreground"
          type="submit"
        />
      </Form>
    </div>
  );
}
