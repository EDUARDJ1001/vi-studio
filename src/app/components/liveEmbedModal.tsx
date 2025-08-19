"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  src: string; // p.ej. https://rtsp.me/embed/azSe92GS/
}

export default function LiveEmbedModal({ isOpen, onClose, src }: Props) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Cerrar con ESC y bloquear scroll del body
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
        >
          <motion.div
            initial={{ scale: 0.98, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 230, damping: 24 }}
            className="relative w-full max-w-3xl rounded-2xl bg-white shadow-xl ring-1 ring-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-base font-semibold">Vista en directo</h3>
              <div className="flex items-center gap-2">
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir en nueva pestaña"
                  className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800"
                >
                  <ExternalLink className="size-4" />
                </a>
                <button
                  onClick={onClose}
                  className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Cerrar"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Player */}
            <div className="p-4">
              <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
                <iframe
                  src={src}
                  title="Transmisión en vivo"
                  className="h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  referrerPolicy="no-referrer"
                  allowFullScreen
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Consejo: toca el icono de pantalla completa para una mejor experiencia en móvil.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
