import type { LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect('/meteo/07156')
}
