import os
import re

files = [
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\tickets.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\payments.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\profile.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\index.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\active.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\history.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\profile.tsx",
]

def clean_file(fpath):
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()

    # 1. Fix JSX inline styles for shield container
    shield_pattern = r"<View style=\[styles\.brandShieldContainer[^>]*>"
    c = re.sub(shield_pattern, r"<View style={styles.brandShieldContainer}>", c)

    # 2. Fix JSX inline styles for brandTitle/brandName
    brand_pattern1 = r"<Text style=\[styles\.brandName[^>]*>"
    c = re.sub(brand_pattern1, r"<Text style={styles.brandName}>", c)
    
    brand_pattern2 = r"<Text style=\[styles\.brandTitle[^>]*>"
    c = re.sub(brand_pattern2, r"<Text style={styles.brandTitle}>", c)
    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(c)

for fpath in files:
    clean_file(fpath)

print("Done part 3")
