import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
} from "../../../../../src/components/components/ui/card";
import { Button } from "../../../../../src/components/components/ui/button";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectValue,
  SelectTrigger,
} from "../../../../../src/components/components/ui/select";
import CustomSlider from "../components/CustomSlider";
import ColourSelection from "../components/ColourSelection";
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";

const Index = () => {
  const { fontSize, setFontSize } = Use();

  const [selectedFont, setSelectedFont] = useState("Inter");
  const [selectedColour, setSelectedColour] = useState({
    primary: "#141919",
    secondary: "#f88415",
    tertiary: "#232828",
  });

  useEffect(() => {
    const storedFont = localStorage.getItem("fontType");
    if (storedFont) {
      setSelectedFont(JSON.parse(storedFont));
    }
  }, []);

  const handleFontChange = (newFont) => {
    setSelectedFont(newFont);
    localStorage.setItem("fontType", JSON.stringify(newFont));
  };
  const colorType = useStoredValue("colourType");
  function clearLocalStorage() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div
      className="p-6 space-y-1 bg-third mt-5 rounded-lg"
      style={{ backgroundColor: colorType?.tertiary }}
    >
      <h1
        className="text-xl font-medium"
        style={{ fontSize: fontSize.size.fontSize + 1 }}
      >
        Appearance
      </h1>
      <p
        className="text-muted-foreground text-sm"
        style={{ fontSize: fontSize.size.fontSize - 4 }}
      >
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </p>

      <Card
        className="bg-third"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <CardContent className="space-y-4">
          <div className=" flex flex-col">
            <label
              className="block text-sm font-medium text-white mt-5"
              style={{ fontSize: fontSize.size.fontSize - 4 }}
              htmlFor="font"
            >
              Font
            </label>
            <Select value={selectedFont} onValueChange={handleFontChange}>
              <SelectTrigger
                aria-label="Select a value"
                className="max-w-[12.5rem] rounded-lg border-none outline-none bg-primary text-white focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus:ring-primary focus:ring-offset-primary mt-3"
              >
                <SelectValue
                  placeholder="Inter"
                  className="outline-none border-none bg-primary text-white"
                />
                <SelectContent>
                  {fontSize.fontFamily.map((font, index) => (
                    <SelectItem key={index} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>

          <CustomSlider
            label="Font Size"
            localStorageState={fontSize}
            defaultState={fontSize.defaultFontSize}
            updateState={setFontSize}
            type="defaultFontSize"
          />
          <CustomSlider
            label="Letter Spacing"
            defaultState={fontSize.defaultLineHeight}
            localStorageState={fontSize}
            updateState={setFontSize}
            type="lineHeight"
          />
          <ColourSelection
            label="Primary Color"
            type="primary"
            selectedColour={selectedColour}
            setSelectedColour={setSelectedColour}
          />
          <ColourSelection
            label="Secondary Color"
            type="secondary"
            selectedColour={selectedColour}
            setSelectedColour={setSelectedColour}
          />
          <ColourSelection
            label="Tertiary Color"
            type="tertiary"
            selectedColour={selectedColour}
            setSelectedColour={setSelectedColour}
          />

          <div>
            <label
              className="block text-sm font-medium text-white mb-2"
              htmlFor="theme"
            >
              Theme
            </label>
            <div className="flex space-x-4">
              <Button
                className={`p-4 border border-secondary`}
                onClick={clearLocalStorage}
              >
                Set back
              </Button>
              <Button
                className={`p-4 border border-secondary`}
                onClick={() => window.location.reload()}
              >
                Submit
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
