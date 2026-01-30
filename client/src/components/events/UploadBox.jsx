import { ImageIcon } from "../Icon";

const UploadBox = ({ hasError, label, onClick }) => (
    <div className={`border-2 border-dashed ${ hasError ? "border-red-500" : "border-gray-300"} rounded-lg p-6 text-center`}>
        <ImageIcon className="mx-auto text-gray-400 mb-2" />
        <p className="text-gray-600 mb-2">{label}</p>

        <button
            type="button"
            onClick={onClick}
            className="rounded-lg border-2 border-purple-600 text-purple-600 px-4 py-2 text-sm hover:bg-purple-600 hover:text-white"
        >
            Choose Image
        </button>
    </div>
);

export default UploadBox;