'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Trash2, Edit, Check } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { deleteMedia } from '@/actions/upload-actions';

interface Media {
  id: string;
  url: string;
  filename: string;
  alt?: string | null;
  folder?: string | null;
  size: number;
  createdAt: Date;
}

interface MediaGridProps {
  media: Media[];
  selectable?: boolean;
  onSelect?: (media: Media) => void;
}

export function MediaGrid({ media, selectable, onSelect }: MediaGridProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm(`Delete "${filename}"? This cannot be undone.`)) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteMedia(id);
      router.refresh(); // Refresh server component
    } catch (error: any) {
      alert(error.message || 'Failed to delete media');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSelect = (item: Media) => {
    if (selectable && onSelect) {
      onSelect(item);
    } else {
      setSelectedId(item.id === selectedId ? null : item.id);
    }
  };

  if (media.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No media files yet</p>
        <p className="text-sm mt-2">Upload your first image to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {media.map((item) => (
        <div
          key={item.id}
          className={`
            relative aspect-square rounded-lg overflow-hidden 
            cursor-pointer border-2 transition-all group
            ${selectedId === item.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
            ${deletingId === item.id ? 'opacity-50 pointer-events-none' : ''}
          `}
          onClick={() => handleSelect(item)}
        >
          {/* Image */}
          <Image
            src={item.url}
            alt={item.alt || item.filename}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item.id, item.filename);
                }}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                disabled={deletingId === item.id}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Selection Indicator */}
          {selectable && selectedId === item.id && (
            <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
              <div className="bg-blue-500 text-white rounded-full p-2">
                <Check className="w-5 h-5" />
              </div>
            </div>
          )}

          {/* Filename */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2 truncate">
            {item.filename}
          </div>
        </div>
      ))}
    </div>
  );
}
