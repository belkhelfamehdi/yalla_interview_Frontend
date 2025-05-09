import React, { useRef, useState, type ChangeEvent } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

interface ProfilePhotoSelectorProps {
  image: File | null;
  setImage: (file: File | null) => void;
  preview?: string | null;
  setPreview?: (preview: string | null) => void;
}

const ProfilePhotoSelector: React.FC<ProfilePhotoSelectorProps> = ({
  image,
  setImage,
  preview,
  setPreview,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const previewURL = URL.createObjectURL(file);

      setPreviewUrl(previewURL);
      if (setPreview) {
        setPreview(previewURL);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex justify-center mb-5">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-20 h-20 flex items-center justify-center bg-red-50 rounded-full relative cursor-pointer">
          <LuUser className="text-4xl text-red-500" />
          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-red-500/80 to-red-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            className="w-20 h-20 rounded-full object-cover"
            src={preview || previewUrl || ''}
            alt="profile_photo"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
