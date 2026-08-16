import Image from "next/image";
import Link from "next/link";

const SRC = {
  light: { src: "/brand/tablio-logo.png", width: 2103, height: 748 },
  dark: { src: "/brand/tablio-logo-on-dark.png", width: 2103, height: 748 },
} as const;

type LogoProps = {
  variant?: keyof typeof SRC;
  href?: string;
  className?: string;
};

export function Logo({ variant = "light", href = "/", className = "" }: LogoProps) {
  const asset = SRC[variant];
  const image = (
    <Image
      src={asset.src}
      alt="Tablio"
      width={168}
      height={60}
      className={`h-8 w-auto sm:h-9 ${className}`}
      priority
    />
  );

  if (!href) {
    return image;
  }

  return (
    <Link href={href} className="inline-flex items-center rounded-sm">
      {image}
    </Link>
  );
}
