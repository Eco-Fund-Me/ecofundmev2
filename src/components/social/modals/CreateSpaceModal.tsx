import React, { useState } from 'react';
import { X, Plus, Users, Briefcase, AlertCircle } from 'lucide-react';
import { useMatrix } from '@/hooks/useMatrix';

type CreateSpaceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isVerifiedBusiness?: boolean;
};

export const CreateSpaceModal: React.FC<CreateSpaceModalProps> = ({
  isOpen,
  onClose,
  isVerifiedBusiness = false,
}) => {
  const [spaceType, setSpaceType] = useState('general');
  const [spaceName, setSpaceName] = useState('');
  const [spaceTopic, setSpaceTopic] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { createSpace, createCampaignSpace } = useMatrix();

  const handleCreateSpace = async (name: string, topic?: string) => {
    console.log('Creating general space:', { name, topic });
    const result = await createSpace(name, topic);
    console.log('Space created:', result);
    return result;
  };
  
  const handleCreateCampaignSpace = async (name: string, topic?: string, isPublic: boolean = false) => {
    console.log('Creating campaign space:', { name, topic, isPublic });
    const result = await createCampaignSpace(name, topic, isPublic);
    console.log('Campaign space created:', result);
    return result;
  };

  const handleSubmit = async () => {
    if (!spaceName.trim()) {
      setError('Space name is required');
      return;
    }

    if (spaceType === 'campaign' && !isVerifiedBusiness) {
      setError('You must be a verified business to create campaign spaces');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      if (spaceType === 'campaign') {
        await handleCreateCampaignSpace(
          spaceName, 
          spaceTopic || undefined, 
          isPublic
        );
      } else {
        await handleCreateSpace(
          spaceName, 
          spaceTopic || undefined
        );
      }
      
      // Reset form
      setSpaceName('');
      setSpaceTopic('');
      setIsPublic(false);
      setSpaceType('general');
      onClose();
    } catch (err) {
      setError(
        err && typeof err === 'object' && 'message' in err && typeof (err as { message?: unknown }).message === 'string'
          ? (err as { message: string }).message
          : 'Failed to create space'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSpaceName('');
    setSpaceTopic('');
    setIsPublic(false);
    setSpaceType('general');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create Community Space</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Space Type Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Space Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="spaceType"
                  value="general"
                  checked={spaceType === 'general'}
                  onChange={(e) => setSpaceType(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">General Community</span>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="spaceType"
                  value="campaign"
                  checked={spaceType === 'campaign'}
                  onChange={(e) => setSpaceType(e.target.value)}
                  className="text-green-600 focus:ring-green-500"
                />
                <div className="flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-gray-700">Campaign Space</span>
                </div>
              </label>
            </div>
          </div>

          {/* Verification Warning */}
          {spaceType === 'campaign' && !isVerifiedBusiness && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-700">
                  Verified business status required for campaign spaces
                </span>
              </div>
            </div>
          )}

          {/* Space Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Space Name *
            </label>
            <input
              type="text"
              value={spaceName}
              onChange={(e) => setSpaceName(e.target.value)}
              placeholder="Enter space name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Space Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={spaceTopic}
              onChange={(e) => setSpaceTopic(e.target.value)}
              placeholder="Brief description of the space"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Public/Private Toggle */}
          {spaceType === 'campaign' && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="text-green-600 focus:ring-green-500"
              />
              <label htmlFor="isPublic" className="text-sm text-gray-700">
                Make this space public
              </label>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || (spaceType === 'campaign' && !isVerifiedBusiness)}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Create Space</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};