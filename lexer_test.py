import re

def parse_phases(s, d=0):
    if '.' not in s:
        return [i.split() for i in s.split("\n")]
    phases = []
    found_phases = re.split(r'\n {%d}\d*\.' % d, s)
    for k, phase in enumerate(found_phases):
        n1 = phase.split("\n")[0]
        if "-" in n1:
            *_, name, _, di, t = n1.strip().split()
            phases.append([name, [[di, t]]])
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

def _disp_timers(arr, n):
    for k in arr:
        name, phase = k
        if '.' in name:
            name = name.split(".")[1]
        name = name.strip()
        for i in phase:
            if i[0] in ['down', 'up']:
                print(f"{n} > {name} > {i[0]} {i[1]}")
            else:
                _disp_timers([i], f"{n} > {name}")

def disp_timers(s):
    n, k = parse(s)
    _disp_timers(k, n)

timer = """# My Timer
1. 1st Phase
  1. 1st Cell
    1. Plank - down 0:15
  2. 2nd Cell
    up 20:00
    down 30:00"""


# print(parse(timer))
disp_timers(timer)
