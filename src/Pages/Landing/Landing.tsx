import { useNavigate } from "react-router-dom";
import AppBasicCard from "../../components/AppBasicCard";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-background w-screen h-screen p-8">
      <h1 className="text-3xl text-text">Statsketball</h1>
      <AppBasicCard title={"Games"} onClick={() => navigate("/games")} />
      <AppBasicCard title={"Teams"} onClick={() => navigate("/teams")} />
    </div>
  );
}
