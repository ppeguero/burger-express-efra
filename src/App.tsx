import { useState } from "react";
import { sendContactForm } from "./utils/http";
import { isValidEmail, sanitizeMessage, isNonEmpty } from "./utils/validation";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!isNonEmpty(formData.name) || !isNonEmpty(formData.email) || !isNonEmpty(formData.message)) {
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
    } catch (err) {
      setError("Error al enviar el formulario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-yellow-400">Burger Express</h1>
        <p className="text-lg text-gray-400">¡Las hamburguesas más rápidas y sabrosas!</p>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">¿Por qué elegirnos?</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Ingredientes frescos y de calidad</li>
              <li>Preparación ultra rápida</li>
              <li>Servicio a domicilio disponible</li>
              <li>Ofertas semanales irresistibles</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Nuestras Especialidades</h2>
            <ul className="list-disc list-inside text-gray-300">
              <li>Cheeseburger Clásica</li>
              <li>Hamburguesa BBQ</li>
              <li>Veggie Delight</li>
              <li>Combo Familiar</li>
            </ul>
          </div>
        </section>

        <section className="bg-gray-900 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Tu teléfono (opcional)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              name="message"
              placeholder="Tu mensaje"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 text-white rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            {success && <p className="text-green-400 text-sm">Mensaje enviado correctamente.</p>}
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </form>
        </section>
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        © 2025 Burger Express. Todos los derechos reservados.
      </footer>
    </div>
  );
}