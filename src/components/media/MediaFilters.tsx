'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export function MediaFilters({ currentFolder }: { currentFolder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleFolderChange = (folder: string) => {
    const params = new URLSearchParams(searchParams);
    if (folder === 'all') {
      params.delete('folder');
    } else {
      params.set('folder', folder);
    }

    startTransition(() => {
      router.push(`/admin/media?${params.toString()}`);
    });
  };

  const handleSearch = (value: string) => {
    setSearch(value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }

    startTransition(() => {
      router.push(`/admin/media?${params.toString()}`);
    });
  };

  return (
    <div className="flex gap-4 mb-6">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Folder Filter */}
      <select
        value={currentFolder}
        onChange={(e) => handleFolderChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        disabled={isPending}
      >
        <option value="all">All Folders</option>
        <option value="blog">Blog</option>
        <option value="projects">Projects</option>
        <option value="general">General</option>
      </select>
    </div>
  );
}
