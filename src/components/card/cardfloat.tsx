const cardfloat = () => {
  return (
    <div className="relative -top-0 flex h-[20rem] w-full rotate-0 flex-col rounded-xl bg-amber-400 p-12 transition-all duration-300 ease-out hover:-top-10 hover:rotate-2">
      <img src={""} alt="" />
      <div className="absolute inset-y-1/2 flex flex-col justify-end-safe">
        <h1 className="text-xl font-semibold">Judul content</h1>
        <p className="font-base">Deskripsi singkat</p>
      </div>
    </div>
  );
};
