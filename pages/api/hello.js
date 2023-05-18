import { serialize } from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize("MyCookie", "Hello World", {
    path: "/",
  }))
  res.status(200).json({ result: 'Ok' })
}
