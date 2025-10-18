import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const useDbCheckUserCredentials = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data } = db.useQuery({ doctors: { $: { where: { email } } } });
  const [user, setUser] = useState<{} | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!data?.doctors[0]) return setError("User not found");
      const user = data.doctors[0];
      console.log(user.password, "user");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return setError("Invalid credentials");

      setUser(user);
    };

    if (email && password) verify();
  }, [data, email, password]);

  return { user, error };
};
