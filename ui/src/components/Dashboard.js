import Profile from "./Profile";
import QuickLinks from "./QuickLinks";
import Separator from "./Separator";

export default function Dashboard() {
  return (
    <div className="m-3 space-y-3 md:mr-10">
      <Profile />
      <Separator />
      <QuickLinks />
    </div>
  );
}
