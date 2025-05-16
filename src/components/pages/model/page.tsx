"use client";

import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import('@/components/model/model'), { ssr: false });


function Page() {
    const handleLoad = () =>{
        console.log("");
    }
    return (
        <div
            style={{ width: '100vw', height: '100vh' }}
            className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
        >
            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700 rounded-full filter blur-[90px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-900 rounded-full filter blur-[90px] opacity-20 animate-pulse"></div>

            {/* Model Viewer */}
            <ModelViewer onLoad={handleLoad}/>
        </div>
    );
}

export default Page;