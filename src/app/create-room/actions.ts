'use server';

import { db } from "@/db";
import { Session, session } from "@/db/schema";
import { getSession } from "@/lib/auth";

// we omit userId cuz when user sends data to create room, we don't know their userId or wanna trust it
export async function SessionCreationAction(sessionData: Omit<Session, "id" | "userId">) {
    const sessionStatus = await getSession(); // Await the promise here
    console.log(sessionStatus);
    if (!sessionStatus) {
        throw new Error("Please log in to create a session");
    }
    await db.insert(session).values({ ...sessionData, userId: sessionStatus.user.id });
}
