import { BottomWarning } from "../components/ButtomWarning";
import { Button } from "../components/Button";
import Heading from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

const Signin = () => {
  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="p-2 px-4 text-center bg-white rounded-lg w-80 h-max">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox placeholder="test@gmail.com" label={"Email"} />
          <InputBox placeholder="123456" label={"Password"} />
          <div className="pt-4">
            <Button label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
