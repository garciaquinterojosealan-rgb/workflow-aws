const webhookURL = "https://alangaqa.app.n8n.cloud/webhook/beb4acb7-e2fa-49f6-ba25-d4bd3455315e";

  document.getElementById("calcForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const resultadoDiv = document.getElementById("resultado");
    const button = document.getElementById("submitBtn");
    resultadoDiv.style.display = "none";
    resultadoDiv.innerText = "";

    const operacion = document.getElementById("operacion").value;

    // --- NUEVA ANIMACIÓN (como tu ejemplo) ---
    button.disabled = true;
    button.textContent = "Enviando..."; 
    // -----------------------------------------

    try {
      // Obtiene IP pública
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();

      // Envía datos al Webhook
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operacion: operacion,
          ip_publica: ipData.ip
        })
      });

      if (!response.ok) throw new Error("Error al conectar con n8n");

      const data = await response.json();

    // Muestra resultado
      resultadoDiv.style.display = "block";
      resultadoDiv.innerHTML = `
        <div class="card2">
            <h1>Resultado de la Operación</h1>
            <p><strong>Operación:</strong> ${data.operacion}</p>
            <p><strong>Resultado:</strong> ${data.resultado}</p>
        </div>
      `;
    } catch (err) {
        resultadoDiv.style.display = "block";
        resultadoDiv.innerHTML = `Error: ${err.message}`;
    } finally {
      // --- RESTAURAR BOTÓN (igual que tu ejemplo) ---
      button.disabled = false;
      button.textContent = "Calcular";
      // ----------------------------------------------
    }

    e.target.reset();
  });
