import Image from "next/image";
import BoundingBox from "@/components/BoundingBox";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <BoundingBox />
    </main>
  );
}
