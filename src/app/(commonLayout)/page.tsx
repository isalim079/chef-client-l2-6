import HomePage from "@/components/Home/Home";
import Navbar from "@/components/shared/Navbar/Navbar";
import NoSSR from "@/utils/NoSSR";

export default function Home() {
  return (
    <div>
      <NoSSR>
        <Navbar />
        <HomePage />
      </NoSSR>
    </div>
  );
}
