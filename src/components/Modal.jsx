function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) {
        return null
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Outer layer: Mask, filling the entire screen + centered inner card */}
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                {/* Inner layer: white card */}
                {/* Title line: title is in the left x is in the right */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal