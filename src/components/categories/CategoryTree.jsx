// src/components/categories/CategoryTree.jsx
import { useState } from 'react';
import {
  FolderIcon,
  FolderOpenIcon,
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { Button } from '../common/Button';

function TreeNode({ category, categories, level = 0, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(true);
  const children = categories.filter((c) => c.parentId === category.id);
  const hasChildren = children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
          level > 0 ? 'mr-6' : ''
        }`}
        style={{ marginRight: `${level * 1.5}rem` }}
      >
        {hasChildren && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <ChevronLeftIcon
              className={`h-4 w-4 transition-transform ${
                expanded ? '-rotate-90' : ''
              }`}
            />
          </button>
        )}
        {!hasChildren && <span className="w-4" />}

        {expanded && hasChildren ? (
          <FolderOpenIcon className="h-5 w-5 text-amber-500" />
        ) : (
          <FolderIcon className="h-5 w-5 text-amber-500" />
        )}

        <span className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
          {category.name}
        </span>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onEdit(category)}>
            <PencilSquareIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(category.id)}>
            <TrashIcon className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>

      {expanded && hasChildren && (
        <div>
          {children.map((child) => (
            <TreeNode
              key={child.id}
              category={child}
              categories={categories}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoryTree({ categories, onEdit, onDelete }) {
  const roots = categories.filter((c) => c.parentId === null);

  if (roots.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 py-12">
        هیچ دسته‌بندی‌ای وجود ندارد.
      </p>
    );
  }

  return (
    <div className="space-y-1">
      {roots.map((root) => (
        <TreeNode
          key={root.id}
          category={root}
          categories={categories}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}