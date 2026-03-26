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

    # Logo image
    c = c.replace("../../assets/images/logo_white.png", "../../assets/images/logo.png")
    c = c.replace("../assets/images/logo_white.png", "../assets/images/logo.png")

    # 1. Fix JSX inline styles for shield container
    shield_pattern = r"(<View style=\[styles\.brandShieldContainer)[^\]]*\]>"
    c = re.sub(shield_pattern, r"<View style={styles.brandShieldContainer}>", c)

    # 2. Fix JSX inline styles for brandTitle/brandName
    brand_pattern1 = r"(<Text style=\[styles\.brandName)[^\]]*\]>"
    c = re.sub(brand_pattern1, r"<Text style={styles.brandName}>", c)
    
    brand_pattern2 = r"(<Text style=\[styles\.brandTitle)[^\]]*\]>"
    c = re.sub(brand_pattern2, r"<Text style={styles.brandTitle}>", c)
    
    # Fix logo sizes inside JSX
    c = re.sub(r"(<Image[^>]*style=\{\{\s*height:\s*)26(,\s*width:\s*)26(\s*\}\}[^>]*>)", r"\g<1>60\g<2>60\g<3>", c)

    # 3. Update StyleSheets

    bg_old = r"    headerBackground: \{[^}]*\},"
    bg_new = """    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 250, // Longer header
        backgroundColor: '#FFFFFF', // White header
        borderBottomLeftRadius: 40, // Curved bottom
        borderBottomRightRadius: 40, // Curved bottom
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },"""
    c = re.sub(bg_old, bg_new, c)

    center_old = r"    headerCenter: \{\s*flexDirection:\s*'row',\s*alignItems:\s*'center',\s*\},"
    center_new = """    headerCenter: {
        flexDirection: 'column',
        alignItems: 'center',
    },"""
    c = re.sub(center_old, center_new, c)

    shield_old = r"    brandShieldContainer: \{[^}]*\},"
    shield_new = """    brandShieldContainer: {
        marginRight: 0,
    },"""
    c = re.sub(shield_old, shield_new, c)

    bname_old = r"    brandName: \{[^}]*\},"
    bname_new = """    brandName: {
        color: '#0A1C43', // Dark Navy Brand
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },"""
    c = re.sub(bname_old, bname_new, c)

    btitle_old = r"    brandTitle: \{[^}]*\},"
    btitle_new = """    brandTitle: {
        color: '#0A1C43', // Dark Navy Brand
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: 1,
    },"""
    c = re.sub(btitle_old, btitle_new, c)

    greet_old = r"    greeting: \{[^}]*#FFFFFF[^}]*\},"
    greet_new = """    greeting: {
        ...TextStyles.h3,
        color: '#0A1C43',
        fontWeight: 'bold',
        marginTop: -10, // Pull up higher
    },"""
    c = re.sub(greet_old, greet_new, c)

    greetsub_old = r"    greetingSub: \{[^}]*#E2E8F0[^}]*\},"
    greetsub_new = """    greetingSub: {
        ...TextStyles.caption,
        color: '#374151', // Dark Gray
        marginTop: 2,
    },"""
    c = re.sub(greetsub_old, greetsub_new, c)
    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(c)

for fpath in files:
    clean_file(fpath)

print("Done")
