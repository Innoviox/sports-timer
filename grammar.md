# Timer Creation Grammar

Each timer has a name (specified by `# {name}`)

Each timer is broken down into phases (warmup, etc.)

Each phase is broken down into segments.

Each segment has a length and a direction (up/down).

For example:

```
# Exercise
Phase 1: Warmup
	up 10:00
	down 0:30
```

Shorthands:

If a phase has a single segment, it can be written as follows:

```
Phase 1: Warmup - up 10:00
```

Instead of writing `Phase 1: `, the user can write `1:`.

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

Timer options can be specified as follows:

```
# Football
options:
 - pause between phases
1. ...
```

- pause between phases: pause the timer between phases.