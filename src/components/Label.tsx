type Props = {
  label: string;
};

function Label({ label }: Props) {
  return (
    <label className="block mb-2 text-base font-semibold text-gray-200 ">
      {label}
    </label>
  );
}

export default Label;
