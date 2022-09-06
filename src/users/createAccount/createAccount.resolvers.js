import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });

        if (existingUser) {
          console.log(existingUser);
          throw new Error("This username/Password is already taken");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        //await를 쓰지 않고 return 써도 브라우저는 기다려준다
        await client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
        return { ok: true };
      } catch (e) {
        return e;
      }
    },
  },
};
