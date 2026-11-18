import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CompetenciasSection } from "./components/CompetenciasSection";
import {
  ModalidadesSection,
  type ModalityOption,
} from "./components/ModalidadesSection";
import { MentorSection } from "./components/MentorSection";
import { PlanConfiguratorSection } from "./components/PlanConfiguratorSection";
import { ContactFooterSection } from "./components/ContactFooterSection";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";

export default function App() {
  const [selectedModality, setSelectedModality] =
    useState<ModalityOption>("Domicílio");

  const scrollToBooking = (modality?: ModalityOption) => {
    if (modality) {
      setSelectedModality(modality);
    }
    const target = document.getElementById("agendamento");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      const firstInput = document.getElementById("guardian-name");
      if (firstInput) {
        setTimeout(() => firstInput.focus({ preventScroll: true }), 450);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#161618]">
      <Header onBookClick={() => scrollToBooking("Domicílio")} />

      <main className="flex-1">
        <HeroSection onBookHomeClick={() => scrollToBooking("Domicílio")} />
        <CompetenciasSection />
        <ModalidadesSection onSelectModality={scrollToBooking} />
        <MentorSection onBookMentorClick={() => scrollToBooking("Domicílio")} />
        <PlanConfiguratorSection />
      </main>

      <ContactFooterSection
        selectedModality={selectedModality}
        onModalityChange={setSelectedModality}
      />

      <FloatingWhatsApp />
    </div>
  );
}
