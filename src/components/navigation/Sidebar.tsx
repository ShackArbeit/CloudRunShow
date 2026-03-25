import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../mock/navigation'
import { cn } from '../../utils/cn'

export function Sidebar() {
  return (
    <aside className="relative overflow-hidden border-b border-white/60 bg-ink-950 px-4 py-5 text-white shadow-[0_22px_60px_rgba(16,32,51,0.18)] lg:min-h-screen lg:border-b-0 lg:border-r lg:border-white/10 lg:px-5 lg:py-6">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,_rgba(246,178,74,0.22),_transparent_72%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-px bg-white/10 lg:block" />

      <div className="relative flex h-full flex-col gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-3 py-2 text-sm text-white/80 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_0_6px_rgba(246,178,74,0.12)]" />
            Frontend Assessment
          </div>

          <div className="space-y-3">
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              ShowExam Dashboard
            </h1>
          </div>
        </div>

        <nav className="space-y-3">
          {navigationItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'group flex rounded-[24px] border px-4 py-4 transition duration-200',
                  isActive
                    ? 'border-white/20 bg-white text-ink-950 shadow-[0_16px_40px_rgba(6,16,28,0.24)]'
                    : 'border-white/8 bg-white/6 text-white/82 hover:-translate-y-0.5 hover:border-white/16 hover:bg-white/10'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold transition',
                      isActive
                        ? 'bg-sand-100 text-ink-950'
                        : 'bg-white/10 text-white/80 group-hover:bg-white/14'
                    )}
                  >
                    0{index + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p
                      className={cn(
                        'text-xs leading-5',
                        isActive ? 'text-ink-700' : 'text-white/58'
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* <div className="panel-surface mt-auto hidden bg-white/10 p-4 text-sm text-white/76 lg:block">
          <p className="font-medium text-white">Current Scope</p>
          <p className="mt-2 leading-6 text-white/64">
            已完成 Router、登入流程、報表頁、狀態回饋與資料拆層，這一輪主要整理質感與一致性。
          </p>
        </div> */}
      </div>
    </aside>
  )
}
