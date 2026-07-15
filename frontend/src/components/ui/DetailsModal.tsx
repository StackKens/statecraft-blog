import { X } from "lucide-react";
import type { Post } from "../../types/post";
import CommentSection from "./CommentSection";

interface DetailsModalProps {
  selectedPost: Post | null;
  setSelectedPost: (post: Post | null) => void;
}
export default function DetailsModal({
  selectedPost,
  setSelectedPost,
}: DetailsModalProps) {
  return (
    <div>
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            {/* Modal header with close button */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 pr-8">
                {selectedPost.title}
              </h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1 rounded-full hover:bg-gray-100  transition-colors"
                aria-label="Close"
              >
                <X size={24} className="text-gray-500  cursor-pointer" />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <p className="text-gray-700 text-base mb-4">
                {selectedPost.description}
              </p>
              <div className="prose prose-sm max-w-none text-gray-600">
                <p className="whitespace-pre-line">{selectedPost.details}</p>
              </div>

              <CommentSection postId={selectedPost.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
