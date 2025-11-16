function buildPrompt(name, language, tone) {
  const langLine =
    language === "Hindi"
      ? "Write the message in Hindi (use Devangiri Script)."
      : language === "Bengali"
      ? "Write the message in Bengali."
      : "Write the message in English.";
  const toneLine =
    tone === "Formal"
      ? "Use a polite/formal tone suitable for colleagues , elders or professionals."
      : "Use a warm informal tone for close friends and family";
  return `Create a diwali greeting for me with the language=${langLine} and use the tone as ${toneLine} and please use my receipient name as ${name}`;
}
module.exports = { buildPrompt };
