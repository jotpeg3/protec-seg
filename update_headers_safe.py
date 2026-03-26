import os
import re

files = [
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\index.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\tickets.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\payments.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(client)\profile.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\index.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\active.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\history.tsx",
    r"c:\Users\Luis COPY\Documents\PROJETOS\protect seg\protect-seg\app\(patrol)\profile.tsx",
]

bg_old = r"""    headerBackground: \{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 210, // Standardized header
        backgroundColor: '#0A1C43', // Brand Navy
        borderBottomLeftRadius: 0, // Squared
        borderBottomRightRadius: 0, // Squared
    \},"""

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

shield_old = r"""    brandShieldContainer: \{
        marginBottom: 10,
        // White Neon Glow Effect
        shadowColor: '#FFFFFF',
        shadowOffset: \{ width: 0, height: 0 \},
        shadowOpacity: 0.8,
        shadowRadius: 10,
    \},"""

shield_new = """    brandShieldContainer: {
        marginBottom: 10,
    },"""

bname_old = r"""    brandName: \{
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 2,
        // Text Neon Glow
        textShadowColor: 'rgba\(255, 255, 255, 0\.6\)',
        textShadowOffset: \{ width: 0, height: 0 \},
        textShadowRadius: 12,
    \},"""

bname_new = """    brandName: {
        color: '#0A1C43', // Dark Navy Brand
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: 2,
    },"""

btitle_old = r"""    brandTitle: \{
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
    \},"""

btitle_new = """    brandTitle: {
        color: '#0A1C43', // Dark Navy Brand
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: 1,
    },"""

greet_old = r"""    greeting: \{
        \.\.\.TextStyles\.h3,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: -10, // Pull up higher
    \},"""
greet_new = """    greeting: {
        ...TextStyles.h3,
        color: '#0A1C43',
        fontWeight: 'bold',
        marginTop: -10, // Pull up higher
    },"""

greetsub_old = r"""    greetingSub: \{
        \.\.\.TextStyles\.caption,
        color: '#E2E8F0', // Light slate
        marginTop: 2,
    \},"""
greetsub_new = """    greetingSub: {
        ...TextStyles.caption,
        color: '#374151', // Dark Gray
        marginTop: 2,
    },"""


for fpath in files:
    with open(fpath, "r", encoding="utf-8") as f:
        c = f.read()

    # Logo image
    c = c.replace("../../assets/images/logo_white.png", "../../assets/images/logo.png")
    c = c.replace("../assets/images/logo_white.png", "../assets/images/logo.png")

    c = re.sub(bg_old, bg_new, c)
    c = re.sub(shield_old, shield_new, c)
    c = re.sub(bname_old, bname_new, c)
    c = re.sub(btitle_old, btitle_new, c)
    c = re.sub(greet_old, greet_new, c)
    c = re.sub(greetsub_old, greetsub_new, c)

    
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(c)

print("Done")
