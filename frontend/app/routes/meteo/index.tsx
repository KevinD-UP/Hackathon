import type { LoaderFunction } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect('/meteo/07156?start=1950&end=2020&decade=on&city=Paris')
}
