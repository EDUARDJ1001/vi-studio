"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { ArrowRight, PlayCircle, Sparkles, PhoneCall, MapPin, Clock, Check, Send } from "lucide-react";
import Image from "next/image";

// If you place your logo in /public/logo.png, update the src below accordingly.
// For now, we keep an <img> fallback to avoid Next/Image build issues in plain previews.

export default function Page() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const sectionVariants = {
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSending(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(json?.error || `Error ${res.status}`);
            }

            setSent(true);
            (e.target as HTMLFormElement).reset();

            await Swal.fire({
                icon: "success",
                title: "¡Cotización enviada!",
                text: "Te responderemos en menos de 24 horas.",
                confirmButtonColor: "#0f172a",
            });
        } catch (error: unknown) {
            let errorMessage = "No se pudo enviar la cotización.";

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            await Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage,
                confirmButtonColor: "#dc2626",
            });
        }
        finally {
            setSending(false);
        }
    };



    return (
        <div className="min-h-screen bg-white text-slate-900">
            {/* NAV */}
            <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img
                                src="/img/Logo.png"
                                alt="VI Studio logo"
                                className="h-16 w-auto select-none"
                            />
                            <span className="text-xl font-semibold tracking-tight">VI Studio</span>
                        </div>
                        <nav className="hidden md:flex items-center gap-8 text-sm">
                            <a href="#servicios" className="hover:text-slate-600">Servicios</a>
                            <a href="#beneficios" className="hover:text-slate-600">Beneficios</a>
                            <a href="#planes" className="hover:text-slate-600">Planes</a>
                            <a href="#contacto" className="hover:text-slate-600">Contacto</a>
                        </nav>
                        <a
                            href="#contacto"
                            className="inline-flex items-center gap-2 rounded-2xl border border-transparent bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500 px-4 py-2 text-white shadow-sm transition active:scale-[0.98]"
                        >
                            Cotizar ahora <ArrowRight className="size-4" />
                        </a>
                    </div>
                </div>
            </header>

            {/* HERO */}
            <section className="relative overflow-hidden">
                {/* Decorative blobs */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-pink-300/60 via-sky-300/60 to-violet-300/60 blur-3xl"
                />
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-900/10">
                                <Sparkles className="size-3" />
                                Publicidad efectiva en zonas urbanas
                            </div>
                            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                                Llega a miles de miradas<br /> con pantallas LED <span className="bg-gradient-to-r from-pink-500 via-sky-500 to-violet-600 bg-clip-text text-transparent">impactantes</span>
                            </h1>
                            <p className="mt-4 max-w-xl text-base/7 text-slate-600">
                                En VI Studio conectamos tu marca con audiencias reales en las principales zonas urbanas. Creatividad, alcance y medición en una misma solución.
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <a href="#contacto" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-white transition active:scale-[0.98]">
                                    Cotiza gratis <ArrowRight className="size-4" />
                                </a>
                                <a href="#beneficios" className="inline-flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-slate-900">
                                    Ver cómo funciona <PlayCircle className="size-5" />
                                </a>
                            </div>
                            <div className="mt-6 flex items-center gap-6 text-xs text-slate-600">
                                <div className="flex items-center gap-2"><Clock className="size-4" /> Spots de 15s</div>
                                <div className="flex items-center gap-2"><MapPin className="size-4" /> Cobertura urbana</div>
                                <div className="flex items-center gap-2"><PhoneCall className="size-4" /> Soporte inmediato</div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.9 }}
                            className="relative"
                        >
                            <div className="relative mx-auto aspect-[16/10] w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                                {/* Mock screen with animated gradient */}
                                <motion.div
                                    initial={{ backgroundPosition: "0% 50%" }}
                                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(120deg, rgba(244,114,182,.5) 0%, rgba(56,189,248,.5) 50%, rgba(139,92,246,.5) 100%)",
                                        backgroundSize: "200% 200%",
                                    }}
                                />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.5),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,.4),transparent_60%)]" />
                                <div className="relative z-10 grid h-full grid-cols-3 gap-3 p-5">
                                    {[...Array(9)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05, duration: 0.5 }}
                                            className="rounded-xl bg-white/70 p-3 shadow-sm ring-1 ring-white/40 backdrop-blur"
                                        >
                                            <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-pink-300/60 via-sky-300/60 to-violet-300/60" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SERVICIOS */}
            <section id="servicios" className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Servicios</h2>
                        <p className="mt-3 max-w-2xl text-slate-600">Todo lo que necesitas para destacar en vía pública: creatividad, planificación de medios, operación y reportes.</p>
                    </motion.div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Gestión de pauta",
                                desc: "Planeación por zonas, horarios y segmentos de alto tráfico.",
                            },
                            {
                                title: "Producción creativa",
                                desc: "Diseño de spots dinámicos y adaptaciones al instante.",
                            },
                            {
                                title: "Cobertura urbana",
                                desc: "Red de pantallas LED estratégicas en puntos clave.",
                            },
                            {
                                title: "Reporte y evidencia",
                                desc: "Entrega de evidencias de reproducción y métricas de alcance.",
                            },
                            {
                                title: "Optimización continua",
                                desc: "A/B testing de creatividades y mejoras mensuales.",
                            },
                            {
                                title: "Soporte prioritario",
                                desc: "Atención ágil por WhatsApp, correo y teléfono.",
                            },
                        ].map((s, i) => (
                            <motion.div
                                key={s.title}
                                variants={sectionVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ delay: i * 0.05 }}
                                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="absolute -top-3 right-4 h-6 w-6 rounded-full bg-gradient-to-tr from-pink-400 via-sky-400 to-violet-500 blur-[1px]" />
                                <h3 className="text-lg font-semibold">{s.title}</h3>
                                <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BENEFICIOS */}
            <section id="beneficios" className="bg-gradient-to-b from-white to-slate-50 py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Por qué VI Studio?</h2>
                        <p className="mt-3 max-w-2xl text-slate-600">Porque combinamos creatividad y tecnología para que tu anuncio no pase desapercibido.</p>
                    </motion.div>

                    <div className="mt-10 grid gap-6 lg:grid-cols-3">
                        {[
                            {
                                title: "Alcance masivo",
                                bullets: ["150 spots diarios por pauta", "Cobertura Lunes a Domingo", "Horarios 6:00 a 22:00"],
                            },
                            {
                                title: "Flexibilidad total",
                                bullets: ["Contratos 3/6/12 meses", "2 cambios de contenido/mes", "Formatos 4:3 y 16:9"],
                            },
                            {
                                title: "Resultados claros",
                                bullets: ["Evidencias de reproducción", "Reportes mensuales", "Optimización constante"],
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={card.title}
                                variants={sectionVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold">{card.title}</h3>
                                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                                    {card.bullets.map((b) => (
                                        <li key={b} className="flex items-start gap-2">
                                            <Check className="mt-0.5 size-4" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PLANES */}
            <section id="planes" className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Planes de contratación</h2>
                        <p className="mt-3 max-w-2xl text-slate-600">Elige el plan que se adapte a tus objetivos. Todos incluyen evidencia y soporte.</p>
                    </motion.div>

                    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            { name: "3 meses", price: "Ideal para campañas estacionales", features: ["Lanzamiento rápido", "Optimización básica", "Evidencia quincenal"] },
                            { name: "6 meses", price: "Equilibrio entre alcance y costo", features: ["Optimización mensual", "2 cambios/mes", "Evidencia semanal"] },
                            { name: "12 meses", price: "Máxima visibilidad anual", features: ["Mejor CPM", "A/B testing", "Reportes avanzados"] },
                        ].map((p, i) => (
                            <motion.div
                                key={p.name}
                                variants={sectionVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="absolute -top-3 left-4 h-6 w-6 rounded-full bg-gradient-to-tr from-pink-400 via-sky-400 to-violet-500 blur-[1px]" />
                                <h3 className="text-lg font-semibold">{p.name}</h3>
                                <p className="mt-1 text-sm text-slate-600">{p.price}</p>
                                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                                    {p.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2">
                                            <Check className="mt-0.5 size-4" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <a href="#contacto" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-white">
                                    Solicitar cotización <ArrowRight className="size-4" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BIG */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-sky-400 to-violet-500" />
                <div className="relative">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                        <div className="grid items-center gap-8 lg:grid-cols-2">
                            <div className="text-white">
                                <h3 className="text-3xl font-bold leading-tight sm:text-4xl">¿Listo para destacar en la ciudad?</h3>
                                <p className="mt-2 max-w-xl text-white/90">Hablemos hoy mismo y arma tu pauta en nuestras pantallas LED. Respuesta en menos de 24 horas.</p>
                            </div>
                            <div className="flex justify-start lg:justify-end gap-3">
                                <a href="#contacto" className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-slate-900">
                                    Escríbenos <Send className="size-4" />
                                </a>
                                <a href="tel:+50400000000" className="inline-flex items-center gap-2 rounded-2xl border border-white/40 px-5 py-3 text-white">
                                    Llamar ahora <PhoneCall className="size-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACTO */}
            <section id="contacto" className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div variants={sectionVariants} initial="hidden" whileInView="show" viewport={{ once: true }}>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Contáctanos</h2>
                        <p className="mt-3 max-w-2xl text-slate-600">Cuéntanos de tu marca y objetivos. Te enviaremos una propuesta a la medida.</p>
                    </motion.div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-2">
                        <form onSubmit={onSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <label className="text-sm font-medium">Nombre</label>
                                    <input
                                        name="nombre"
                                        required
                                        placeholder="Tu nombre"
                                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="text-sm font-medium">Empresa</label>
                                    <input
                                        name="empresa"
                                        placeholder="Nombre de empresa"
                                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="text-sm font-medium">Correo</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="text-sm font-medium">Teléfono</label>
                                    <input
                                        name="telefono"
                                        type="tel"
                                        placeholder="+504 ..."
                                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-medium">Mensaje</label>
                                    <textarea
                                        name="mensaje"
                                        required
                                        rows={5}
                                        placeholder="Cuéntanos tu objetivo de campaña"
                                        className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-sky-400"
                                    />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                {sent ? (
                                    <span className="text-sm text-green-600">¡Mensaje enviado! Te responderemos pronto.</span>
                                ) : (
                                    <span className="text-sm text-slate-500">Respuesta en menos de 24 horas.</span>
                                )}
                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-white disabled:opacity-60"
                                >
                                    {sending ? "Enviando…" : "Enviar"}
                                    <Send className="size-4" />
                                </button>
                            </div>
                        </form>

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-semibold">Dónde estamos</h3>
                            <p className="mt-2 text-sm text-slate-600">Operamos en zonas urbanas de alto tráfico. Escríbenos para conocer nuestros puntos y disponibilidad.</p>
                            <div className="mt-4 grid gap-3 text-sm">
                                <div className="flex items-center gap-2"><MapPin className="size-4" /> Puerto Cortes, Honduras</div>
                                <div className="flex items-center gap-2"><Clock className="size-4" /> Lunes a Viernes, 8:00 AM a 4:00 PM</div>
                                <div className="flex items-center gap-2"><PhoneCall className="size-4" /> +504 9351-8861</div>
                            </div>

                            <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl">
                                <iframe
                                    title="Mapa"
                                    className="h-full w-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1505.968977229778!2d-87.92920111003423!3d15.829002017139887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2shn!4v1723380000000"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-slate-100 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <img src="/img/Logo.png" alt="VI Studio" className="h-12 w-auto" />
                            <span>© {new Date().getFullYear()} VI Studio. Todos los derechos reservados.</span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-400 text-center sm:text-right">
                            Contáctanos por whatsapp{" "}
                            <a
                                href="https://wa.me/50493518861"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                VI STUDIO
                            </a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
