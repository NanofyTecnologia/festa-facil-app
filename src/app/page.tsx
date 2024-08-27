import Image from "next/image";
import NanofyLogo from "@/assets/images/nanofy_logo.png";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center flex-col justify-center p-24">
      <Image
        width={600}
        height={600}
        src={NanofyLogo}
        alt="nanofy tecnologia"
      />
    </main>
  );
}
