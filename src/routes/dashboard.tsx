import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { projects, experience, skills } from '../data/portfolio-data'

export const Route = createFileRoute('/dashboard')({
    component: DashboardPage,
})

type TableView = 'projects' | 'experience' | 'skills';

function DashboardPage() {
    const [activeTable, setActiveTable] = useState<TableView>('projects')
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [selectedId, setSelectedId] = useState('1001')
    const [searchTerm, setSearchTerm] = useState('')
    const [showFilterBar, setShowFilterBar] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const filteredProjects = useMemo(() => {
        return projects.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
            p.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    const filteredExperience = useMemo(() => {
        return experience.filter(e =>
            e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm])

    const filteredSkills = useMemo(() => {
        return skills.filter(s =>
            s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.items.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    }, [searchTerm])

    const activeProject = useMemo(() =>
        projects.find(p => p.id === selectedId) || projects[0],
        [selectedId])

    const openDetail = (id: string) => {
        setSelectedId(id)
        setIsDetailOpen(true)
    }

    const queryText = useMemo(() => {
        switch (activeTable) {
            case 'projects':
                return (
                    <>
                        <span className="text-primary dark:text-code-purple font-bold">SELECT</span> *
                        <span className="text-primary dark:text-code-purple font-bold"> FROM </span>
                        <span className="text-yellow-600 dark:text-code-orange">public.projects_tbl</span>
                        {searchTerm && (
                            <>
                                <span className="text-primary dark:text-code-purple font-bold"> WHERE </span>
                                <span className="text-green-600 dark:text-code-green">search_query</span> LIKE <span className="text-green-600 dark:text-code-green">'%{searchTerm}%'</span>
                            </>
                        )}
                        <span className="text-primary dark:text-code-purple font-bold"> ORDER BY </span>
                        date <span className="text-primary dark:text-code-purple font-bold">DESC</span>;
                    </>
                )
            case 'experience':
                return (
                    <>
                        <span className="text-primary dark:text-code-purple font-bold">SELECT</span> *
                        <span className="text-primary dark:text-code-purple font-bold"> FROM </span>
                        <span className="text-yellow-600 dark:text-code-orange">public.experience_tbl</span>
                        {searchTerm && (
                            <>
                                <span className="text-primary dark:text-code-purple font-bold"> WHERE </span>
                                <span className="text-green-600 dark:text-code-green">role</span> ILIKE <span className="text-green-600 dark:text-code-green">'%{searchTerm}%'</span>
                            </>
                        )}
                        ;
                    </>
                )
            case 'skills':
                return (
                    <>
                        <span className="text-primary dark:text-code-purple font-bold">SELECT</span> *
                        <span className="text-primary dark:text-code-purple font-bold"> FROM </span>
                        <span className="text-yellow-600 dark:text-code-orange">public.skills_matrix</span>
                        {searchTerm && (
                            <>
                                <span className="text-primary dark:text-code-purple font-bold"> WHERE </span>
                                <span className="text-green-600 dark:text-code-green">category</span> = <span className="text-green-600 dark:text-code-green">'%{searchTerm}%'</span>
                            </>
                        )}
                        ;
                    </>
                )
        }
    }, [activeTable, searchTerm])

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-200 font-display min-h-screen flex flex-col overflow-hidden selection:bg-primary/30 selection:text-white relative">
            {/* Header */}
            <header className="h-16 bg-white dark:bg-db-panel border-b border-gray-200 dark:border-db-border flex items-center px-4 shrink-0 shadow-sm z-30">
                <div className="flex items-center gap-2 md:gap-4 w-full">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-db-dark rounded-lg transition-colors"
                    >
                        <span className="material-icons">{isSidebarOpen ? 'close' : 'menu'}</span>
                    </button>
                    <Link to="/" className="flex items-center gap-2 mr-2 md:mr-6 text-primary hover:opacity-80 transition-opacity">
                        <span className="material-icons">storage</span>
                        <span className="font-bold text-base md:text-lg tracking-tight text-gray-900 dark:text-white truncate">Mohamed DB</span>
                    </Link>
                    <div className="hidden lg:flex flex-1 max-w-4xl bg-gray-100 dark:bg-db-dark border border-gray-200 dark:border-db-border rounded px-4 py-2 items-center gap-3 font-mono text-sm relative group transition-colors focus-within:border-primary/50">
                        <span className="material-icons text-gray-400 text-lg">terminal</span>
                        <div className="flex-1 truncate outline-none bg-transparent text-gray-800 dark:text-gray-300">
                            {queryText}
                        </div>
                        <button className="bg-primary/20 hover:bg-primary/30 text-primary p-1 rounded transition-colors" title="Execute Query">
                            <span className="material-icons text-sm">play_arrow</span>
                        </button>
                    </div>
                    <div className="ml-auto flex items-center gap-2 md:gap-4 shrink-0">
                        <div className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs text-gray-500 dark:text-code-gray font-mono bg-gray-100 dark:bg-db-dark px-1.5 md:px-2 py-1 rounded border border-gray-200 dark:border-db-border">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="hidden lg:inline">Connected:</span> 127.0.0.1
                        </div>
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-db-border overflow-hidden shrink-0">
                            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGgvJ3kZWdJz_TrxUidhlw96b-GcOXXDfGwWl4qM7Hxkxk7WiRFSxvuPbY2dBT9zInNelVcBpQErPtRC6m-2LcmKzXRnq24YGGUb52KoChvbKcB5BN-9LwIJ2Ybs8YHu4Lqwq2ZdurlWCx3DNaT_n63XkSKbI-vMkAVon6t0aifS5VQx4WxQqZ2G3ff2dPAaqcFW06W78LAp0HZ0CPpOruHKDH8Gk4hC7JuUcNL7Wq6-97bW4GdbvFQwbtOWbgz8z31wQaMVWZ_Far" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* Sidebar */}
                <aside className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-db-panel border-r border-gray-200 dark:border-db-border flex flex-col shrink-0 overflow-y-auto z-50 transition-transform duration-300 md:relative md:translate-x-0 md:z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} font-mono`}>
                    <div className="p-4 border-b border-gray-200 dark:border-db-border">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Explorer</h3>
                        <div className="text-sm font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                            <span className="material-icons text-sm">dns</span>
                            LOCALHOST_PROD
                        </div>
                    </div>
                    <nav className="flex-1 p-2 space-y-1 text-sm">
                        <div className="space-y-0.5 mt-1 pl-1">
                            <button
                                onClick={() => { setActiveTable('projects'); setSearchTerm(''); setIsSidebarOpen(false); }}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 text-left rounded cursor-pointer border-l-2 transition-all ${activeTable === 'projects'
                                    ? 'bg-primary/10 text-primary dark:text-code-blue border-primary'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-db-dark/50 hover:text-primary'
                                    }`}
                            >
                                <span className="material-icons text-sm">table_chart</span>
                                <span>projects_tbl</span>
                            </button>
                            <button
                                onClick={() => { setActiveTable('experience'); setSearchTerm(''); setIsSidebarOpen(false); }}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 text-left rounded cursor-pointer border-l-2 transition-all ${activeTable === 'experience'
                                    ? 'bg-primary/10 text-primary dark:text-code-blue border-primary'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-db-dark/50 hover:text-primary'
                                    }`}
                            >
                                <span className="material-icons text-sm">table_chart</span>
                                <span>experience_tbl</span>
                            </button>
                            <button
                                onClick={() => { setActiveTable('skills'); setSearchTerm(''); setIsSidebarOpen(false); }}
                                className={`w-full flex items-center gap-2 px-2 py-1.5 text-left rounded cursor-pointer border-l-2 transition-all ${activeTable === 'skills'
                                    ? 'bg-primary/10 text-primary dark:text-code-blue border-primary'
                                    : 'text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-100 dark:hover:bg-db-dark/50 hover:text-primary'
                                    }`}
                            >
                                <span className="material-icons text-sm">insights</span>
                                <span>skills_matrix</span>
                            </button>
                        </div>
                    </nav>
                    <div className="p-4 border-t border-gray-200 dark:border-db-border">
                        <a
                            href="/Mohammad-Hossam-FlowCV-Resume-20260204.pdf"
                            download
                            className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-icons text-sm">download</span>
                            EXPORT CV
                        </a>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col bg-white dark:bg-db-dark overflow-hidden relative">
                    {/* Tabs */}
                    <div className="flex items-center bg-gray-50 dark:bg-db-panel border-b border-gray-200 dark:border-db-border overflow-x-auto no-scrollbar">
                        <div className="px-4 py-2 bg-white dark:bg-db-dark border-r border-t-2 border-t-primary border-r-gray-200 dark:border-r-db-border text-sm font-medium flex items-center gap-2 min-w-fit text-gray-900 dark:text-white">
                            <span className="material-icons text-sm text-blue-400">table_chart</span>
                            {activeTable}_tbl
                            <span className="material-icons text-xs text-gray-400 hover:text-red-400 cursor-pointer ml-2">close</span>
                        </div>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-db-border bg-white dark:bg-db-dark">
                        <div className="flex items-center gap-2 flex-1">
                            <button className="p-1.5 text-gray-500 hover:text-primary hover:bg-primary/10 rounded transition-colors" title="Refresh" onClick={() => setSearchTerm('')}>
                                <span className="material-icons text-lg">refresh</span>
                            </button>
                            <button
                                className={`p-1.5 rounded transition-colors ${showFilterBar || searchTerm ? 'text-primary bg-primary/10' : 'text-gray-500 hover:text-primary hover:bg-primary/10'}`}
                                title="Filter"
                                onClick={() => setShowFilterBar(!showFilterBar)}
                            >
                                <span className="material-icons text-lg">filter_list</span>
                            </button>

                            {showFilterBar && (
                                <div className="flex items-center gap-2 ml-1 md:ml-2 animate-in slide-in-from-left-2 duration-200 flex-1 max-w-[150px] sm:max-w-xs">
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            placeholder={`Search...`}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-db-panel border border-gray-200 dark:border-db-border rounded px-2 md:px-3 py-1 text-[10px] md:text-xs font-mono focus:outline-none focus:border-primary/50 text-gray-700 dark:text-gray-300 transition-colors"
                                            autoFocus
                                        />
                                        {searchTerm && (
                                            <button
                                                onClick={() => setSearchTerm('')}
                                                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                            >
                                                <span className="material-icons text-xs">close</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="h-4 w-px bg-gray-300 dark:bg-db-border mx-0.5 md:mx-1"></div>
                            <span className="text-[10px] md:text-xs text-gray-500 font-mono truncate max-w-[100px] sm:max-w-none">
                                {searchTerm ? `Matches: ${activeTable === 'projects' ? filteredProjects.length :
                                    activeTable === 'experience' ? filteredExperience.length :
                                        filteredSkills.length
                                    }` : `${activeTable}_tbl`}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="hidden sm:inline text-[10px] text-gray-400 font-mono mr-2">0.024s query time</span>
                        </div>
                    </div>

                    {/* Data Grid / Cards View */}
                    <div className="flex-1 overflow-auto relative bg-white dark:bg-db-dark">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#7a7dff 1px, transparent 1px), linear-gradient(90deg, #7a7dff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                        {/* Mobile Cards View */}
                        <div className="md:hidden p-4 space-y-4">
                            {activeTable === 'projects' && filteredProjects.map((project) => (
                                <div key={project.id} onClick={() => openDetail(project.id)} className="bg-gray-50 dark:bg-db-panel border border-gray-200 dark:border-db-border rounded-lg p-4 space-y-3 active:scale-[0.98] transition-transform shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${project.gradient} flex items-center justify-center text-white text-xs font-bold shadow-sm`}>
                                                {project.short}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{project.name}</h4>
                                                <p className="text-[10px] text-gray-500 font-mono">ID: {project.id}</p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-${project.statusColor}-100 text-${project.statusColor}-700 dark:bg-${project.statusColor}-900/20 dark:text-${project.statusColor === 'green' ? 'code-green' : project.statusColor + '-500'} border border-${project.statusColor}-200 dark:border-${project.statusColor}-900/50`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {project.tech.map((t) => (
                                            <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary dark:bg-primary/20 dark:text-code-blue border border-primary/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-db-border text-[10px] text-gray-500 font-mono">
                                        <span>Last Commit:</span>
                                        <span>{project.lastCommit}</span>
                                    </div>
                                </div>
                            ))}

                            {activeTable === 'experience' && filteredExperience.map((exp) => (
                                <div key={exp.id} className="bg-gray-50 dark:bg-db-panel border border-gray-200 dark:border-db-border rounded-lg p-4 space-y-3 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">{exp.role}</h4>
                                            <p className="text-[11px] text-primary font-mono">{exp.company}</p>
                                        </div>
                                        <span className="text-[10px] font-mono text-code-orange font-bold uppercase">{exp.duration}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">{exp.description}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {exp.techStack.map((t) => (
                                            <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100/50 text-purple-700 dark:bg-code-purple/20 dark:text-code-purple border border-code-purple/20">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {activeTable === 'skills' && filteredSkills.map((skill) => (
                                <div key={skill.id} className="bg-gray-50 dark:bg-db-panel border border-gray-200 dark:border-db-border rounded-lg p-4 space-y-4 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider">{skill.category}</h4>
                                        <span className="text-xs font-mono text-primary font-bold">{skill.proficiency}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 dark:bg-db-dark rounded-full h-2 overflow-hidden">
                                        <div className="bg-gradient-to-r from-primary to-code-blue h-full rounded-full transition-all duration-1000" style={{ width: `${skill.proficiency}%` }}></div>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skill.items.map((it) => (
                                            <span key={it} className="px-2 py-1 rounded text-[10px] bg-green-100/30 text-green-700 dark:bg-code-green/20 dark:text-code-green border border-code-green/20">
                                                {it}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table View */}
                        <table className="w-full text-left border-collapse hidden md:table">
                            <thead className="bg-gray-50 dark:bg-db-panel sticky top-0 z-10 shadow-sm">
                                {activeTable === 'projects' && (
                                    <tr>
                                        <th className="p-0 border-b border-r border-gray-200 dark:border-db-border w-10 text-center bg-gray-50 dark:bg-db-panel"></th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase w-16">ID <span className="material-icons text-[10px] align-middle ml-1 opacity-50">vpn_key</span></th>
                                        <th className="py-2 px-4 text-xs font-bold text-primary dark:text-code-blue border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">PROJECT_NAME</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">TECH_STACK []</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase w-32">STATUS</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">LAST_COMMIT</th>
                                    </tr>
                                )}
                                {activeTable === 'experience' && (
                                    <tr>
                                        <th className="p-0 border-b border-r border-gray-200 dark:border-db-border w-10 text-center bg-gray-50 dark:bg-db-panel"></th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase w-64">ROLE / COMPANY</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">TECH_STACK []</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">DURATION</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">DESCRIPTION</th>
                                    </tr>
                                )}
                                {activeTable === 'skills' && (
                                    <tr>
                                        <th className="p-0 border-b border-r border-gray-200 dark:border-db-border w-10 text-center bg-gray-50 dark:bg-db-panel"></th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase w-48">CATEGORY</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">PROFICIENCY</th>
                                        <th className="py-2 px-4 text-xs font-bold text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-db-border tracking-wider font-mono uppercase">SKILLS []</th>
                                    </tr>
                                )}
                            </thead>
                            <tbody className="text-sm font-mono text-gray-700 dark:text-gray-300 divide-y divide-gray-200 dark:divide-db-border">
                                {activeTable === 'projects' && filteredProjects.map((project, index) => (
                                    <tr
                                        key={project.id}
                                        onClick={() => openDetail(project.id)}
                                        className="group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-default"
                                    >
                                        <td className="border-r border-gray-200 dark:border-db-border text-center text-gray-400 text-xs bg-gray-50 dark:bg-db-panel/50">{index + 1}</td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border text-gray-500 dark:text-gray-500">{project.id}</td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded bg-gradient-to-tr ${project.gradient} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
                                                {project.short}
                                            </div>
                                            <span>{project.name}</span>
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border">
                                            <div className="flex flex-wrap gap-1">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary dark:bg-primary/20 dark:text-code-blue border border-primary/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-3 border-r border-gray-200 dark:border-db-border">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-${project.statusColor}-100 text-${project.statusColor}-700 dark:bg-${project.statusColor}-900/20 dark:text-${project.statusColor === 'green' ? 'code-green' : project.statusColor + '-500'} border border-${project.statusColor}-200 dark:border-${project.statusColor}-900/50`}>
                                                <span className={`w-1.5 h-1.5 rounded-full bg-${project.statusColor}-500 ${project.status === 'Beta' || project.status === 'In Dev' ? 'animate-pulse' : ''}`}></span> {project.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 dark:text-gray-500 text-xs">{project.lastCommit}</td>
                                    </tr>
                                ))}

                                {activeTable === 'experience' && filteredExperience.map((exp, index) => (
                                    <tr key={exp.id} className="group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-default">
                                        <td className="border-r border-gray-200 dark:border-db-border text-center text-gray-400 text-xs bg-gray-50 dark:bg-db-panel/50">{index + 1}</td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border">
                                            <div className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors">{exp.role}</div>
                                            <div className="text-xs text-gray-500 tracking-tight">{exp.company}</div>
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border">
                                            <div className="flex flex-wrap gap-1">
                                                {exp.techStack.map((t) => (
                                                    <span key={t} className="px-1.5 py-0.5 rounded text-[10px] bg-purple-100/50 text-purple-700 dark:bg-code-purple/20 dark:text-code-purple border border-code-purple/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border text-xs text-code-orange">{exp.duration}</td>
                                        <td className="py-3 px-4 text-xs text-gray-500 max-w-md truncate">{exp.description}</td>
                                    </tr>
                                ))}

                                {activeTable === 'skills' && filteredSkills.map((skill, index) => (
                                    <tr key={skill.id} className="group hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors cursor-default">
                                        <td className="border-r border-gray-200 dark:border-db-border text-center text-gray-400 text-xs bg-gray-50 dark:bg-db-panel/50">{index + 1}</td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border font-medium text-gray-900 dark:text-white">{skill.category}</td>
                                        <td className="py-3 px-4 border-r border-gray-200 dark:border-db-border">
                                            <div className="w-full bg-gray-100 dark:bg-db-dark rounded-full h-1.5 border border-db-border overflow-hidden p-[1px]">
                                                <div className="bg-gradient-to-r from-primary to-code-blue h-full rounded-full transition-all duration-1000" style={{ width: `${skill.proficiency}%` }}></div>
                                            </div>
                                            <div className="text-[10px] text-right mt-1 text-primary">{skill.proficiency}%</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-wrap gap-1">
                                                {skill.items.map((it) => (
                                                    <span key={it} className="px-1.5 py-0.5 rounded text-[10px] bg-green-100/30 text-green-700 dark:bg-code-green/20 dark:text-code-green border border-code-green/20">
                                                        {it}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {((activeTable === 'projects' && filteredProjects.length === 0) ||
                                    (activeTable === 'experience' && filteredExperience.length === 0) ||
                                    (activeTable === 'skills' && filteredSkills.length === 0)) && (
                                        <tr>
                                            <td colSpan={6} className="py-20 text-center text-gray-500 dark:text-gray-400 font-mono italic">
                                                0 rows returned. query executed in 0.001s
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        <div className="p-8 text-center text-gray-400 dark:text-gray-600 font-mono text-sm opacity-50">
                            -- {activeTable.toUpperCase()}_SET LIMIT NULL --
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="bg-gray-100 dark:bg-db-panel border-t border-gray-200 dark:border-db-border p-1 text-xs font-mono text-gray-500 dark:text-gray-400 flex items-center justify-between shrink-0 z-20">
                        <div className="flex items-center gap-4 px-2">
                            <div className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-db-border px-2 py-0.5 rounded cursor-pointer transition-colors">
                                <span className="material-icons text-[14px]">call_split</span>
                                <span>main*</span>
                            </div>
                            <div className="flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-db-border px-2 py-0.5 rounded cursor-pointer transition-colors text-code-green">
                                <span className="material-icons text-[14px]">check_circle</span>
                                <span>DB Online</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-2">
                            <div className="flex items-center gap-2">
                                <span>CPU:</span>
                                <div className="w-16 h-4 bg-gray-200 dark:bg-db-dark rounded overflow-hidden relative border border-gray-300 dark:border-db-border">
                                    <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(90deg, #7a7dff, #7a7dff 2px, transparent 2px, transparent 4px)' }}></div>
                                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 64 16">
                                        <path d="M0 10 L8 8 L16 12 L24 6 L32 10 L40 4 L48 8 L56 2 L64 6" fill="none" stroke="#7a7dff" strokeWidth="1.5"></path>
                                    </svg>
                                </div>
                            </div>
                            <div className="hover:bg-gray-200 dark:hover:bg-db-border px-2 py-0.5 rounded cursor-pointer transition-colors">UTF-8</div>
                            <div className="text-primary hover:bg-gray-200 dark:hover:bg-db-border px-2 py-0.5 rounded cursor-pointer transition-colors">
                                <span className="material-icons text-[14px]">notifications</span>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>

            {/* Row Detail View Panel */}
            <div className={`fixed md:absolute right-0 top-0 md:top-16 bottom-0 md:bottom-8 w-full md:w-96 bg-white dark:bg-db-panel border-l border-gray-200 dark:border-db-border transform ${isDetailOpen && activeTable === 'projects' ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 shadow-2xl z-50 md:z-30 flex flex-col`}>
                <div className="p-4 border-b border-gray-200 dark:border-db-border flex items-center justify-between bg-white dark:bg-db-panel sticky top-0 z-10">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Row Detail: ID {selectedId}</h2>
                    <button onClick={() => setIsDetailOpen(false)} className="p-2 text-gray-500 hover:text-primary transition-colors">
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 font-mono">
                    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-db-border mb-6 group relative">
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                        <img alt="Project Screenshot" className="w-full h-40 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9udGtzFYcGsYr4sJbjKyEmeuMjfkYpGSdQOCjbk9SaxhiLgVUeXOiYTGUW60g95zaQeB-uvgrx_wk7Nsyf9ZsXxt90JUu4Xwvcy85aRG40y3ckLTivIUZPHAVont0Lzx-bHDGjmDyXwySG-Q48WJTH-KJmzoiTFJfL7x8UmP4qIT1WA5LS3B5eJRmgTe_EjF2TTAWsfSe3bsfs0DdcqzlmMTwMtVQxpdQw1e9bPxJFUrakLaf7xC0Ol1xRPLeJJI5cMUz4pC4Zn2-" />
                    </div>
                    <div className="space-y-4 text-sm">
                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 font-bold">project_name</label>
                            <div className="text-gray-900 dark:text-white font-medium bg-gray-50 dark:bg-db-dark p-2 rounded border border-gray-200 dark:border-db-border">
                                {activeProject.name}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 font-bold">description</label>
                            <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs bg-gray-50 dark:bg-db-dark p-3 rounded border border-gray-200 dark:border-db-border">
                                {activeProject.description}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 font-bold">deploy_status</label>
                                <div className="text-green-500 flex items-center gap-1 bg-gray-50 dark:bg-db-dark p-2 rounded border border-gray-200 dark:border-db-border">
                                    <span className="material-icons text-sm">check_circle</span> Success
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1 font-bold">latency</label>
                                <div className="text-gray-900 dark:text-white bg-gray-50 dark:bg-db-dark p-2 rounded border border-gray-200 dark:border-db-border">{activeProject.latency}</div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200 dark:border-db-border">
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2 font-bold">json_preview</label>
                            <pre className="bg-gray-900 text-gray-300 p-3 rounded text-[10px] overflow-x-auto border border-gray-700 leading-relaxed max-h-60">{`{
  "id": "${activeProject.id}",
  "version": "${activeProject.version}",
  "tech_stack": [
    ${activeProject.tech.join(',\n    ')}
  ],
  "features": [
    ${activeProject.features.map(f => `"${f}"`).join(',\n    ')}
  ]
}`}
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-db-border flex flex-col sm:flex-row justify-end gap-2 bg-white dark:bg-db-panel sticky bottom-0">
                    <button className="w-full sm:w-auto px-3 py-2 rounded border border-gray-300 dark:border-db-border text-xs font-medium hover:bg-gray-100 dark:hover:bg-db-dark text-gray-700 dark:text-white transition-colors">Edit Row</button>
                    <button className="w-full sm:w-auto px-3 py-2 rounded bg-primary text-white text-xs font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">Execute Action</button>
                </div>
            </div>
        </div>
    )
}
