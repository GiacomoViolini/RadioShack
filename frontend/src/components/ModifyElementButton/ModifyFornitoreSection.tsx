import { Fornitore } from "../../interfaceHelper";

interface SecondColumnProps{
  fornitore: Fornitore;
  setFornitore: React.Dispatch<React.SetStateAction<Fornitore>>;
}
export default function SecondColumnModifyFornitore({ fornitore, setFornitore }: SecondColumnProps) {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFornitore({
      ...fornitore,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="col-span-2 grid grid-cols-2 justify-center p-10 gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="nome" className="text-zinc-800 font-semibold"> Nome </label>
        <hr className="h-2 border-t-2 border-zinc-400" />
        <input
          type="text"
          name="nome"
          id="nome"
          className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
          placeholder={fornitore.nome}
          value={fornitore.nome}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-zinc-800 font-semibold"> Email </label>
        <hr className="h-2 border-t-2 border-zinc-400" />
        <input
          type="email"
          name="email"
          id="email"
          className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
          placeholder={fornitore.email}
          value={fornitore.email}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="iban" className="text-zinc-800 font-semibold"> Iban </label>
        <hr className="h-2 border-t-2 border-zinc-400" />
        <input
          type="text"
          name="iban"
          id="iban"
          className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
          placeholder={fornitore.iban}
          value={fornitore.iban}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="indirizzo" className="text-zinc-800 font-semibold"> Indirizzo </label>
        <hr className="h-2 border-t-2 border-zinc-400" />
        <input
          type="text"
          name="indirizzo"
          id="indirizzo"
          className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
          placeholder={fornitore.indirizzo}
          value={fornitore.indirizzo}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="referente" className="text-zinc-800 font-semibold"> Referente </label>
        <hr className="h-2 border-t-2 border-zinc-400" />
        <input
          type="text"
          name="referente"
          id="referente"
          className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
          placeholder={fornitore.referente}
          value={fornitore.referente}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="telefono" className="text-zinc-800 font-semibold"> Telefono </label>
        <hr className="h-2 border-t-2 border-zinc-400" />
        <input
          type="tel"
          name="telefono"
          id="telefono"
          className="w-full rounded py-1 px-2 border-2 border-zinc-800 placeholder:text-zinc-200"
          placeholder={fornitore.telefono}
          value={fornitore.telefono}
          onChange={handleOnChange}
          required
        />
      </div>
    </div>
  );
}