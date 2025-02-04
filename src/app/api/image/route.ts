import axios from "axios";
import { NextResponse } from "next/server";

// Define a type for the request's query parameters
// interface QueryParams {
//   url: string;
// }

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url") as string;

  if (!url)
    return NextResponse.json({ error: "URL is required" }, { status: 400 });

  try {
    const response: any = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const headers = new Headers();
    headers.set("Content-Type", response.headers["content-type"]);

    return new NextResponse(response.data, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 500 }
    );
  }
}
