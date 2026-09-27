import React, { useEffect, useState } from 'react';
import { ExternalLink, Eye, EyeOff, Pencil, Plus, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { PortfolioItem } from '../../types';

type PortfolioForm = Omit<PortfolioItem, 'id'>;

const emptyForm: PortfolioForm = {
  name: '',
  description: '',
  category: '',
  imageUrl: '',
  projectUrl: '',
  sortOrder: 0,
  published: true
};

export const PortfolioManagementPage: React.FC = () => {
  const { currentUser } = useAuth();
  const canManage = currentUser?.role === 'Owner' || currentUser?.role === 'Admin';
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState<PortfolioForm>(emptyForm);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    const portfolioItems = await api.portfolio.manage();
    setItems(portfolioItems);
  };

  useEffect(() => {
    if (!canManage) {
      setIsLoading(false);
      return;
    }
    loadItems()
      .catch(() => setMessage('Could not load portfolio items.'))
      .finally(() => setIsLoading(false));
  }, [canManage]);

  const openCreateForm = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setMessage('');
    setIsModalOpen(true);
  };

  const openEditForm = (item: PortfolioItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      description: item.description,
      category: item.category,
      imageUrl: item.imageUrl || '',
      projectUrl: item.projectUrl || '',
      sortOrder: item.sortOrder,
      published: item.published
    });
    setMessage('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');
    const payload = {
      ...form,
      name: form.name.trim(),
      category: form.category.trim(),
      imageUrl: form.imageUrl?.trim() || null,
      projectUrl: form.projectUrl?.trim() || null
    };
    try {
      if (editingItem) {
        await api.portfolio.update(editingItem.id, payload);
      } else {
        await api.portfolio.create(payload);
      }
      await loadItems();
      setIsModalOpen(false);
    } catch {
      setMessage('Could not save this portfolio item. Check your access and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const togglePublished = async (item: PortfolioItem) => {
    setMessage('');
    try {
      await api.portfolio.update(item.id, { published: !item.published });
      await loadItems();
    } catch {
      setMessage('Could not update the publication status.');
    }
  };

  const deleteItem = async (item: PortfolioItem) => {
    if (!window.confirm(`Delete “${item.name}” from the portfolio?`)) return;
    setMessage('');
    try {
      await api.portfolio.remove(item.id);
      setItems(current => current.filter(entry => entry.id !== item.id));
    } catch {
      setMessage('Could not delete this portfolio item.');
    }
  };

  if (!canManage) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Access restricted</h1>
        <p className="mt-2 text-sm text-[#6B4E3A] dark:text-[#D4B483]">Portfolio management is available to company Owners and Admins.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#2E1F17] dark:text-[#F8F4EB]">Portfolio</h1>
          <p className="mt-1 text-xs text-[#6B4E3A] dark:text-[#D4B483]/80">Manage the projects shown on your public portfolio.</p>
        </div>
        <Button variant="gold" size="md" onClick={openCreateForm} icon={<Plus className="w-4 h-4" />}>
          Add project
        </Button>
      </div>

      {message && <p role="alert" className="text-sm text-rose-700 dark:text-rose-300">{message}</p>}
      {isLoading ? (
        <p className="py-10 text-center text-sm text-[#6B4E3A] dark:text-[#D4B483]">Loading portfolio...</p>
      ) : items.length === 0 ? (
        <div className="border-y border-[#D4B483]/30 py-12 text-center">
          <p className="text-sm text-[#6B4E3A] dark:text-[#D4B483]">No portfolio projects yet.</p>
          <button onClick={openCreateForm} className="mt-3 text-sm font-semibold text-[#2E1F17] underline dark:text-[#F8F4EB]">Add the first project</button>
        </div>
      ) : (
        <div className="divide-y divide-[#D4B483]/30 border-y border-[#D4B483]/30">
          {items.map(item => (
            <article key={item.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
              {item.imageUrl && <img src={item.imageUrl} alt="" className="h-20 w-32 shrink-0 rounded-md object-cover" />}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-[#2E1F17] dark:text-[#F8F4EB]">{item.name}</h2>
                  <span className={`text-[10px] font-bold uppercase ${item.published ? 'text-emerald-700 dark:text-emerald-300' : 'text-[#8A6848] dark:text-[#D4B483]'}`}>
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#A6815B]">{item.category}</p>
                <p className="mt-1 line-clamp-2 text-xs text-[#6B4E3A] dark:text-[#D4B483]/70">{item.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {item.projectUrl && <a href={item.projectUrl} target="_blank" rel="noreferrer" aria-label={`Open ${item.name}`} className="p-2 text-[#6B4E3A] hover:bg-[#EFE7D5] dark:text-[#D4B483] dark:hover:bg-[#31231B]"><ExternalLink className="h-4 w-4" /></a>}
                <button onClick={() => togglePublished(item)} title={item.published ? 'Unpublish' : 'Publish'} aria-label={item.published ? `Unpublish ${item.name}` : `Publish ${item.name}`} className="p-2 text-[#6B4E3A] hover:bg-[#EFE7D5] dark:text-[#D4B483] dark:hover:bg-[#31231B]">
                  {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                <button onClick={() => openEditForm(item)} title="Edit" aria-label={`Edit ${item.name}`} className="p-2 text-[#6B4E3A] hover:bg-[#EFE7D5] dark:text-[#D4B483] dark:hover:bg-[#31231B]"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => deleteItem(item)} title="Delete" aria-label={`Delete ${item.name}`} className="p-2 text-rose-700 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/40"><Trash2 className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit portfolio project' : 'Add portfolio project'} maxWidth="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
            Project name
            <input required maxLength={200} value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} className="mt-1 w-full rounded-lg border border-[#D4B483]/40 bg-transparent px-3 py-2 text-sm text-[#2E1F17] dark:text-[#F8F4EB]" />
          </label>
          <label className="block text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
            Category
            <input required maxLength={100} value={form.category} onChange={event => setForm({ ...form, category: event.target.value })} placeholder="e.g. Cloud Infrastructure" className="mt-1 w-full rounded-lg border border-[#D4B483]/40 bg-transparent px-3 py-2 text-sm text-[#2E1F17] dark:text-[#F8F4EB]" />
          </label>
          <label className="block text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
            Description
            <textarea required rows={4} value={form.description} onChange={event => setForm({ ...form, description: event.target.value })} className="mt-1 w-full resize-y rounded-lg border border-[#D4B483]/40 bg-transparent px-3 py-2 text-sm text-[#2E1F17] dark:text-[#F8F4EB]" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
              Image URL
              <input type="url" value={form.imageUrl || ''} onChange={event => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://..." className="mt-1 w-full rounded-lg border border-[#D4B483]/40 bg-transparent px-3 py-2 text-sm text-[#2E1F17] dark:text-[#F8F4EB]" />
            </label>
            <label className="block text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
              Project link
              <input type="url" value={form.projectUrl || ''} onChange={event => setForm({ ...form, projectUrl: event.target.value })} placeholder="https://..." className="mt-1 w-full rounded-lg border border-[#D4B483]/40 bg-transparent px-3 py-2 text-sm text-[#2E1F17] dark:text-[#F8F4EB]" />
            </label>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <label className="block text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
              Display order
              <input type="number" value={form.sortOrder} onChange={event => setForm({ ...form, sortOrder: Number(event.target.value) })} className="mt-1 block w-32 rounded-lg border border-[#D4B483]/40 bg-transparent px-3 py-2 text-sm text-[#2E1F17] dark:text-[#F8F4EB]" />
            </label>
            <label className="flex items-center gap-2 pb-2 text-xs font-semibold text-[#6B4E3A] dark:text-[#D4B483]">
              <input type="checkbox" checked={form.published} onChange={event => setForm({ ...form, published: event.target.checked })} className="accent-[#6B4E3A]" />
              Publish on public portfolio
            </label>
          </div>
          <div className="flex justify-end gap-3 border-t border-[#EFE7D5] pt-4 dark:border-[#3D2C23]">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="gold" size="sm" disabled={isSaving}>{isSaving ? 'Saving...' : editingItem ? 'Save changes' : 'Add project'}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};