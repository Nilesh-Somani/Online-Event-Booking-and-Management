const PageLoader = ({ label = "Loading..." }) => {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                {/* Spinner */}
                <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />

                {/* Text */}
                <p className="text-sm text-gray-600 font-medium">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default PageLoader;