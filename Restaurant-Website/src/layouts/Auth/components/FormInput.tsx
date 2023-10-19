interface InputProps {
  placeholder: string;
  text: string;
  type: string;
  name: string;
  value?: string;
  phone?: string;
  avatar?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setUser: (newValue: any) => void;
  error?: string;
}
const FormInput: React.FC<InputProps> = (props) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.text}
      </label>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          props.setUser((prev: any) => ({
            ...prev,
            [props.name]: e.target.value,
          }))
        }
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {props.error && (
        <div className="text-red-500 text-sm mt-1">{props.error}</div>
      )}
    </div>
  );
};

export default FormInput;
