interface ContactFormData {
  full_name: string;
  email: string;
  phone_number?: string;
  message: string;
}

export async function sendContactForm(data: ContactFormData): Promise<any> {
  const response = await fetch("http://localhost:8080/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.error ?? "Error al enviar el formulario");
  }

  return response.json();
}
