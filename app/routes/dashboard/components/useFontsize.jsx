import { Use } from "../routes/dashboard/context/Context";
import useStoredValue from "../routes/dashboard/components/useStoredValue";

export default function UsefontSize() {
  const { fontSize } = Use();
  const typography = useStoredValue("typography");

  return { fontSize: typography?.size.fontSize || fontSize.size.fontSize };
}
