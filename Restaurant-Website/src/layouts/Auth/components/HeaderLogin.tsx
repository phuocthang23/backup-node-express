import { HeaderLogin } from "../../../interface/interface";
const HeaderLogin: React.FC<HeaderLogin> = ({ heading }) => {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {heading}
        </h2>
      </div>
    </div>
  );
};

export default HeaderLogin;
