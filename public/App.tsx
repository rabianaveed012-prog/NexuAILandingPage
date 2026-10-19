import { Backdrop, CursorSpotlight } from "./components/Backdrop";
import { Nav } from "./components/Nav";
import { Scene } from "./components/Scene";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Proof } from "./components/Proof";
import { Waitlist } from "./components/Waitlist";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="relative bg-ink text-fg">
      <Backdrop />
      <CursorSpotlight />
      <Nav />
      <main className="relative z-10">
        <Scene />
        <Features />
        <HowItWorks />
        <Proof />
        <Waitlist />
      </main>
      <Footer />
    </div>
  );
}
