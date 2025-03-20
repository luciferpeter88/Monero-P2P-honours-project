import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";
export default function Card({ step, header, body }) {
  const typography = useStoredValue("typography");
  const colorType = useStoredValue("colourType");
  const cardHeaderStyle = {
    fontSize: typography?.size.fontSize,
    letterSpacing: typography?.size.lineHeight,
    color: colorType?.secondary,
  };

  const cardDescriptionStyle = {
    fontSize: typography?.size.fontSize - 3,
    letterSpacing: typography?.size.lineHeight,
  };
  return (
    <div
      className="mt-3 flex  flex-col gap-y-3 rounded-lg items-center w-1/4  p-5 border-muted-foreground bg-primary"
      style={{ backgroundColor: colorType?.primary }}
    >
      <div className="flex items-center gap-x-3">
        <div
          className="text-white w-10 h-8  bg-secondary flex items-center justify-center rounded-lg"
          style={{ backgroundColor: colorType?.secondary }}
        >
          <span className="font-bold text-white">{step}</span>
        </div>
        <h4 className="text-secondary" style={cardHeaderStyle}>
          {header}
        </h4>
      </div>
      <p className="text-muted-foreground text-sm" style={cardDescriptionStyle}>
        {body}
      </p>
    </div>
  );
}
