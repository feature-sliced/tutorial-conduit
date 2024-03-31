import { createContext } from "react";

import type { User } from "./models";

export const CurrentUser = createContext<User | null>(null);
