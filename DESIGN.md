# Husband vs Contractor — Game Design Doc
*2-player browser game for Handshake AI Skills Studio "Create a Multiplayer Game" (Oct 2026). Deadline: Oct 30, 11:59 PM PT.*

## Title
**Husband vs Contractor** (chosen by Tyler). Earlier options: Honey-Do or Honey-Don't, One Shot, Honey, Call the Pro?!

## The score: beat the contractor's bill
The wife still sets up every job. Each job has a contractor's quote, and those quotes add up to a **running contractor bill**. The husband's total spend (parts, plus any pro he has to call, plus the cost of fixing a failed fix) is measured against that bill. **He wins only if he spends less than the bill with zero unsafe DIY attempts.**

## Pitch
She has a Pinterest board and a contractor on speed dial. He has a toolbox and way too much confidence. Every "simple" house project hides an everyday surprise. Find it, choose wisely, and keep the house (and the marriage) standing. Funny on top, and underneath it teaches when to DIY and when to call a pro.

## Player roles
| Wife (Project Boss) | Husband (DIY Guy) |
|---|---|
| Draws 3 project cards and picks one | Inspects up to 3 spots (tap hotspots) |
| Sets the **budget** and the **"Call the Pro" timer** (30–90s) | Picks tools and steps from a short menu |
| Secretly sees 1 true clue and can **share it, hint at it, or bluff** | Gets **ONE DIY attempt**, or can call the pro himself |
| Wins big if she rightly calls the pro early | Wins big if he DIYs a job that really is DIY-safe |

Roles stay fixed for the whole match (she sets up, he tries to beat the contractor). A match is 4 rounds.

## Core loop (about 2–3 min per round)
1. **Request:** the wife picks a project ("I want a new patio BBQ!").
2. **Set the stakes:** she sets the budget and the timer, and can drop a clue or a bluff.
3. **Investigate:** the husband taps hotspots, and each one reveals a plain-English clue ("Floor feels spongy," "Box says *natural gas only*").
4. **Decide:** before the timer runs out he can **DIY** (picking a step sequence), **DIY + stop and call a pro** for the risky part, or **call the pro now**. If time runs out, the wife calls the pro automatically at full price.
5. **Reveal:** a cartoon cutaway shows the hidden issue, then the outcome plays (a success or a funny fail).
6. **Recap card:** the real-world takeaway in one or two sentences.

## Scoring
- **Money saved:** contractor quote minus what you actually spent. A failed DIY adds the "fix-the-fix" cost.
- **Safety:** +big for the right call on gas, structural, or water-damage jobs. Unsafe DIY attempts score a hard penalty, and **unsafe attempts never "succeed"** even if they look fine.
- **Marriage Meter (0–100):** humor stat. It goes up for listening to good clues and down for ignoring them or blowing the budget. A successful bluff earns the wife points.
- **Final title:** highest combined score earns a title like "Certified Handy," "Permit Respecter," or "Banned from Home Depot."

## Hidden issues reveal through light investigation
No jargon, just clues anyone can notice: smells, stains, soft spots, sounds, labels, how old something looks, sticky notes from the previous owner. Each scenario has 4–5 hotspots: 2 real clues, 1 red herring, and 1 flavor joke.

## Scenario cards
| # | Request | Hidden issue | Clues | Correct move | Funny fail |
|---|---|---|---|---|---|
| 1 | Patch the hole in the hallway drywall | Damp, stained drywall: a slow leak behind it | Brown ring around the hole, musty smell, water bill is up | Stop. Find and fix the leak (plumber), then DIY the patch once it's dry | Fresh patch bubbles and sags overnight, and the mushroom sprouting from it gets a name |
| 2 | New patio BBQ | The grill is natural gas only, and there's no gas line out back | Box label says "NG", the fitting doesn't match a propane tank, no gas stub on the patio | **Call a licensed pro** to run the line (permit). Or return it for the propane model | He tries duct tape and a garden hose adapter. Wife evacuates the cul-de-sac. Fire dept. hands over a pamphlet |
| 3 | Replace the old water heater | The raised platform is wood-rotted | Platform wobbles, dark soft wood, old drip stains | **Call a pro**: the platform has to be rebuilt to hold ~500 lb, and the install needs a permit (gas/venting) | New tank leans like the Tower of Pisa. Cat refuses to enter the garage |
| 4 | Swap the light for a ceiling fan | The ceiling box isn't fan-rated | Box looks small and plastic, old light was very light, the sticker doesn't say "fan" | Power off at the breaker, install a fan-rated box/brace (or hire an electrician), then hang the fan | Fan wobbles, then gently helicopters onto the couch |
| 5 | New kitchen faucet | The shutoff valve under the sink is corroded | Green crust on the valve, the handle won't turn, there's a drip under the sink | Shut the main water off first, and replace the valve (or call a plumber) before touching the faucet | Valve snaps off. Indoor fountain. Wife films it for the group chat |
| 6 | Hang the new gate on the fence | The fence post is rotted at the base | Post leans, wood crumbles at ground level, gate scrapes | Replace or set the post in concrete first (call 811 before you dig) | Gate hangs fine for 3 seconds, then the whole fence section lies down |
| 7 | Install a garbage disposal | The dishwasher drain knockout plug was never removed | Dishwasher hose connects to the disposal, sink has standing water after a test | DIY OK: power off, knock out the plug before connecting the hose, then test for leaks | Dishwasher floods the kitchen with soapy water. Foam party, nobody invited |
| 8 | Set up the backyard playset / shed kit | Ground is sloped and soft, and there's a buried sprinkler line | Puddles after rain, kit says "level ground required", sprinkler head nearby | Level and compact the base, mark lines (call 811), and anchor per instructions | Shed slides 2 ft downhill. Sprinkler geyser at the grand reveal |

**Recap examples:** "Gas lines = always a licensed pro and a permit." "Anything holding weight (platforms, posts, ceilings) has to be checked first." "Water stains mean find the leak before you patch." "Find the shutoff before you start."

## Safety rules for the content
Conservative by design. Gas work, structural fixes, and permitted installs (like water heaters) always score best when you **call a pro**. Every electrical card starts with "power off at the breaker." No step-by-step instructions for risky work. A small in-game footer says: "For fun and awareness — check local codes and hire licensed pros for gas, electrical, and structural work."

## Tech plan (MVP built: index.html, css/style.css, js/game.js, js/scenarios.js)
- **MVP:** a single `index.html` file with vanilla JS and CSS, no backend. Local **hot-seat** play: a "pass the device" screen hides the wife's secret clue from the husband. Scenarios live in a JSON array, so adding a card means adding data, not code.
- **Art:** emoji/SVG cutaways with CSS animations for reveals and fails. Generate the cover image with an AI tool.
- **Polish:** sound effects (drip, whoosh, sad trombone), a tutorial round, mobile-friendly layout, and a score summary card you can share.
- **Later (optional):** shared room via link (2 phones) using a light realtime service, plus a global leaderboard.
- **Hosting:** GitHub Pages (tylerkat89) for the working link.

| Day | Goal |
|---|---|
| 1 | Game loop, roles, timer, 3 cards |
| 2 | All 8 cards, scoring, recap screens |
| 3 | Art, sound, animations, playtest |
| 4 | Bug fixes, cover image, description, submit by Oct 30 |

## Judging fit
- **Execution:** a small scope that actually works.
- **Creativity:** asymmetric marriage comedy plus a bluff mechanic.
- **Usefulness:** real homeowner lessons about when to DIY and when to call a pro.
- **Polish:** recap cards, sound, mobile layout.
