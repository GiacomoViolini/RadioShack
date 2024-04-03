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
      return "#ec4899";
    case "Grigio":
      return "#6b7280";
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
  s = s.replace(/_/g, " ");
  const temp = s.split(" ");
  for (let i = 0; i < temp.length; i++) {
    temp[i] = temp[i].charAt(0).toUpperCase() + temp[i].slice(1);
  }
  return temp.join(" ");
}

export { convertiColori, convertiCapacità, capitalize };
