import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", compact = false, src = "/logo.png" }) {
  return (
    <Link href="/" className={`inline-flex items-center shrink-0 ${className}`} aria-label="Fatima Express home">
      <div
        className={`relative shrink-0 ${
          compact ? "h-12 w-44" : "h-14 w-40 sm:h-14 sm:w-44 md:h-16 md:w-52"
        }`}
      >
        <Image
          src={src || "/logo.png"}
          alt="Fatima Express Logo"
          fill
          sizes={compact ? "176px" : "(max-width: 768px) 176px, 208px"}
          className="object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
}
