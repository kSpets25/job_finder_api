export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { keywords, location } = req.body;
  
    try {
      const response = await fetch(
        `https://jooble.org/api/${process.env.JOOBLE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keywords,
            location,
          }),
        }
      );
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(500).json({ message: "Jooble API error" });
      }
  
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
  