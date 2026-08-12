import Image from "next/image";

interface LogoItemProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function LogoItem({
  src,
  alt,
  width,
  height,
}: LogoItemProps) {
  return (
    <div className="flex h-24 w-36 items-center justify-center sm:h-28 sm:w-44 lg:h-36 lg:w-56">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        decoding="async"
        className="max-h-full w-auto max-w-full select-none object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
      />
    </div>
  );
}
