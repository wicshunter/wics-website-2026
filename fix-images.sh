#!/bin/bash

# Script to remove EXIF orientation data from images
# This will auto-rotate images based on their EXIF data and remove the EXIF data

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null
then
    echo "ImageMagick is not installed. Please install it first:"
    echo "brew install imagemagick"
    exit 1
fi

# Directory containing the images
IMAGE_DIR="public/images/officers"

# Backup directory
BACKUP_DIR="public/images/officers/backup"
mkdir -p "$BACKUP_DIR"

echo "Processing officer images..."

# Process each image
for img in "$IMAGE_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        echo "Processing: $filename"
        
        # Create backup
        cp "$img" "$BACKUP_DIR/$filename"
        
        # Auto-rotate based on EXIF and strip EXIF data
        magick "$img" -auto-orient -strip "$img"
        
        echo "✓ Fixed: $filename"
    fi
done

echo "Done! Original images backed up to $BACKUP_DIR"
echo "If images look correct, you can delete the backup folder."
