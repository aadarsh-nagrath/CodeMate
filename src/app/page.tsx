import { db } from "../db";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const items = await db.query.session.findMany();
  return (
    <main className="min-h-screen p-24">
      <div className="flex justify-between items-center ">
        <div>
        <h1>FIND LIKE MINDED DEVELOPERS</h1>
        </div>
        <Button asChild>
          <Link href="/create-room">
          Create Session
          </Link>
        </Button>
      </div>
      
      {items.map((item) =>{
        return(
          <>
          <div key={item.id}>{item.name} <br/> {item.description}</div>
          </>
        )
      })}
    </main>
  );
}
