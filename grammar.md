# Timer Creation Grammar

Each timer has a name (specified by `# {name}`)

Each timer is broken down into phases (warmup, etc.)

Each phase is broken down into segments, which are indented underneath the label of the warmup 

Each segment has two parts:
1. A direction: (up/down) or (stopwatch/timer) (not case sentitive). If the direction is 'up' or 'stopwatch', the segment will count from 0 to the given length; `down` or `stopwatch` count from the length down to zero.
2. A length: how long the timer lasts. This is written in the form `hh:mm:ss`

For example:
```
# Exercise
1. Warmup
	up 10:00
	down 0:30
```

Shorthands:

If a phase has a single segment, it can be written as follows:
```
1. Warmup - up 10:00
```

Example:
```
# Football
1. 1st Quarter - down 15:00
2. 2nd Quarter - down 15:00
3. 3rd Quarter - down 15:00
4. 4th Quarter - down 15:00
```



## Options:

Timer options can be specified for each segment individually by writing it after the length with a `-` separating them
```
# Exercise
1. Warmup
	up 10:00 - pause
	down 0:30 - pause
```
You can also apply them to phases or the entire timer:
```
# Football - pause
1. ...
```

List of options:
- `pause`: pause the timer between segments. By default, the timer will immediately continue into the next segment. (When applied to the phases or timer as a whole, it will be applied to all the sub-phases and sub-segments.)
- `goto [phase_name]`: when this timer, phase,  segment is done, jump to the phase with the given name (or number?) - not case sensitive (?). You can make an infinite loop by jumping back to the same phase - for example: 
```
# Dance
1. Forever - up 15:00 - goto Forever
```
