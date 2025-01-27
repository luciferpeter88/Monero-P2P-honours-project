export default function Card({ src, title, description }) {
  return (
    <div className="col-span-8 md:col-span-4 lg:col-span-2 mt-8">
      <div className="bg-third flex flex-wrap gap-y-3  justify-center cursor-pointer shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] rounded-xl w-full px-5 py-5">
        <img src={src} className="w-40 h-40" alt="" />
        <div className="ml-4 flex-1 items-center justify-center mt-2">
          <h3 className="text-2xl  font-semibold bg-gradient-to-r from-orange-50 to-secondary bg-clip-text text-transparent mt-2">
            {title}
          </h3>
          <p className="text-sm mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}
