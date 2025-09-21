'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { profileAPI } from '@/utils/api';
import { useAuth } from './AuthContext';

interface User {
  id: string;
  email: string;
  name?: string;
  bio?: string;
  skills: string[];
  location?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  experience?: string;
  education?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProfileContextType {
  profile: User | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      setProfile(user);
    } else {
      setProfile(null);
    }
  }, [isAuthenticated, user]);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await profileAPI.getProfile();
      
      if (response.data.success) {
        setProfile(response.data.data.user);
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch profile';
      setError(errorMessage);
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await profileAPI.updateProfile(data);
      
      if (response.data.success) {
        setProfile(response.data.data.user);
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      setError(errorMessage);
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const addSkill = useCallback((skill: string) => {
    if (!profile || !skill.trim()) return;
    
    const trimmedSkill = skill.trim();
    if (!profile.skills.includes(trimmedSkill)) {
      const updatedSkills = [...profile.skills, trimmedSkill];
      setProfile({ ...profile, skills: updatedSkills });
    }
  }, [profile]);

  const removeSkill = useCallback((skill: string) => {
    if (!profile) return;
    
    const updatedSkills = profile.skills.filter(s => s !== skill);
    setProfile({ ...profile, skills: updatedSkills });
  }, [profile]);

  const value: ProfileContextType = {
    profile: mounted ? profile : null,
    loading: !mounted || loading,
    error: mounted ? error : null,
    fetchProfile,
    updateProfile,
    addSkill,
    removeSkill,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};


