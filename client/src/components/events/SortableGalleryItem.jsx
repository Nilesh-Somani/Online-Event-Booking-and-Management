import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableGalleryItem = ({ item, onRemove }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="relative h-32 rounded-lg border overflow-hidden bg-gray-50 flex items-center justify-center"
        >
            {item.uploading ? (
                <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-500 mt-1">Uploading</span>
                </div>
            ) : (
                <>
                    <img
                        src={item.url}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="absolute top-1 right-1 bg-white/90 text-red-600 text-xs px-2 py-0.5 rounded z-10"
                    >
                        ✕
                    </button>

                    <div
                        {...attributes}
                        {...listeners}
                        className="absolute bottom-1 left-1 bg-white/90 text-gray-600 text-xs px-2 py-1 rounded cursor-grab z-10"
                    >
                        ⠿
                    </div>
                </>
            )}
        </div>
    );
};

export default SortableGalleryItem;