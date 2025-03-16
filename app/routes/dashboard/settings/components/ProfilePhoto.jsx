import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../src/components/components/ui/dialog";
import { Button } from "../../../../../src/components/components/ui/button";
import ProfileModal from "./ProfileModal";
export default function ProfilePhoto({ imgSrc }) {
  return (
    <div className="flex justify-between items-center hover:bg-primary p-4 rounded-lg">
      <div className="flex items-center gap-3">
        <Camera size={24} className="text-muted-foreground" />
        <div>
          <h3 className="text-sm font-medium">Photo</h3>
          <p className="text-xs text-muted-foreground">
            Upload a profile picture to personalize your account and make it
            recognizable
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={
            imgSrc ||
            "https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
          }
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-primary border-none"
            >
              Change
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-third">
            <ProfileModal field="photo" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
