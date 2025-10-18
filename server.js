// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.json());

// Servir archivos estáticos desde "dist"
app.use(express.static(path.join(__dirname, "dist")));

// ✅ Ruta para crear sesión de pago
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Descarga IA 30GB",
              description: "Archivo de inteligencia artificial de 30GB",
            },
            unit_amount: 2000 * 100, // $20 USD
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://TU_DOMINIO/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://TU_DOMINIO/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Ruta de éxito (habilita descarga temporal)
app.get("/success", async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const enlaceMega = "https://mega.nz/file/TU_ARCHIVO#CLAVE"; // 🔗 tu enlace de MEGA
      res.send(`
        <html>
          <body style="font-family:sans-serif;text-align:center;padding:40px;">
            <h2>✅ ¡Pago confirmado!</h2>
            <p>Tu descarga estará disponible durante las próximas 24 horas:</p>
            <a href="${enlaceMega}" target="_blank" 
              style="display:inline-block;background:#4CAF50;color:white;padding:12px 24px;
                     text-decoration:none;border-radius:8px;margin-top:20px;">
              Descargar ahora
            </a>
          </body>
        </html>
      `);
    } else {
      res.status(403).send("❌ Pago no verificado");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al verificar el pago");
  }
});

// Redirigir todas las rutas al index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
