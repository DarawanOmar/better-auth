import { EmailTemplate } from "@/components/resend-template";
import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: "Better Auth <resetpassword@birgasoft.com>",
    to: ["darait721@gmail.com"],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "Darawan" }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
