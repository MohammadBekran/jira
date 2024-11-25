import { hc } from "hono/client";

import type { TAppType } from "@/app/api/[[...route]]/route";

const client = hc<TAppType>(process.env.NEXT_PUBLIC_APP_URL!);

export default client;
