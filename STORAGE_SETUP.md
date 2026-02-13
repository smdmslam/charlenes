# Firebase Storage Setup for Job Applications

## Overview
Firebase Storage is used to store CV/resume files and photos uploaded through the job application form.

## File Types Accepted

### CV/Resume Files
- **Formats**: PDF, DOC, DOCX
- **MIME Types**:
  - `application/pdf` (PDF)
  - `application/msword` (DOC)
  - `application/vnd.openxmlformats-officedocument.wordprocessingml.document` (DOCX)
- **Max File Size**: 10MB
- **Required**: Yes

### Photo Files
- **Formats**: JPG, JPEG, PNG, WEBP, GIF
- **MIME Types**:
  - `image/jpeg` (JPG/JPEG)
  - `image/png` (PNG)
  - `image/webp` (WEBP)
  - `image/gif` (GIF)
- **Max File Size**: 5MB
- **Required**: No (optional)

## Storage Structure

Files are organized in Firebase Storage as follows:
```
job-applications/
  ├── cvs/
  │   └── {timestamp}_{filename}
  └── photos/
      └── {timestamp}_{filename}
```

## Security Rules Setup

### Option 1: Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Storage** → **Rules** tab
4. Copy and paste the contents of `storage.rules` into the editor
5. Click **Publish** to deploy the rules

### Option 2: Firebase CLI

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase Storage (if not already done)
firebase init storage

# Deploy rules
firebase deploy --only storage
```

## Security Rules Details

The storage rules allow:
- **Write**: Anyone can upload CVs and photos (for public form submissions)
  - CV files: Max 10MB, PDF/DOC/DOCX only
  - Photo files: Max 5MB, JPG/PNG/WEBP/GIF only
- **Read**: Only authenticated users can read files
  - Users can read their own files
  - Admins can read all files

## File Validation

The application includes client-side validation:
- File type checking (by extension and MIME type)
- File size validation
- User-friendly error messages

## Important Notes

1. **Storage Bucket**: Ensure `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` is set in your environment variables
2. **File Size Limits**: Enforced both client-side and in storage rules
3. **File Naming**: Files are automatically renamed with timestamps to prevent conflicts
4. **Privacy**: Files are stored securely and only accessible to authenticated users and admins
