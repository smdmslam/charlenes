# Firestore Security Rules Setup

## Overview
This project uses Firestore collections that require security rules to protect user data.

## Collections

### 1. `memberProfiles`
- **Purpose**: Stores member profile information
- **Rules**: Users can only read/write their own profile (matched by Firebase Auth UID)
- **Access**: Authenticated users only, own documents only

### 2. `membershipApplications`
- **Purpose**: Stores membership applications from the public form
- **Rules**: 
  - Anyone can create (for public form submissions)
  - Users can read their own applications (matched by email)
  - Admins can read/update/delete all applications
- **Access**: Public create, authenticated read own, admin full access

## Setup Instructions

### Option 1: Firebase Console (Recommended for Quick Setup)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `curzon-88a6d`
3. Navigate to **Firestore Database** → **Rules** tab
4. Copy and paste the contents of `firestore.rules` into the editor
5. Click **Publish** to deploy the rules

### Option 2: Firebase CLI (For Development)

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## Important Notes

1. **Admin Access**: The rules reference `request.auth.token.admin == true` for admin access. To set this:
   - Go to Firebase Console → Authentication → Users
   - Edit a user and add a custom claim: `admin: true`
   - Or use Firebase Admin SDK to set custom claims programmatically

2. **Testing**: After deploying rules, test them in the Firebase Console:
   - Go to Firestore Database → Rules tab
   - Use the "Rules Playground" to test different scenarios

3. **Default Deny**: The rules include a default deny at the end, so any collection not explicitly allowed will be denied.

## Current Rules Summary

✅ Users can manage their own profiles  
✅ Public can submit membership applications  
✅ Users can view their own applications  
✅ Admins can manage all applications  
❌ All other access is denied by default
