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

bg_sub = '''    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 250,
        backgroundColor: '#FFFFFF',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },'''

sh_sub = '''    brandShieldContainer: {
        marginBottom: 8,
    },'''

bname_sub = '''    brandName: {
        color: '#0A1C43',
        ...TextStyles.h3,
        fontWeight: '900',
        letterSpacing: 1.5,
    },'''

for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()

    # 1. Image
    c = c.replace("logo_white.png", "logo.png")

    # 2. headerBackground 
    c = re.sub(r"    headerBackground:\s*\{[^}]*\},", bg_sub, c, count=1, flags=re.DOTALL)
    
    # 3. brandShieldContainer
    c = re.sub(r"    brandShieldContainer:\s*\{[^}]*\},", sh_sub, c, count=1, flags=re.DOTALL)
    
    # 4. brandName
    c = re.sub(r"    brandName:\s*\{[^}]*\},", bname_sub, c, count=1, flags=re.DOTALL)
    
    # 5. titleText / greeting
    c = re.sub(r"titleText:\s*\{\s*\.\.\.TextStyles\.h2,\s*color:\s*'#FFFFFF'", "titleText: { ...TextStyles.h2, color: '#0A1C43'", c)
    c = re.sub(r"greeting:\s*\{\s*\.\.\.TextStyles\.h3,\s*color:\s*'#FFFFFF'", "greeting: { ...TextStyles.h3, color: '#0A1C43'", c)
    c = re.sub(r"greetingSub:\s*\{\s*\.\.\.TextStyles\.caption,\s*color:\s*'rgba\(255, 255, 255, 0.8\)'", "greetingSub: { ...TextStyles.caption, color: '#374151'", c)
    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(c)

print("Done")
