import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint principal
app.get("/offers", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.mercadolibre.com/sites/MLB/search?q=oferta&limit=10",
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json"
        }
      }
    );

    const data = await response.json();

    res.json({
      success: true,
      total: data.results.length,
      items: data.results.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        original_price: item.original_price,
        permalink: item.permalink,
        thumbnail: item.thumbnail
      }))
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("API rodando na porta " + PORT);
});
