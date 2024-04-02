function convertiColori(color: string) {
  switch (color) {
    case "Rosso":
      return "#ef4444";
    case "Blu":
      return "#3b82f6";
    case "Verde":
      return "#10b981";
    case "Giallo":
      return "#eab308";
    case "Viola":
      return "#a855f7";
    case "Arancione":
      return "#f97316";
    case "Rosa":
      return "pink-500";
    case "Grigio":
      return "gray-500";
    case "Bianco":
      return "white";
    case "Nero":
      return "black";
    default:
      return color;
  }
}

export { convertiColori };
