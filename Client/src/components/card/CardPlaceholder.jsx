import React from "react";

function CardPlaceholder({ count = 1 }) {
  const counts = Array.from({ length: count }, (_, index) => index + 1);
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-6 xl:justify-start">
      {counts.map((item) => (
        <div className="flex flex-col shadow-lg rounded-lg overflow-hidden max-w-xs m-2">
          <div className="flex-shrink-0">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="ml-4">
                  <div className="text-gray-900 leading-tight">
                    Loading product...
                  </div>
                  <div className="text-sm text-gray-600">
                    Loading product details...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardPlaceholder;
