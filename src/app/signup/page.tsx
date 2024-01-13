import { Circle } from "@/components/shapes/Circle";
import { SignUpForm } from "@/components/signUp/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-800 text-white">
      <div className="relative z-10 w-1/2">
        <SignUpForm />

        <div className="absolute -left-20 -top-20 -z-10">
          <Circle color="orange" />
        </div>
        <div className="absolute -bottom-16 -right-12 -z-10">
          <Circle color="blue" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
