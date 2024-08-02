import { useNavigate } from "react-router-dom";
import AppBasicCard from "../../Components/AppBasicCard";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-700 w-screen h-screen p-8">
      <h1 className="text-3xl text-white">Statsketball</h1>
      <AppBasicCard title={"Games"} onClick={() => navigate("/games")} />
      <AppBasicCard title={"Teams"} onClick={() => navigate("/teams")} />
    </div>
  );
}
