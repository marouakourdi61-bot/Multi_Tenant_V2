import Sidebar from "@/Components/Sidebar";
import Navbar from "@/Components/Navbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen bg-background text-on-surface overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Main area - offset the fixed sidebar */}
            <div className="flex flex-col flex-1 h-screen overflow-hidden" style={{ marginLeft: '260px' }}>

                {/* Navbar */}
                <Navbar />

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-6 bg-surface">
                    {children}
                </main>

            </div>
        </div>
    );
}