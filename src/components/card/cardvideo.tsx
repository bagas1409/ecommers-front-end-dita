import Link from "next/link";

export default function cardvideo() {
  return (
    <div className="group bg-card h-fit w-full rounded-2xl p-4">
      <div className="flex h-65 w-full flex-col transition-all focus:h-100">
        <iframe
          className="h-full w-full overflow-hidden rounded-2xl"
          src="https://www.youtube.com/embed/NyAoNVVAnTo"
          title="Responsive Iframe"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <Link
          href={"https://www.youtube.com/embed/NyAoNVVAnTo"}
          target="_blank"
        >
          <h1 className="mt-4 text-2xl font-medium">
            Tutorial pendaftaran npwp orang pribadi secara online
          </h1>
        </Link>
      </div>
    </div>
  );
}
