"use client";
import React, { forwardRef, useImperativeHandle } from "react";

const ReportForm = forwardRef((props, ref) => {
  const [result, setResult] = React.useState("");
  const formRef = React.useRef();

  const handleSubmit = async () => {
    setResult("Enviando....");
    const formData = new FormData(formRef.current);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("El error ha sido enviado");
      formRef.current.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div>
      <form ref={formRef}>
        <textarea
          placeholder="Describe el problema..."
          className="outline-none w-full min-h-30 bg-stone-900 rounded-lg p-2"
          required
        />
      </form>
      <span>{result}</span>
    </div>
  );
});

export default ReportForm;
