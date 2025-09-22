"use client";
import React from "react";

export default function ReportForm() {
  const [result, setResult] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult("Enviando....");
    const formData = new FormData(e.target);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Reporte enviado con éxito ✅");
      e.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={onSubmit}>
        <textarea
          name="message"
          placeholder="Describe el problema..."
          className="outline-none w-full min-h-30 bg-stone-900 rounded-lg p-2"
          required
        />
        <span>{result}</span>
        <button
          type="submit"
          className="bg-white text-black w-full rounded-md h-9 hover:bg-stone-300 font-bold transition duration-200 -mb-3 mt-4"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
