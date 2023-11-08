import { initAdmin } from "@/app/firebase/firebaseAdmin";
import { getTodos } from "@/app/firebase/firebaseGetData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
  await initAdmin();
  const todos = await getTodos();

  return NextResponse.json(todos, { status: 200 });
}