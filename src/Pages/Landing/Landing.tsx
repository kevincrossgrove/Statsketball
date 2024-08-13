import { useNavigate } from "react-router-dom";
import AppBasicCard from "../../components/AppBasicCard";
import AppHeader from "@/components/AppHeader";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-background w-screen h-screen">
      <AppHeader title="Statsketball" />
      <div className="px-6">
        <AppBasicCard title={"Games"} onClick={() => navigate("/games")} />
        <AppBasicCard title={"Teams"} onClick={() => navigate("/teams")} />
        <AppBasicCard title={"Players"} onClick={() => navigate("/players")} />
      </div>
    </div>
  );
}
