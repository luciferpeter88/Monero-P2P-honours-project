import { useState } from "react";
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

const Index = () => {
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("Inter");
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [borderRadius, setBorderRadius] = useState(8);
  const [primaryColor, setPrimaryColor] = useState("#1D4ED8");
  const [secondaryColor, setSecondaryColor] = useState("#9333EA");
  const [tertiaryColor, setTertiaryColor] = useState("#F59E0B");
  const [buttonColor, setButtonColor] = useState("#2563EB");
  const [hoverColor, setHoverColor] = useState("#3B82F6");
  const [gridGap, setGridGap] = useState(10);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [textAlign, setTextAlign] = useState("left");
  const [profiles, setProfiles] = useState([]);

  const updatePreferences = () => {
    const root = document.querySelector(":root");
    const style = root;

    console.log("root", style);
  };

  const saveProfile = () => {
    const newProfile = {
      theme,
      font,
      fontSize,
      lineHeight,
      letterSpacing,
      borderRadius,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      buttonColor,
      hoverColor,
      gridGap,
      backgroundImage,
      animationSpeed,
      textAlign,
    };
    setProfiles([...profiles, newProfile]);
  };

  const loadProfile = (profile) => {
    setTheme(profile.theme);
    setFont(profile.font);
    setFontSize(profile.fontSize);
    setLineHeight(profile.lineHeight);
    setLetterSpacing(profile.letterSpacing);
    setBorderRadius(profile.borderRadius);
    setPrimaryColor(profile.primaryColor);
    setSecondaryColor(profile.secondaryColor);
    setTertiaryColor(profile.tertiaryColor);
    setButtonColor(profile.buttonColor);
    setHoverColor(profile.hoverColor);
    setGridGap(profile.gridGap);
    setBackgroundImage(profile.backgroundImage);
    setAnimationSpeed(profile.animationSpeed);
    setTextAlign(profile.textAlign);
  };

  return (
    <div className="p-6 space-y-3 bg-third mt-5 rounded-lg">
      <h1 className="text-2xl font-bold">Appearance</h1>
      <p>
        Customize the appearance of the app. Automatically switch between day
        and night themes.
      </p>

      <Card className="bg-third">
        <CardContent className="space-y-4">
          <div className=" flex flex-col">
            <label className="block text-sm font-medium text-white">Font</label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger
                aria-label="Select a value"
                className="max-w-[12.5rem] rounded-lg border-none outline-none bg-primary text-white focus:outline-none focus:border-none focus:ring-0 focus:ring-offset-0 focus:ring-primary focus:ring-offset-primary mt-3"
              >
                <SelectValue
                  placeholder="Inter"
                  className="outline-none border-none bg-primary text-white"
                />
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Times New Roman">
                    Times New Roman
                  </SelectItem>
                  <SelectItem value="Courier New">Courier New</SelectItem>
                </SelectContent>
              </SelectTrigger>
            </Select>
          </div>

          <CustomSlider
            label="Font Size"
            defaultState={fontSize}
            updateState={setFontSize}
          />
          <CustomSlider
            label="Line Height"
            defaultState={lineHeight}
            updateState={setLineHeight}
          />

          <CustomSlider
            label="Letter Spacing"
            defaultState={letterSpacing}
            updateState={setLetterSpacing}
          />
          <ColourSelection
            label="Primary Color"
            defaultState={primaryColor}
            updateState={setPrimaryColor}
          />
          <ColourSelection
            label="Secondary Color"
            defaultState={secondaryColor}
            updateState={setSecondaryColor}
          />

          <ColourSelection
            label="Tertiary Color"
            defaultState={tertiaryColor}
            updateState={setTertiaryColor}
          />

          <ColourSelection
            label="Button Color"
            defaultState={buttonColor}
            updateState={setButtonColor}
          />
          <ColourSelection
            label="Hover Color"
            defaultState={hoverColor}
            updateState={setHoverColor}
          />

          <CustomSlider
            label="Grap Between Grid Items"
            defaultState={gridGap}
            updateState={setGridGap}
          />

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Theme
            </label>
            <div className="flex space-x-4">
              <Button
                className={`p-4 border ${
                  theme === "light" ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setTheme("light")}
              >
                Light
              </Button>
              <Button
                className={`p-4 border ${
                  theme === "dark" ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setTheme("dark")}
              >
                Dark
              </Button>
              <Button
                className={`p-4 border ${
                  theme === "custom" ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setTheme("custom")}
              >
                Custom
              </Button>
            </div>
          </div>

          <Button onClick={updatePreferences}>Update Preferences</Button>
          <Button onClick={saveProfile} className="ml-4">
            Save Profile
          </Button>

          <div>
            <h2 className="text-lg font-medium text-white">Saved Profiles</h2>
            <div className="space-y-2">
              {profiles.map((profile, index) => (
                <Button key={index} onClick={() => loadProfile(profile)}>
                  Load Profile {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
