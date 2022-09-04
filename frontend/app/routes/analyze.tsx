import { Form, useActionData } from "@remix-run/react";
import { ActionFunction } from "@remix-run/server-runtime";
import axios from "axios";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request, params }) => {

  const formData = await request.formData()
  const text = formData.get('text') as string

  const result = await axios.post("http://localhost:8000/sentiment/analyzer", { text })
  return result.data
};


export default function analyze() {
  const actionData = useActionData<typeof action>();
  return (
    <Form method="post">
      <input type="text" name="text" />
      <button type="submit" name="submit"> valider </button>
    </Form>
  )
}