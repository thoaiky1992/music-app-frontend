import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { FC } from "react";
interface LoginFormProps {
  handleDirectRegistForm: Function;
}
const LoginForm: FC<LoginFormProps> = ({ handleDirectRegistForm }) => {
  return (
    <form>
      <div className="flex flex-row items-center justify-center lg:justify-start">
        <p className="text-md lg:text-lg mb-0 mr-4 text-text-2">Sign in</p>
      </div>
      {/* Email input */}
      <div className="mb-6 mt-10">
        <input
          type="text"
          className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-text-2 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:ring-high-light focus:ring-1 focus:outline-none"
          placeholder="Email address"
        />
      </div>
      {/* Password input */}
      <div className="mb-6">
        <input
          type="password"
          className="form-control block w-full px-4 py-2 text-xs lg:text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 0 focus:outline-none focus:ring-high-light focus:ring-1"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="relative form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:text-white checked:bg-high-light checked:border-high-light focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            id="exampleCheck2"
          />
          <label
            className="form-check-label inline-block text-xs lg:text-sm text-text-2"
            htmlFor="exampleCheck2"
          >
            Remember me
          </label>
        </div>
      </div>
      <div className="text-center lg:text-left">
        <button
          type="button"
          className="inline-block px-7 py-2 lg:py-3 bg-high-light text-white font-medium text-xs lg:text-sm leading-snug uppercase rounded shadow-md focus:outline-none"
        >
          Login
        </button>
        <p className="text-xs lg:text-sm font-semibold mt-2 pt-1 mb-0 flex items-start">
          Don't have an account ?
          <button
            onClick={() => handleDirectRegistForm()}
            className="text-high-light hover:text-high-light focus:text-red-700 transition duration-200 ease-in-out text-xs lg:text-sm flex items-center"
          >
            &nbsp; <ArrowNarrowRightIcon className="w-4 h-4 mx-2" />
            Register
          </button>
        </p>
      </div>
    </form>
  );
};
export default LoginForm;
