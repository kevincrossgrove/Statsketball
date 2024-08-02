import AppBasicCard from "../../Components/AppBasicCard";

export default function Landing() {
  return (
    <div className="bg-slate-700 w-screen h-screen p-8">
      <h1 className="text-3xl text-white">Statsketball</h1>
      <AppBasicCard title={"Games"} />
      <AppBasicCard title={"Teams"} />
    </div>
  );
}
