import re

def parse_phases(s, d=0):
    phases = []
    found_phases = re.split(r'\n {%d}\d*\.' % d, s)
    print(d, len(found_phases), found_phases)
    #input()
    for k, phase in enumerate(found_phases):
        print('\t'*d, k, phase)
        #input()
        n1 = phase.split("\n")[0]
        if "-" in n1:
            *_, name, _, di, t = n1.strip().split()
            phases.append([name, ["", di, t]])
        else:
            name, *lines = phase.split("\n")
            lines = "\n".join(lines)
            phase = [name, []]
            for p2 in parse_phases(lines, d=d+2):
                phase[1].append(p2)
            phases.append(phase)
    return phases

def parse(s):
    name = "Custon Timer"
    
    lines = s.split("\n")
    if lines[0].startswith("#"):
        name = lines[0].strip("# ")
        lines.pop(0)
    lines = "\n".join(lines)

    return (name, parse_phases(lines))
    

timer = """# My Timer
1. 1st Phase
  1. 1st Cell
    1. Plank - down 0:15
  2. 2nd Cell
    1. Run - up 20:00
    2. Bike - down 30:00"""


print(parse(timer))
