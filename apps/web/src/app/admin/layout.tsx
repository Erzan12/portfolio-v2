import { getServerSession } from "next-auth"
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation"

const ADMIN_EMAIL = "do.earljan@gmail.com"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // if (session?.user?.email !== process.env.ADMIN_EMAIL) {
  //   redirect("/"); 
  // }

  // Strict check: must be logged in and must be admin/me
  if (!user || user.email !== ADMIN_EMAIL) {
    redirect('/login')
  }

  return (
    <div>
      <aside className="w-64 border-r border-border p-6 hidden md:block">
        <h2 className="font-bold text-primary mb-8 tracking-tighter">CMS V1.5</h2>
        <nav className="space-y-2">
          <a href="/admin" className="block text-sm font-medium hover:text-primary">Dashboard</a>
          <a href="/admin/new" className="block text-sm font-medium hover:text-primary">New Post</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )

  // return <section>{children}</section>;
}