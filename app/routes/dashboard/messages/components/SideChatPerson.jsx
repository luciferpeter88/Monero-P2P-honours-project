export default function SideChatPerson() {
  return (
    <div className="p-3 rounded-xl hover:bg-primary cursor-pointer  flex items-center gap-3 ">
      <div className="w-12 h-12 rounded-xl overflow-hidden">
        <img
          src="https://res.cloudinary.com/djv4xa6wu/image/upload/v1737831467/abhiraj_tdwxdf.webp"
          alt="User"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 ">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Abhi</h3>
          <span className="text-xs text-muted-foreground">20m</span>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          Hey! We are ready to start...
        </p>
      </div>
    </div>
  );
}
