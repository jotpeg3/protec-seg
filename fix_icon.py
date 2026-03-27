from PIL import Image

files = [
    'assets/images/android-icon-foreground.png',
    'assets/images/android-icon-monochrome.png',
    'assets/images/icon.png'
]

for file in files:
    try:
        img = Image.open(file)
        w, h = img.size
        print(f"Opening {file} with size {w}x{h}")
        
        if w == h:
            print(f"{file} is already a square. Skipping.")
            continue
            
        # Make a square
        size = max(w, h)
        
        # Determine background color: 
        # For typical logo icons/masks, transparent is fine.
        new_img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        
        # For monochrome, if we want it completely white padding, we could check the image mode.
        # But for Expo, transparent padding works.
        
        # Paste original image in the center
        offset = ((size - w) // 2, (size - h) // 2)
        new_img.paste(img, offset)
        
        # Save as PNG
        if file.endswith('.png'):
            new_img.save(file)
            
        print(f"Resized {file} from {w}x{h} to {size}x{size} successfully.")
    except Exception as e:
        print(f"Error on {file}: {e}")
