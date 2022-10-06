import Label from "./Label";

type Props = {
  onOption: (str: string) => void;
};

function Select({ onOption }: Props) {
  return (
    <>
      <Label label="Select language" />
      <select
        onChange={(e) => onOption(e.target.value)}
        className="bg-gray-200 border border-purple-400 text-gray-700 text-base rounded-lg focus:ring-purple-900 p-2 block"
      >
        <option defaultValue="English" value="en-US">
          English
        </option>
        <option value="ja-JP">Japanese</option>
        <option value="ko-KR">Korean</option>
        <option value="es-ES">Spanish</option>
        <option value="pt-BR">Portugese</option>
      </select>
    </>
  );
}

export default Select;
