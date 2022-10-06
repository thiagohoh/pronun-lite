type Props = {
  onChange: (str: string) => void;
  value: string;
  disable: boolean;
  onFocus?: () => void;
};

function Input({ onChange, value, disable, onFocus }: Props) {
  return (
    <div>
      <input
        onFocus={onFocus}
        disabled={disable}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="font-semibold bg-gray-200 border border-purple-300 text-gray-900 text-lg rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
        type="text"
      />
    </div>
  );
}

export default Input;
