function Loading() {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <span className="relative flex h-10 w-10 mr-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-10 w-10 bg-pink-500"></span>
            </span>
            <span className='text-2xl font-bold text-pink-500'>Loading...</span>
        </div>
    )
}

export default Loading