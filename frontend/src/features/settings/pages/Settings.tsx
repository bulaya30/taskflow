import NotficationSettingsCard from "../../notifications/components/NotficationSettingsCard"
import ProfileCard from "../components/ProfileCard"
import ThemeCard from "../components/ThemeCard"
import DangerZone from "./DangerZone"



export default function Settings() {
  return (
    <section className="space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <header>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and preferences.
        </p>
      </header>

    <div className="space-y-6">
      <ProfileCard />
      <NotficationSettingsCard />
      <ThemeCard />
      <DangerZone />
    </div>

  </section>
  )
}
