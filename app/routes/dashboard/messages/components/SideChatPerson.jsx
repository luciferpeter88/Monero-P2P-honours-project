export default function SideChatPerson({
  user,
  setUserId,
  id,
  userId,
  nameStyle,
  descRiptionstyle,
}) {
  return (
    <button
      className={`p-3 rounded-xl hover:bg-primary cursor-pointer  flex items-center gap-3 w-full ${
        userId === id ? "bg-primary" : ""
      }`}
      onClick={() => setUserId(id)}
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden">
        <img
          src="https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
      <div className=" ">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold" style={nameStyle}>
            {user}
          </h3>
        </div>
        <p
          className="text-sm text-muted-foreground truncate"
          style={descRiptionstyle}
        >
          Chat with {user}
        </p>
      </div>
    </button>
  );
}
