import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { Textarea } from "@/components/ui/textarea";
import { createMemo } from "@/db";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Route definition
export const Route = createFileRoute("/_layout/new-memo")({
  component: NotePage,
});

// Server action with validation
const submitNote = createServerFn({ method: "POST" })
  .validator((formData) => {
    if (!(formData instanceof FormData)) {
      throw new Error("Invalid form data");
    }
    const title = formData.get("title");
    const note = formData.get("note");
    if (typeof title !== "string" || typeof note !== "string") {
      throw new Error("Invalid input");
    }
    return { title, note };
  })
  .handler(async ({ data }) => {
    const memo = await createMemo(data.note);
    return memo;
  });

// Page component
function NotePage() {
  const { register, reset } = useForm();
  const [noteText, setNoteText] = useState("");
  const newNote = useServerFn(submitNote);
  const navigate = useNavigate();

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("note", noteText);

    try {
      // Invia la nota
      await newNote({ data: formData });

      // Reindirizza immediatamente alla home dopo la creazione
      // Senza aspettare di elaborare la risposta
      navigate({ to: "/" });

      // Resetta il form (anche se probabilmente non è necessario dopo il reindirizzamento)
      reset();
      setNoteText("");
    } catch (error) {
      console.error("Errore durante la creazione della memo:", error);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-amber-50/30 text-amber-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex-1 flex flex-col p-4 h-full pt-12"
      >
        <form onSubmit={handleFormSubmit} className="flex flex-col h-full">
          {/* Header minimalista solo con il pulsante di salvataggio */}
          <header className="flex items-center justify-end mb-4">
            <Button
              type="submit"
              variant="ghost"
              className="text-amber-800 hover:text-amber-600 hover:bg-transparent p-2"
            >
              <Plus size={18} />
            </Button>
          </header>

          {/* Box principale che occupa tutto lo spazio */}
          <div className="rounded-lg border border-amber-200/50 bg-white/80 flex-1 flex flex-col overflow-hidden">
            {/* Titolo della nota */}
            <input
              {...register("title", { required: true })}
              className="text-2xl font-normal w-full outline-none focus:shadow-none bg-transparent text-amber-900 placeholder:text-amber-800/60 p-6 pb-2 border-none"
              placeholder="Titolo della nota"
            />
            <input type="hidden" name="note" value={noteText} />

            {/* Area di testo che occupa tutto lo spazio disponibile */}
            <Textarea
              className="shadow-none border-none hover:outline-none hover:shadow-none outline-none focus:shadow-none focus-visible:ring-0 resize-none flex-1 text-amber-800 bg-transparent p-6 pt-0 placeholder:text-amber-700/60 text-lg"
              placeholder="Scrivi i tuoi pensieri qui..."
              onChange={(e) => setNoteText(e.target.value)}
              value={noteText}
            />
          </div>

          {/* Footer minimalista */}
          <footer className="flex justify-start mt-2">
            <Button
              type="button"
              variant="ghost"
              className="text-amber-700 hover:text-amber-900 hover:bg-transparent p-2"
              onClick={() => {
                reset();
                setNoteText("");
              }}
            >
              <Trash2 size={16} />
            </Button>
          </footer>
        </form>
      </motion.div>
    </div>
  );
}

export default NotePage;
