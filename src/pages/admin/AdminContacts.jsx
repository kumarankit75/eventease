import { useState, useEffect } from 'react'
import adminService from '../../api/adminService'

function AdminContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    adminService.getAllContacts()
      .then((data) => setContacts(data.contacts || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-brand-text mb-1">Contact Messages</h1>
        <p className="text-brand-muted text-sm">{contacts.length} total messages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* List */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-brand-muted text-sm">Loading…</div>
          ) : contacts.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-brand-muted text-sm">No messages yet</div>
          ) : (
            <div className="divide-y divide-white/5">
              {contacts.map((c) => {
                return (
                  <div key={c._id} onClick={() => setSelected(c)} className={`px-6 py-4 cursor-pointer transition-all duration-150 hover:bg-white/3 ${selected?._id === c._id ? 'bg-gold/5 border-l-2 border-gold' : ''}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-brand-text text-sm font-semibold">{c.name}</div>
                        <div className="text-brand-muted text-xs mt-0.5">{c.email}</div>
                        <div className="text-brand-dim text-xs mt-1 line-clamp-1">{c.message}</div>
                      </div>
                      <div className="text-brand-dim text-xs flex-shrink-0">
                        {new Date(c.createdAt).toLocaleDateString('en-IN')}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Detail */}
        <div className="bg-deep-3 border border-gold/15 rounded-brand-xl p-6">
          {selected ? (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center text-gold font-bold flex-shrink-0">
                  {selected.name.charAt(0)}
                </div>
                <div>
                  <div className="text-brand-text font-semibold">{selected.name}</div>
                  <div className="text-brand-muted text-xs">{selected.email}</div>
                  {selected.phone && <div className="text-brand-muted text-xs">{selected.phone}</div>}
                </div>
              </div>
              <div className="text-brand-dim text-xs uppercase tracking-wide mb-2">Message</div>
              <p className="text-brand-muted text-sm leading-relaxed mb-6">{selected.message}</p>
              <div className="text-brand-dim text-xs">
                Received {new Date(selected.createdAt).toLocaleString('en-IN')}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-32 text-brand-dim text-sm">
              Select a message to view details
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default AdminContacts