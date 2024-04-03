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

function convertiCapacità(capacità: number) {
  switch (capacità) {
    case 64:
      return "64 GB";
    case 128:
      return "128 GB";
    case 256:
      return "256 GB";
    case 512:
      return "512 GB";
    case 1024:
      return "1 TB";
    default:
      return capacità;
  }
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}


export { convertiColori, convertiCapacità , capitalize };
