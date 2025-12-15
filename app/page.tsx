import AboutConferenceScreen from "./screens/AboutConferenceScreen";
import FirstScreen from "./screens/FirstScreen";
import OrganizerScreen from "./screens/OrganizerScreen";
import PartnershipScreen from "./screens/PartnershipScreen";
import PreviousMeetingsScreen from "./screens/PreviousMeetingsScreen";
import ProgramScreen from "./screens/ProgramScreen";
import RegisterFormScreen from "./screens/RegisterFormScreen";
import SpeakersScreen from "./screens/SpeakersScreen";
import VenueScreen from "./screens/VenueScreen";

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
      <VenueScreen />
      <RegisterFormScreen/>
    </main>
  );
}
