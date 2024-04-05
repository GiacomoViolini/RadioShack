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

const Colors: { 
  [key: string]: string[][]
} = {
  "Prodotti": [
      ["rgba(221, 214, 254, 1)", "rgba(167, 139, 250, 1)"],
      ["rgba(237, 233, 254, 1)", "rgba(213, 186, 252, 1)"],
      ["rgba(252, 251, 253, 1)", "rgba(221, 214, 254, 1)"]
  ],
  "Fornitori": [
      ["rgba(185, 246, 202, 1)", "rgba(5, 150, 105, 1)"],
      ["rgba(209, 250, 229, 1)", "rgba(52, 211, 153, 1)"],
      ["rgba(233, 252, 241, 1)", "rgba(185, 246, 202, 1)"]
  ],
  "Clienti": [
      ["rgba(253, 230, 138, 1)", "rgba(245, 158, 11, 1)"],
      ["rgba(254, 243, 199, 1)", "rgba(249, 168, 37, 1)"],
      ["rgba(255, 251, 235, 1)", "rgba(253, 230, 138, 1)"]
  ],
  "Statistiche": [
      ["rgba(219, 234, 254, 1)", "rgba(96, 165, 250, 1)"],  
      ["rgba(219, 234, 254, 1)", "rgba(96, 165, 250, 1)"],
      ["rgba(219, 234, 254, 1)", "rgba(96, 165, 250, 1)"],
  ],
};

function AssignColor(Coppie:[string, number][], Category:string):[string[],string[]] {
  let elements = Coppie.length;
  let auxBackColor: string[] = [];
  let auxBorColor: string[] = [];
  let Colorsaux = Colors[Category];
  if (!Colorsaux) {
    throw new Error(`Category ${Category} not found in Colors`);
  }
  let ColorsauxTotal: [string, string][] = [];
  for(let i = 0; i < elements; i++) 
      for(let j = 0; j < 3; j++,i++)
          ColorsauxTotal.push([Colorsaux[j][0], Colorsaux[j][1]]);
  for(let i = 0; i < ColorsauxTotal.length; i++) {
      auxBackColor.push(ColorsauxTotal[i][0]);
      auxBorColor.push(ColorsauxTotal[i][1]);
  }
  return [auxBackColor,auxBorColor]
}

export { convertiColori, convertiCapacità, capitalize, AssignColor };
