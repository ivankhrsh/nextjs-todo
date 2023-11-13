import { initAdmin } from "@/app/firebase/firebaseAdmin";
import { deleteTodo, getTodosAdmin, handleAddTodo, handleUpdateTodo } from "@/app/firebase/firebaseActions";

export async function GET(request: Request, response: Response) {
  await initAdmin();
  const todos = await getTodosAdmin();

  return Response.json(todos, { status: 200 });
}

export async function POST(request: Request, response: Response) {
  const {title, description} = await request.json();
  await handleAddTodo(title, description)

  return Response.json({ status: 201 });
}

export async function PUT(request: Request, response: Response) {
  const data = await request.json();
  await handleUpdateTodo(data)

  return Response.json({ status: 200 });
}

export async function DELETE(request: Request, response: Response) {
  const { id } = await request.json();
  await deleteTodo(id);

  return Response.json({ status: 204 });
}