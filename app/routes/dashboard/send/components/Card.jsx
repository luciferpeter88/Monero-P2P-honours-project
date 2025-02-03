export default function Card({ step, header, body }) {
  return (
    <div className="mt-3 flex  flex-col gap-y-3 rounded-lg items-center w-[22rem] border p-5 border-muted-foreground">
      <div className="flex items-center gap-x-3">
        <div className="text-white w-10 h-8  bg-secondary flex items-center justify-center rounded-lg">
          <span className="font-bold text-white">{step}</span>
        </div>
        <h4 className="text-secondary">{header}</h4>
      </div>
      <p className="text-muted-foreground text-sm">{body}</p>
    </div>
  );
}
