import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";

export default function App() {
  return (
    <div>
      <Header />
      <ProfileCard name="Mint" />
      <ProfileCard name="Beam" />
      <ProfileCard name="Jin" />
    </div>
  );
}
