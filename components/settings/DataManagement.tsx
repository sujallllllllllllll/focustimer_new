'use client';

import { useState } from 'react';
import { Download, Upload, Trash2 } from 'lucide-react';
import { timerHistory } from '@/lib/storage/timerHistory';
import { Button } from '@/components/ui/Button';

export function DataManagement() {
  const [importError, setImportError] = useState<string | null>(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleExport = () => {
    const data = timerHistory.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `timemaster-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = timerHistory.importData(content);
      
      if (success) {
        setImportError(null);
        alert('Data imported successfully!');
        window.location.reload();
      } else {
        setImportError('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleDelete = () => {
    timerHistory.clearHistory();
    setShowConfirmDelete(false);
    alert('All history deleted.');
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Data Management
      </h3>

      <div className="space-y-3">
        {/* Export */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Export Data
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Download your timer history as JSON
            </div>
          </div>
          <Button onClick={handleExport} variant="secondary" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Import */}
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-gray-100">
              Import Data
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Restore from a previous backup
            </div>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button as="span" variant="secondary" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </label>
        </div>

        {importError && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-sm">
            {importError}
          </div>
        )}

        {/* Delete All */}
        <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div>
            <div className="font-medium text-red-900 dark:text-red-100">
              Delete All Data
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">
              Permanently delete all timer history
            </div>
          </div>
          <Button 
            onClick={() => setShowConfirmDelete(true)} 
            variant="danger" 
            size="sm"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full m-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete all your timer history? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowConfirmDelete(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                variant="danger"
                className="flex-1"
              >
                Delete All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
