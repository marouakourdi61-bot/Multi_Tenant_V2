export default function Navbar() {
    return (
        <header className="h-16 border-b border-outline-variant bg-surface/80 backdrop-blur flex items-center justify-between px-6">

            {/* Left */}
            <h1 className="text-lg font-semibold">
                Overview
            </h1>

            {/* Right */}
            <div className="flex items-center gap-3">

                {/* Language */}
                <button className="px-3 py-1.5 border rounded-lg text-sm">
                    EN
                </button>

                {/* Notifications */}
                <button className="w-9 h-9 rounded-full border flex items-center justify-center">
                    
                </button>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gray-300" />

            </div>

        </header>
    );
}