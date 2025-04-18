import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { MilkdownEditorWrapper } from "@/components/Editor";
import { Textarea } from "@/components/ui/textarea";

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
    console.log("Dati ricevuti:", data);
    // TODO: save data to DB
  });

// Page component
function NotePage() {
  const { register, reset } = useForm();
  const [noteText, setNoteText] = useState("");
  const newNote = useServerFn(submitNote);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("note", noteText);
    await newNote({ data: formData });
    reset();
    setNoteText("");
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground p-8">
      <form onSubmit={handleFormSubmit} className="h-full flex flex-col">
        <div className="rounded-[24px] border flex-1 border-s-2 p-4 shadow-none flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 shrink-0">
            <input
              {...register("title", { required: true })}
              className="text-2xl font-bold w-full outline-none focus:shadow-none"
              placeholder="Note Title"
            />
            <input type="hidden" name="note" value={noteText} />
          </header>

          <Textarea className="shadow-none border-none hover:outline-none hover:shadow-none outline-none focus:shadow-none h-full" />
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between p-4 shrink-0">
          <Button
            type="button"
            variant="ghost"
            className="gap-2"
            onClick={() => {
              reset();
              setNoteText("");
            }}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </Button>

          <Button type="submit" variant="ghost" className="gap-2">
            <Plus size={16} />
          </Button>
        </footer>
      </form>
    </div>
  );
}

export default NotePage;
