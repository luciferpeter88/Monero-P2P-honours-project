import { Use } from "../routes/dashboard/context/Context";
import useStoredValue from "../routes/dashboard/components/useStoredValue";

export default function UsefontSize(size) {
  const { fontSize } = Use();
  const typography = useStoredValue("typography");
  console.log("typography", typography);

  return {
    fontSize: typography?.size.fontSize + size || fontSize.size.fontSize + size,
  };
}
