import { useState } from 'react';
import { FileText, Image, Activity } from 'lucide-react';
import ProfileUpdatesTab from './ProfileUpdatesTab';
import ProfileMediaTab from './ProfileMediaTab';
import ProfileActivityTab from './ProfileActivityTab';

type TabId = 'updates' | 'media' | 'activity';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'updates', label: 'Updates', icon: FileText },
  { id: 'media', label: 'Media', icon: Image },
  { id: 'activity', label: 'Activity', icon: Activity },
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState<TabId>('updates');

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Tab headers */}
      <div className="flex border-b border-border">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
              activeTab === id
                ? 'text-foreground'
                : 'text-foreground-muted hover:text-foreground-secondary'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
            {/* Active indicator - crimson underline */}
            {activeTab === id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="p-6">
        {activeTab === 'updates' && <ProfileUpdatesTab />}
        {activeTab === 'media' && <ProfileMediaTab />}
        {activeTab === 'activity' && <ProfileActivityTab />}
      </div>
    </div>
  );
};

export default ProfileTabs;
