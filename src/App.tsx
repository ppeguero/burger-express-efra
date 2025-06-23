import { useState } from "react";
import { sendContactForm } from "./utils/http";
import { isValidEmail, sanitizeMessage, isNonEmpty } from "./utils/validation";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (
      !isNonEmpty(formData.name) ||
      !isNonEmpty(formData.email) ||
      !isNonEmpty(formData.message)
    ) {
      setError("Todos los campos obligatorios deben estar completos.");
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("El correo no es válido.");
      setLoading(false);
      return;
    }

    const sanitizedMessage = sanitizeMessage(formData.message);

    try {
      await sendContactForm({
        full_name: formData.name.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        message: sanitizedMessage,
      });
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      setError("Error al enviar el formulario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen scroll-smooth">
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50">
        <h1 className="text-yellow-400 text-4xl font-extrabold">
          Burger Express
        </h1>
        <nav className="space-x-6 text-sm md:text-base font-semibold">
          <a
            href="#hero"
            className="text-gray-100 hover:text-yellow-400 transition"
          >
            Inicio
          </a>
          <a
            href="#reviews"
            className="text-gray-100 hover:text-yellow-400 transition"
          >
            Reseñas
          </a>
          <a
            href="#contact"
            className="text-gray-100 hover:text-yellow-400 transition"
          >
            Contacto
          </a>
        </nav>
      </header>

      <section
        id="hero"
        className="relative bg-[url('/burger.jpg')] bg-cover bg-center min-h-[90vh] flex items-center justify-left text-center px-6 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-32 after:bg-gradient-to-b after:from-transparent after:to-[#030712]"
      >
        <div className="bg-opacity-70 p-8 rounded-xl text-left">
          <h2 className="text-8xl font-extrabold mb-4">
            ¡Rápidas y <br />
            <p className="text-yellow-400">sabrosas!</p>
          </h2>

          <p className="text-2xl text-gray-200 max-w-xl mx-auto">
            ¡Las hamburguesas más rápidas y sabrosas de la ciudad! <br />
            Calidad, velocidad y sabor en cada bocado.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 py-16">
        <section className="grid md:grid-cols-2 gap-8 mb-20 px-6">
          <div className="bg-black/70 backdrop-blur-md border border-yellow-500 p-6 rounded-2xl shadow-[0_10px_30px_rgba(255,255,0,0.2)] transition hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,255,0,0.3)]">
            <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2 marker:text-yellow-400">
              <li>Ingredientes frescos y de calidad</li>
              <li>Preparación ultra rápida</li>
              <li>Servicio a domicilio disponible</li>
              <li>Ofertas semanales irresistibles</li>
            </ul>
          </div>

          <div className="bg-black/70 backdrop-blur-md border border-yellow-500 p-6 rounded-2xl shadow-[0_10px_30px_rgba(255,255,0,0.2)] transition hover:scale-[1.02] hover:shadow-[0_12px_40px_rgba(255,255,0,0.3)]">
            <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">
              Nuestras Especialidades
            </h2>
            <ul className="list-disc list-inside text-gray-200 space-y-2 marker:text-yellow-400">
              <li>Cheeseburger Clásica</li>
              <li>Hamburguesa BBQ</li>
              <li>Veggie Delight</li>
              <li>Combo Familiar</li>
            </ul>
          </div>
        </section>

        {/* Testimonios */}
        <section
          id="reviews"
          className="bg-black/80 backdrop-blur-md border border-yellow-500 p-8 rounded-2xl shadow-[0_10px_30px_rgba(255,255,0,0.1)] mb-20 px-6"
        >
          <h2 className="text-3xl font-extrabold text-yellow-400 mb-8 text-center">
            Clientes felices
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-200">
            <blockquote className="bg-gray-900/70 p-6 rounded-xl shadow-md hover:shadow-yellow-400/20 transition">
              <div className="flex items-center gap-2 mb-3 text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
              </div>
              <p className="italic mb-2">
                “¡Nunca pensé que algo tan rápido pudiera saber tan bien!
                Recomiendo la BBQ.”
              </p>
              <footer className="text-yellow-300 font-semibold">
                – Ana G.
              </footer>
            </blockquote>

            <blockquote className="bg-gray-900/70 p-6 rounded-xl shadow-md hover:shadow-yellow-400/20 transition">
              <div className="flex items-center gap-2 mb-3 text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
              </div>
              <p className="italic mb-2">
                “El combo familiar fue perfecto para nuestra reunión.
                ¡Volveremos pronto!”
              </p>
              <footer className="text-yellow-300 font-semibold">
                – Luis R.
              </footer>
            </blockquote>

            <blockquote className="bg-gray-900/70 p-6 rounded-xl shadow-md hover:shadow-yellow-400/20 transition">
              <div className="flex items-center gap-2 mb-3 text-yellow-400">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 fill-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.564-.955L10 0l2.948 5.955 6.564.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
              </div>
              <p className="italic mb-2">
                “El servicio es excelente y la hamburguesa veggie es mi
                favorita.”
              </p>
              <footer className="text-yellow-300 font-semibold">
                – Mariana T.
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Formulario de contacto */}
        <section
          id="contact"
          className="bg-yellow-400 text-gray-900 p-8 rounded-2xl shadow-xl mb-16 text-center"
        >
          <h2 className="text-3xl font-bold mb-2">
            ¿Tienes preguntas o comentarios?
          </h2>
          <p className="text-lg mb-6">
            Envíanos un mensaje y nos pondremos en contacto contigo pronto.
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 max-w-2xl mx-auto text-left"
          >
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Tu teléfono (opcional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-white text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <textarea
              name="message"
              placeholder="Tu mensaje"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-white text-black rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-yellow-400 font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            {success && (
              <p className="font-bold text-center mt-2">
                Mensaje enviado correctamente!
              </p>
            )}
            {error && <p className="text-red-700 text-sm mt-2">{error}</p>}
          </form>
        </section>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 Burger Express. Todos los derechos reservados.
      </footer>
    </div>
  );
}
