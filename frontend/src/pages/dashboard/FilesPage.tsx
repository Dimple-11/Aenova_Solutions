import React, { useState } from 'react';
import {
  FileText,
  Folder,
  Search,
  Upload,
  Download,
  Trash2,
  Eye,
  FolderPlus,
  FileCode,
  FileArchive,
  Image as ImageIcon
} from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { ProjectFile } from '../../types';

export const FilesPage: React.FC = () => {
  const { files, addFile, deleteFile } = useDashboard();

  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('All Files');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);

  const [fileName, setFileName] = useState('');
  const [fileCategory, setFileCategory] = useState<'Document' | 'Design' | 'Archive' | 'Code' | 'Media'>('Document');

  const folders = ['All Files', 'Document', 'Design', 'Archive', 'Code', 'Media'];

  const filteredFiles = files.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchesFolder = selectedFolder === 'All Files' || f.category === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) return;
    addFile({
      name: fileName,
      size: '4.8 MB',
      type: fileCategory === 'Design' ? 'figma' : fileCategory === 'Archive' ? 'zip' : 'pdf',
      category: fileCategory,
      uploadedBy: 'Alex Morgan'
    });
    setFileName('');
    setIsUploadModalOpen(false);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
      case 'docx':
        return <FileText className="w-5 h-5 text-rose-500" />;
      case 'figma':
      case 'png':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'zip':
        return <FileArchive className="w-5 h-5 text-amber-500" />;
      default:
        return <FileCode className="w-5 h-5 text-sky-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">
            File Management
          </h1>
          <p className="text-xs text-[#6B4E3A] dark:text-[#D4B483]/80 mt-1">
            Centralized document repository, architectural blueprints, and deliverables.
          </p>
        </div>

        <Button variant="gold" size="md" onClick={() => setIsUploadModalOpen(true)} icon={<Upload className="w-4 h-4" />}>
          Upload File
        </Button>
      </div>

      {/* Folders Navigation Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {folders.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFolder(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-colors border ${
              selectedFolder === f
                ? 'bg-[#6B4E3A] text-white dark:bg-[#D4B483] dark:text-[#1A110B] border-[#6B4E3A]'
                : 'bg-white dark:bg-[#241812] text-[#6B4E3A] dark:text-[#D4B483] border-[#D4B483]/30 hover:border-[#D4B483]'
            }`}
          >
            <Folder className="w-4 h-4" /> {f}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-[#241812] p-3.5 rounded-2xl border border-[#D4B483]/30 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#A6815B]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files by name..."
            className="w-full pl-9 pr-4 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/40 rounded-xl text-xs text-[#2E1F17] dark:text-[#F8F4EB]"
          />
        </div>
        <span className="text-xs text-[#6B4E3A] dark:text-[#D4B483]">
          Showing {filteredFiles.length} items
        </span>
      </div>

      {/* File List Table */}
      <div className="bg-white dark:bg-[#241812] border border-[#D4B483]/30 rounded-3xl shadow-sm overflow-hidden">
        <div className="divide-y divide-[#EFE7D5] dark:divide-[#3D2C23]">
          {filteredFiles.map((file) => (
            <div key={file.id} className="p-4 flex items-center justify-between gap-4 hover:bg-[#F8F4EB]/50 dark:hover:bg-[#31231B]/50 transition-colors">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-2 rounded-xl bg-[#F8F4EB] dark:bg-[#1A110B] shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#2E1F17] dark:text-[#F8F4EB] truncate">
                    {file.name}
                  </div>
                  <div className="text-[11px] text-[#6B4E3A] dark:text-[#D4B483]/70">
                    {file.size} • Category: {file.category} • Uploaded by {file.uploadedBy} on {file.uploadedAt}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreviewFile(file)}
                  className="p-2 rounded-lg text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5] dark:hover:bg-[#31231B]"
                  title="Preview UI"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Downloading ${file.name}...`)}
                  className="p-2 rounded-lg text-[#6B4E3A] dark:text-[#D4B483] hover:bg-[#EFE7D5] dark:hover:bg-[#31231B]"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteFile(file.id)}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                  title="Delete File"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD MODAL */}
      <Modal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} title="Upload New File">
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              File Title / Filename *
            </label>
            <input
              type="text"
              required
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. AWS_Infrastructure_Specification.pdf"
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2E1F17] dark:text-[#F8F4EB] mb-1">
              Category
            </label>
            <select
              value={fileCategory}
              onChange={(e) => setFileCategory(e.target.value as any)}
              className="w-full px-3.5 py-2 bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/50 rounded-xl text-xs"
            >
              <option value="Document">Document</option>
              <option value="Design">Design</option>
              <option value="Archive">Archive</option>
              <option value="Code">Code</option>
              <option value="Media">Media</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm">Upload File</Button>
          </div>
        </form>
      </Modal>

      {/* PREVIEW MODAL */}
      <Modal isOpen={!!previewFile} onClose={() => setPreviewFile(null)} title={`Preview: ${previewFile?.name}`}>
        <div className="space-y-4 text-center py-6">
          <div className="p-8 rounded-2xl bg-[#F8F4EB] dark:bg-[#1A110B] border border-[#D4B483]/30">
            <FileText className="w-16 h-16 text-[#D4B483] mx-auto mb-3" />
            <div className="text-sm font-bold text-[#2E1F17] dark:text-[#F8F4EB]">{previewFile?.name}</div>
            <div className="text-xs text-[#6B4E3A] mt-1">Size: {previewFile?.size} • Category: {previewFile?.category}</div>
            <div className="text-[11px] text-[#A6815B] mt-2">Uploaded by {previewFile?.uploadedBy}</div>
          </div>
          <Button variant="gold" size="sm" onClick={() => { alert(`Downloading ${previewFile?.name}`); setPreviewFile(null); }}>
            Download Copy
          </Button>
        </div>
      </Modal>
    </div>
  );
};
