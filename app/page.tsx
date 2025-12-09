import AboutConferenceScreen from "./screens/AboutConferenceScreen";
import FirstScreen from "./screens/FirstScreen";
import OrganizerScreen from "./screens/OrganizerScreen";
import PartnershipScreen from "./screens/PartnershipScreen";
import PreviousMeetingsScreen from "./screens/PreviousMeetingsScreen";
import ProgramScreen from "./screens/ProgramScreen";
import SpeakersScreen from "./screens/SpeakersScreen";

export default function Home() {
  return (
    <main>
      <FirstScreen/>
      <AboutConferenceScreen />
      <SpeakersScreen />
      <ProgramScreen />
      <PreviousMeetingsScreen />
      <PartnershipScreen />
      <OrganizerScreen />
    </main>
  );
}
