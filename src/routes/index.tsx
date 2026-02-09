import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: SplashPage })

function SplashPage() {
  return (
    <div className="bg-db-dark text-slate-200 font-display min-h-screen flex items-center justify-center overflow-hidden relative selection:bg-primary/30 selection:text-white">
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] grid-bg"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-md p-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-code-purple to-code-blue rounded-xl opacity-50 blur-sm"></div>
        <div className="relative bg-db-panel border border-db-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-db-dark/50 p-3 border-b border-db-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <span className="text-xs text-gray-500 font-mono ml-2">db_connection_wizard.exe</span>
            </div>
            <div className="text-xs text-gray-600 font-mono">v2.4.0</div>
          </div>

          <div className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-db-dark border border-db-border mb-2 shadow-inner group cursor-default">
                <span className="material-icons text-4xl text-primary group-hover:text-code-blue transition-colors duration-500">storage</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                <span className="text-primary">Mohamed DB</span> CONNECTION
              </h1>
              <p className="text-sm text-gray-400">Establish secure link to portfolio database</p>
            </div>

            <div className="bg-db-dark rounded-lg p-4 border border-db-border space-y-3 font-mono text-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-full w-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity animate-scan"></div>
              <div className="flex justify-between items-center border-b border-db-border/50 pb-2">
                <span className="text-gray-500">Host:</span>
                <span className="text-code-blue">developer.portfolio</span>
              </div>
              <div className="flex justify-between items-center border-b border-db-border/50 pb-2">
                <span className="text-gray-500">Database:</span>
                <span className="text-code-green">projects_db</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-db-border/50">
                <span className="text-gray-500">User:</span>
                <span className="text-code-purple">visitor_001</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Port:</span>
                <span className="text-code-orange">5432</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-gray-500">
                  <span>Initializing Schema...</span>
                  <span className="text-primary">Ready</span>
                </div>
                <div className="h-1.5 w-full bg-db-dark rounded-full overflow-hidden border border-db-border">
                  <div className="h-full bg-gradient-to-r from-primary to-code-blue w-full animate-progress origin-left"></div>
                </div>
              </div>

              <Link
                to="/dashboard"
                className="group relative w-full flex items-center justify-center gap-3 bg-white text-db-dark font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-all active:scale-[0.98] shadow-lg hover:shadow-primary/20"
              >
                <span className="material-icons text-xl group-hover:animate-pulse">power_settings_new</span>
                <span>CONNECT TO DATABASE</span>
                <span className="absolute right-4 text-xs font-normal opacity-0 group-hover:opacity-100 transition-opacity text-db-dark/50">ENTER ↵</span>
              </Link>

              <div className="text-[10px] text-gray-500 font-mono text-center pt-2 h-4">
                <span className="text-primary">&gt;</span> Waiting for user input<span className="animate-blink block inline-block w-1.5 h-3 bg-primary align-middle ml-1"></span>
              </div>
            </div>
          </div>

          <div className="bg-db-dark/30 p-2 border-t border-db-border flex justify-between items-center text-[10px] text-gray-500 font-mono uppercase tracking-wider">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              System Online
            </div>
            <div>
              Latency: 24ms
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 text-db-border/40 font-mono text-xs hidden lg:block select-none pointer-events-none">
        <div>SELECT * FROM experience</div>
        <div className="pl-4">WHERE role = 'Senior Dev';</div>
      </div>
      <div className="absolute bottom-20 right-10 text-db-border/40 font-mono text-xs hidden lg:block select-none pointer-events-none text-right">
        <div>UPDATE visitors</div>
        <div className="pl-4">SET status = 'connected';</div>
      </div>
    </div>
  )
}
