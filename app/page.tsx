import AboutConferenceScreen from "./screens/AboutConferenceScreen";
import FirstScreen from "./screens/FirstScreen";
import SpeakersScreen from "./screens/SpeakersScreen";

export default function Home() {
  return (
    <main>
      <FirstScreen/>
      <AboutConferenceScreen />
      <SpeakersScreen />
    </main>
  );
}
