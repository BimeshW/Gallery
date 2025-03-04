import bcrypt from "bcryptjs";

interface CheckProps {
  passcode: string;
  user_passcode: string;
}

export const hashPassword = async (passcode: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass =await bcrypt.hash(passcode, salt);

    return hashedPass;
  } catch (error) {
    console.log("Error trying to hash password", error);
  }
};


export const checkPasscode = async ({passcode, user_passcode} : CheckProps) => {
  const isCorrect = await bcrypt.compare(passcode, user_passcode);

  return isCorrect;
}