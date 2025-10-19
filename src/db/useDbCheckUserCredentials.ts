import { useState } from "react";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

type CheckUserParams = {
  email: string;
  password: string;
};

export const useDbCheckUserCredentials = () => {
  const [user, setUser] = useState<{} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkUser = async ({ email, password }: CheckUserParams) => {
    setError(null);
    setUser(null);
    try {
      const { data } = await db.queryOnce({
        doctors: { $: { where: { email } } },
      });

      if (!data?.doctors[0]) {
        setError("User not found");
        return null;
      }

      const foundUser = data.doctors[0];

      const isValid = await bcrypt.compare(password, foundUser.password);

      if (!isValid) {
        setError("Invalid credentials");
        return null;
      }

      setUser(foundUser);
      return foundUser;
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
      return null;
    }
  };

  return { user, error, checkUser };
};
