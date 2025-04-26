// app/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { getMemos } from "@/db";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Menu,
  ChevronDown,
  LucideNotebook,
  Cloud,
  Search,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getMemos(),
});

function Home() {
  const memos = Route.useLoaderData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const { scrollY } = useScroll();
  const sectionsRef = useRef<HTMLElement[]>([]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Controlla se la pagina è scrollata più di 50px
    setIsScrolled(latest > 50);

    // Determina la sezione attiva in base alla posizione dello scroll
    const viewportHeight = window.innerHeight;
    const scrollPosition = latest + viewportHeight / 2;

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setCurrentSection(index);
      }
    });
  });

  const scrollToSection = (index: number) => {
    const section = sectionsRef.current[index];
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Funzione per salvare i riferimenti alle sezioni
  const addSectionRef = (el: HTMLElement | null, index: number) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current[index] = el;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100 overflow-hidden">
      {/* Navigation */}
      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="flex items-center justify-center"
            >
              <img
                src="/logo.png"
                alt="Logo Curcuma"
                className="w-12 h-12 object-contain"
              />
            </motion.div>
            <span className="text-2xl font-bold text-amber-900">Curcuma</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["Home", "Funzionalità", "Le tue note", "Inizia"].map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(index)}
                  className={cn(
                    "text-amber-800 hover:text-amber-600 transition-colors relative",
                    currentSection === index && "font-medium text-amber-600"
                  )}
                >
                  {item}
                  {currentSection === index && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500"
                    />
                  )}
                </button>
              )
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-amber-900">
              <Menu />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={(el) => addSectionRef(el, 0)}
        className="min-h-screen flex items-center pt-24 pb-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-amber-100 text-amber-800 border border-amber-200">
                <motion.span
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="mr-2"
                >
                  ✨
                </motion.span>
                La tua memoria esterna
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-amber-900 leading-tight">
                <span className="block">Pensa</span>
                <span className="block bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  Memorizza
                </span>
                <span className="block">Organizza</span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-amber-800 max-w-lg"
              >
                Curcuma è il tuo spazio personale per catturare pensieri, idee e
                riflessioni in modo elegante e intuitivo.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30 group transition-all"
                  size="lg"
                  asChild
                >
                  <Link to="/new-memo">
                    Inizia Gratis
                    <ArrowRight
                      size={16}
                      className="ml-1 group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-amber-300 text-amber-800 hover:bg-amber-100/50"
                  size="lg"
                >
                  Scopri di più
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative h-[400px] lg:h-[500px]"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl">
                <motion.div
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-full h-full"
                />
              </div>

              <motion.div
                initial={{ rotate: 2 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-2xl bg-white/70 backdrop-blur-sm border border-amber-200/50 shadow-2xl shadow-amber-500/10 p-6 overflow-hidden"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-800">
                    <LucideNotebook size={18} />
                    <span className="font-medium">Le mie idee</span>
                  </div>
                  <div className="space-y-3">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 * (i + 1) }}
                          className="p-3 rounded-lg bg-amber-50/80 border border-amber-100"
                        >
                          <p className="text-amber-800 line-clamp-1">
                            {i === 0
                              ? "Idee per il progetto di design"
                              : i === 1
                                ? "Ricetta torta al cioccolato vegana"
                                : i === 2
                                  ? "Libri da leggere quest'estate"
                                  : i === 3
                                    ? "Obiettivi per il prossimo trimestre"
                                    : "Appunti sulla riunione di oggi"}
                          </p>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute top-[20%] right-[5%] w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full opacity-20"
              ></motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0.7 }}
                className="absolute bottom-[15%] left-[10%] w-12 h-12 bg-gradient-to-br from-amber-300 to-orange-300 rounded-full opacity-30"
              ></motion.div>
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex justify-center mt-8 md:mt-16"
          >
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border border-amber-200 shadow-md"
              onClick={() => scrollToSection(1)}
            >
              <ArrowDown size={20} className="text-amber-600" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        ref={(el) => addSectionRef(el, 1)}
        className="py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/0 via-amber-100/30 to-amber-50/0 -z-10"></div>
        <div className="absolute -right-64 top-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-amber-100 text-amber-800 border border-amber-200 mb-4">
              <Sparkles size={14} className="mr-2 text-amber-600" />
              Caratteristiche Principali
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Tutto ciò di cui hai bisogno
            </h2>
            <p className="text-amber-800">
              Curcuma combina semplicità ed eleganza per offrirti l'esperienza
              di scrittura ideale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <LucideNotebook className="text-amber-600" />,
                title: "Organizzazione Intuitiva",
                description:
                  "Organizza i tuoi pensieri in categorie personalizzate per ritrovarli facilmente quando ne hai bisogno",
              },
              {
                icon: <Cloud className="text-amber-600" />,
                title: "Sincronizzazione Cloud",
                description:
                  "Accedi alle tue note da qualsiasi dispositivo, sempre aggiornate e al sicuro nel cloud",
              },
              {
                icon: <Search className="text-amber-600" />,
                title: "Ricerca Potente",
                description:
                  "Trova rapidamente qualsiasi nota grazie alla ricerca intelligente che comprende le tue intenzioni",
              },
              {
                icon: <Lightbulb className="text-amber-600" />,
                title: "Ispirazioni Quotidiane",
                description:
                  "Ricevi suggerimenti personalizzati per stimolare la tua creatività e produttività",
              },
              {
                icon: <Sparkles className="text-amber-600" />,
                title: "Design Minimalista",
                description:
                  "Un'interfaccia elegante e senza distrazioni, focalizzata sull'esperienza di scrittura",
              },
              {
                icon: <Menu className="text-amber-600" />,
                title: "Personalizzazione Totale",
                description:
                  "Adatta Curcuma alle tue esigenze con temi, formati e impostazioni flessibili",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                className="group p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm border border-amber-100 hover:border-amber-200 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 group-hover:bg-amber-200 flex items-center justify-center mb-4 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-amber-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Notes Preview */}
      <section ref={(el) => addSectionRef(el, 2)} className="py-20 relative">
        <div className="absolute -left-64 top-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-200/20 to-orange-200/20 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-amber-100 text-amber-800 border border-amber-200 mb-4">
              <LucideNotebook size={14} className="mr-2 text-amber-600" />
              Le tue Note
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Note Recenti
            </h2>
            <p className="text-amber-800">
              Continua da dove hai lasciato con le tue note più recenti
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {memos.length > 0
              ? memos.slice(0, 6).map((memo, idx) => (
                  <motion.div
                    key={memo.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                    className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm border border-amber-100 hover:border-amber-200 transition-all group"
                  >
                    <p className="text-amber-800 line-clamp-3">
                      {memo.content}
                    </p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-amber-100 flex justify-between items-center"
                    >
                      <span className="text-xs text-amber-600">
                        {new Date().toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-amber-600 hover:text-amber-700 p-0"
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </motion.div>
                  </motion.div>
                ))
              : Array(6)
                  .fill(0)
                  .map((_, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * idx }}
                      whileHover={{
                        y: -5,
                        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                      }}
                      className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm border border-amber-100 hover:border-amber-200 transition-all group"
                    >
                      <p className="text-amber-800">
                        {idx === 0
                          ? "Promemoria per la riunione di domani alle 10:00. Preparare i report mensili e la presentazione per i nuovi clienti."
                          : idx === 1
                            ? "Idee per il progetto di design: utilizzare colori caldi, layout minimalista, focus sulla tipografia."
                            : idx === 2
                              ? "Lista della spesa: pane, latte, uova, frutta, verdura, pasta e ingredienti per la torta."
                              : idx === 3
                                ? "Citazione del giorno: 'La creatività è l'intelligenza che si diverte.' - Albert Einstein"
                                : idx === 4
                                  ? "Obiettivi settimanali: completare il report, iniziare il nuovo progetto, allenarsi almeno 3 volte."
                                  : "Appunti dalla conferenza: intelligenza artificiale applicata al design, nuovi trend per il 2024, opportunità di networking."}
                      </p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="mt-4 pt-4 border-t border-amber-100 flex justify-between items-center"
                      >
                        <span className="text-xs text-amber-600">
                          {new Date().toLocaleDateString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-amber-600 hover:text-amber-700 p-0"
                        >
                          <ArrowRight size={16} />
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
          </div>

          <div className="text-center mt-12">
            <Button
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/20 group"
              asChild
            >
              <Link to="/new-memo">
                Visualizza tutte le note
                <ArrowRight
                  size={16}
                  className="ml-1 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={(el) => addSectionRef(el, 3)} className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100/50 via-amber-200/30 to-amber-100/50 -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-amber-300/30 to-orange-300/30 rounded-full blur-3xl -z-10">
          <motion.div
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="w-full h-full"
          />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-white/80 backdrop-blur-md rounded-2xl p-8 md:p-12 shadow-xl border border-amber-100"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Inizia il tuo viaggio con Curcuma
            </h2>
            <p className="text-xl text-amber-800 mb-8">
              Trasforma i tuoi pensieri in note organizzate, accessibili ovunque
              e sempre al sicuro.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg py-6 px-8 rounded-xl shadow-lg shadow-amber-500/30 group transition-all"
                asChild
              >
                <Link to="/new-memo">
                  Crea la tua prima nota
                  <ArrowRight
                    size={20}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
