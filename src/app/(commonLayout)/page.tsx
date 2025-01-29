import HomePage from "@/components/Home/HomePage";
import NoSSR from "@/utils/NoSSR";

export default function Home() {
  return (
    <div>
     <NoSSR>
       <HomePage />
     </NoSSR>
    </div>
  );
}
