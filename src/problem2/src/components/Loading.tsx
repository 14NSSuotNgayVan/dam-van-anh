const Loading = () => {
    return (
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-20 z-50 flex items-center justify-center">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-gray-400-400 rounded-full"
                >
                    <div
                        className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"
                    ></div>
                </div>
            </div>
        </div >
    );
}

export default Loading;