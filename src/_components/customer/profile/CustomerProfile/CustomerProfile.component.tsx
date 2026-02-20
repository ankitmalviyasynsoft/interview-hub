'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ControlledInput } from '@/_components/ui/ControlledInput'
import { Button } from '@/_components/ui/button'

// --- Icons ---
const Icons = {
  MapPin: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Mail: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Phone: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Globe: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  ),
  Camera: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Edit2: (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  ),
}

interface CustomerProfileFormValues {
  fullName: string
  headline: string
  email: string
  phone: string
  location: string
  website: string
  bio: string
}

export const CustomerProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal') // 'personal' | 'account' | 'notifications'

  // Mock data state to visually update immediately on "save" (simulation)
  const [displayData, setDisplayData] = useState({
    fullName: 'Alex Morgan',
    headline: 'Senior Software Engineer',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 000-0000',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    bio: 'Passionate developer with 5+ years of experience in building scalable web applications. Loves React, Node.js, and cloud architecture to build seamless user experiences.',
  })

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CustomerProfileFormValues>({
    defaultValues: displayData,
    values: displayData, // Update form if displayData changes
  })

  const onSubmit = (data: CustomerProfileFormValues) => {
    setDisplayData(data)
    setIsEditing(false)
  }

  return (
    <div className="w-full max-w-5xl mx-auto pb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* --- Cover Image --- */}
      <div className="relative h-64 w-full rounded-b-[2.5rem] bg-gradient-to-br from-primary via-primary/90 to-accent shadow-xl overflow-visible">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 rounded-b-[2.5rem]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-b-[2.5rem]"></div>

        {/* Status Badge */}
        <div className="absolute top-6 right-8 backdrop-blur-md bg-white/20 border border-white/30 px-4 py-1.5 rounded-full shadow-lg">
          <span className="text-white text-sm font-semibold tracking-wide">Pro Member</span>
        </div>
      </div>

      {/* --- Main Content Container --- */}
      <div className="px-4 sm:px-8 lg:px-12 relative z-10 -mt-20">
        {/* --- Unified Header Card --- */}
        <div className="bg-card text-card-foreground rounded-[2rem] shadow-xl shadow-primary/5 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-end gap-6 mb-8 border border-border">
          {/* Avatar - Positioned to float slightly above */}
          <div className="relative -mt-20 md:-mt-24 shrink-0">
            <div className="h-36 w-36 rounded-[2rem] rotate-3 border-4 border-background bg-card shadow-2xl overflow-hidden flex items-center justify-center relative z-10 transition-transform duration-300 hover:rotate-0">
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted"></div>
              <span className="text-4xl font-black text-primary/80 relative z-10 select-none">
                {displayData.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </span>
            </div>
            {/* Avatar Decorator */}
            <div className="absolute inset-0 bg-primary rounded-[2rem] rotate-6 opacity-20 scale-95 z-0"></div>

            <button
              className="absolute -bottom-2 -right-2 z-20 p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all duration-200"
              title="Update Photo"
            >
              <Icons.Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Name & Headline */}
          <div className="flex-1 text-center md:text-left pb-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">{displayData.fullName}</h1>
            <p className="text-lg text-muted-foreground font-medium mt-1">{displayData.headline}</p>
          </div>

          {/* Action Button */}
          <div className="pb-1">
            <Button
              variant={isEditing ? 'secondary' : 'default'}
              onClick={() => setIsEditing(!isEditing)}
              className={`shadow-lg shadow-primary/20 rounded-full px-6 transition-all duration-300 ${isEditing ? 'bg-muted hover:bg-muted/80 text-foreground' : 'bg-primary hover:bg-primary/90 hover:-translate-y-0.5 text-primary-foreground'}`}
            >
              {isEditing ? (
                'Cancel'
              ) : (
                <span className="flex items-center gap-2">
                  <Icons.Edit2 className="w-4 h-4" />
                  Edit Profile
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* --- Sidebar (Left) --- */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Strength Card */}
            <div className="bg-card rounded-3xl p-6 shadow-sm border border-border">
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Profile Strength</h3>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">Advanced</span>
                  <span className="text-xs font-semibold inline-block text-primary">85%</span>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-secondary">
                  <div style={{ width: '85%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-1000 ease-out"></div>
                </div>
              </div>
            </div>

            {/* Skills Card */}
            <div className="bg-card rounded-3xl p-6 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Skills</h3>
                <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">+ Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Design System', 'Next.js', 'PostgreSQL'].map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-muted text-muted-foreground border border-border hover:border-primary/20 hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* --- Main Content (Right) --- */}
          <div className="lg:col-span-8">
            <div className="bg-card text-card-foreground rounded-[2rem] shadow-xl shadow-black/5 border border-border overflow-hidden min-h-[500px]">
              {/* Tabs Header */}
              <div className="flex flex-wrap border-b border-border px-8 pt-6 pb-0 gap-8">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'personal' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  Personal Details
                </button>
                <button
                  onClick={() => setActiveTab('account')}
                  className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'account' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  Account Settings
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`pb-4 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'notifications' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
                >
                  Notifications
                </button>
              </div>

              <div className="p-8">
                {activeTab === 'personal' && (
                  <>
                    {isEditing ? (
                      /* --- EDIT MODE FORM --- */
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                          <ControlledInput name="fullName" control={control} label="Full Name" className="bg-muted/50 border-input focus:border-primary focus:bg-background" />
                          <ControlledInput name="headline" control={control} label="Headline" className="bg-muted/50 border-input focus:border-primary focus:bg-background" />
                          <ControlledInput name="email" control={control} label="Email" disabled className="bg-muted text-muted-foreground cursor-not-allowed" />
                          <ControlledInput name="phone" control={control} label="Phone" className="bg-muted/50 border-input focus:border-primary focus:bg-background" />
                          <ControlledInput name="location" control={control} label="Location" className="bg-muted/50 border-input focus:border-primary focus:bg-background" />
                          <ControlledInput name="website" control={control} label="Website" className="bg-muted/50 border-input focus:border-primary focus:bg-background" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-foreground">Bio</label>
                          <textarea
                            {...register('bio')}
                            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-input focus:bg-background focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-foreground placeholder:text-muted-foreground min-h-[140px] resize-y"
                            placeholder="Tell us about yourself..."
                          />
                        </div>

                        <div className="flex justify-end pt-4 border-t border-border">
                          <Button type="submit" size="lg" className="px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    ) : (
                      /* --- VIEW MODE DISPLAY --- */
                      <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <InfoItem icon={<Icons.Mail className="w-5 h-5" />} label="Email" value={displayData.email} />
                          <InfoItem icon={<Icons.Phone className="w-5 h-5" />} label="Phone" value={displayData.phone} />
                          <InfoItem icon={<Icons.MapPin className="w-5 h-5" />} label="Location" value={displayData.location} />
                          <InfoItem icon={<Icons.Globe className="w-5 h-5" />} label="Website" value={displayData.website} isLink />
                        </div>

                        <div className="pt-6 border-t border-border">
                          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">About Me</h3>
                          <p className="text-muted-foreground leading-relaxed text-lg">{displayData.bio}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'account' && (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-2">
                    <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                      <Icons.Edit2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Account Settings</h3>
                    <p className="text-muted-foreground max-w-xs mt-2">Manage your password, login sessions, and linked accounts here.</p>
                    <Button variant="outline" className="mt-6" onClick={() => {}}>
                      Coming Soon
                    </Button>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-2">
                    <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4 text-muted-foreground">
                      <Icons.Mail className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                    <p className="text-muted-foreground max-w-xs mt-2">Customize how and when you want to receive updates from us.</p>
                    <Button variant="outline" className="mt-6" onClick={() => {}}>
                      Coming Soon
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper for View Mode
const InfoItem = ({ icon, label, value, isLink }: { icon: React.ReactNode; label: string; value: string; isLink?: boolean }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 hover:bg-muted/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300 group">
    <div className="p-3 rounded-xl bg-background text-primary shadow-sm border border-border group-hover:border-primary/20 group-hover:text-primary/90 transition-colors">{icon}</div>
    <div>
      <p className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wide mb-0.5">{label}</p>
      {isLink ? (
        <a href={value} target="_blank" rel="noreferrer" className="text-foreground font-medium hover:text-primary hover:underline transition-colors truncate block">
          {value.replace(/^https?:\/\//, '')}
        </a>
      ) : (
        <p className="text-foreground font-medium">{value}</p>
      )}
    </div>
  </div>
)
