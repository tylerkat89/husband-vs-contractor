// Scenario cards. Each job is a chain of steps in chronological order.
// step: {q, ok:[text, cost, note], bad:[[text, cost, marriage, safety, feedback, fatal?]], proEnd?:true, noBail?:true}
// proEnd: the right answer is to hand off to a pro. Diagnosis cuts the bill by `credit`.
window.SCENARIOS = [
{id:"drywall",em:"🕳️",title:"Patch the Hallway Hole",request:"Babe, can you get someone to patch that hole in the hallway wall? The doorknob finally won.",
 quote:650,
 hidden:"The drywall is damp. A slow pipe leak behind the wall has been soaking it.",
 secret:"Our water bill jumped $40 last month and nobody's been taking longer showers.",
 hint:"Something about that wall smells... off.",
 spots:[{l:"Around the hole",c:"A brown ring stain spreading out from the hole.",t:"real"},{l:"Sniff test",c:"Musty, basement-y smell. You don't have a basement.",t:"real"},{l:"Doorknob",c:"The doorknob looks smug. Not helpful.",t:"joke"},{l:"Paint can",c:"Leftover paint is a perfect match. Very tempting.",t:"herring"}],
 steps:[
  {q:"Tools out. What's first?",ok:["Look closely at the stain and press on the wall around the hole",0],bad:[["Cut a clean square and screw in a patch",40,-5,0,"You patched it, and the new patch is already soaking up water."],["Paint over the stain so it matches",30,-5,0,"The stain bleeds right back through by dinner."]]},
  {q:"The wall feels damp and soft. Next?",ok:["Turn off every faucet and check whether the water meter is still moving",0],bad:[["Point a fan at it and patch tomorrow",20,-5,0,"It dried overnight... and was wet again by morning."],["Smash the wall open wider with a hammer",80,-10,-5,"Big mess, and you still don't know where the water's coming from."]]},
  {q:"Everything's off, but the meter's leak dial is still spinning. Next?",ok:["Call a plumber to find and fix the leak",300,"pro part"],bad:[["Ignore it. It's a slow leak.",0,-10,-10,"Slow leaks turn into mold and rot. She can smell it now."],["Cut into the wall and solder the pipe yourself",150,-10,-10,"You've never soldered. Now there are two leaks."]],noBail:true},
  {q:"The plumber fixed the leak. Next?",ok:["Let the wall dry out completely and cut out any moldy drywall",15],bad:[["Patch over it right away. It's fine.",40,-5,-5,"Wet drywall under fresh mud means bubbles and mold."]]},
  {q:"Dry and clean. Last step?",ok:["Patch, tape, mud, sand, and paint",40],bad:[["Fill the big hole with spackle only",10,-5,0,"Spackle cracks and sinks on a hole that big. Redo."],["Hang a big framed photo over it",0,-10,0,"She knows. She always knows."]]}
 ],
 good:"You call a plumber for the leak and patch the wall yourself once it's dry. Smooth, dry, and cheap.",
 fail:"The fresh patch bubbles and sags overnight. A mushroom sprouts from it. The kids name him Gary.",
 lesson:"Water stains and musty smells mean find and fix the leak before you patch. Patching over a leak just hides mold."},

{id:"bbq",em:"🍖",title:"New Patio BBQ",request:"I bought us a fancy new grill for the patio! Can you get someone to set it up before Sunday?",
 quote:1200,credit:100,
 hidden:"It's a natural-gas-only grill, and there's no gas line out to the patio.",
 secret:"The box says \"NG\" in big letters. I don't know what that means but it looked important.",
 hint:"The fitting on the hose looked kinda weird to me.",
 spots:[{l:"The box label",c:"\"NATURAL GAS ONLY. Not for use with propane.\"",t:"real"},{l:"Patio wall",c:"No gas stub anywhere on the back of the house.",t:"real"},{l:"Old propane tank",c:"Half full! ...but the fitting doesn't match the grill.",t:"herring"},{l:"The neighbor",c:"Neighbor offers a beer and \"advice.\" Decline both.",t:"joke"}],
 steps:[
  {q:"Box is open. What's first?",ok:["Read the label and manual to see what fuel it needs",0],bad:[["Assemble everything first and figure out fuel later",0,-3,0,"Two hours in, and you still don't know what it runs on."],["Hook it to the old propane tank",0,-20,-30,"The fitting doesn't match, so you force it. Hiss. Gas leak!",true]]},
  {q:"It says \"Natural gas only.\" Next?",ok:["Check the back of the house for a gas outlet near the patio",0],bad:[["Order an adapter online so propane fits",30,-5,-15,"Adapters don't change what fuel a grill burns. That's how fires start."],["Shut off the gas meter just in case",0,-5,-5,"Now the water heater and stove are off too. Cold showers for everyone."]]},
  {q:"There's no gas line anywhere near the patio. Next?",ok:["Look up whether this model comes in a propane version, and check the return policy",0],bad:[["Run a long hose from the kitchen stove",0,-25,-40,"Indoor gas pipes are not extension cords. Evacuate.",true],["Buy a generic hose and guess",30,-5,-10,"Mismatched gas fittings leak. Don't guess with gas."]]},
  {q:"You can return it for propane, or get a gas line run. Decide:",ok:["Call a licensed plumber to run a permitted gas line, or return it for a propane model",0],bad:[["Tee into the dryer's gas line with a long flex hose",0,-25,-40,"DIY gas plumbing. The fire department would like a word.",true],["Leave it in the box until Sunday and hope",0,-10,0,"Sunday comes. Still no gas. Guests get cold sandwiches."]],proEnd:true,noBail:true}
 ],
 good:"You figured out exactly what's needed. The licensed plumber quotes it without a diagnostic visit, pulls a permit, runs the line, and leak-tests it.",
 fail:"Hiss. Your wife evacuates the cul-de-sac. The fire department leaves you a pamphlet and a look.",
 lesson:"Gas lines always mean a licensed pro and a permit. Never rig or convert gas fittings. Smell gas? Leave and call 911 or your gas company."},

{id:"heater",em:"🔥",title:"Replace the Water Heater",request:"The water heater's ancient and the shower keeps going cold. Can we get a new one put in?",
 quote:2400,
 hidden:"The raised wooden platform it sits on is rotted. A full tank weighs about 500 lb.",
 secret:"When I was getting the holiday bins down, the platform kind of... wobbled.",
 hint:"The garage has been creaking more than usual.",
 spots:[{l:"Platform wood",c:"Dark, soft wood. Your screwdriver sinks right in.",t:"real"},{l:"Floor under it",c:"Old drip stains and a little puddle.",t:"real"},{l:"Model sticker",c:"Made the year you graduated. Respect.",t:"joke"},{l:"Hardware store ad",c:"\"Install it yourself in 2 hours!\" Sure.",t:"herring"}],
 steps:[
  {q:"Before touching anything, what first?",ok:["Turn the heater's gas valve to OFF and close the cold water supply valve",0],bad:[["Start unhooking the water pipes",150,-15,-10,"No shutoff. Hot water sprays all over the garage."],["Flip the garage light breaker off",0,-3,-5,"Wrong thing. A gas heater is still on gas."]]},
  {q:"Gas and water are off. Next?",ok:["Hook a hose to the drain valve, run it outside, and drain the tank",0],bad:[["Tip the tank over to dump it",100,-10,-10,"Forty gallons of rusty water. The cat has left the chat."],["Skip draining. Just muscle it out.",80,-10,-10,"A full tank weighs about 500 lb. Your back has filed a complaint."]]},
  {q:"Tank's drained. Who disconnects the gas and vent?",ok:["Have a licensed plumber disconnect the gas line and vent and pull the old tank (permit)",400,"pro part"],bad:[["Unscrew the gas line yourself with a pipe wrench",0,-15,-25,"Gas connections are licensed-pro work. You get a stern lecture and a do-over."],["Leave the gas line hooked up and wiggle the tank out",0,-20,-35,"You bend the gas connector. Hiss. Everybody out.",true]],noBail:true},
  {q:"Old tank is out. The platform is soft and rotted. Next?",ok:["Tear it out and rebuild it solid enough for 500+ lb (or have the pro do it)",180],bad:[["Shim the old platform with scrap 2x4s",30,-10,-30,"The new tank leans like the Tower of Pisa.",true],["Set the new tank right on the old platform",0,-10,-30,"Crunch. The platform folds.",true]]},
  {q:"New platform is solid. Install time:",ok:["Licensed plumber sets the tank, connects gas and vent, adds earthquake straps, and leak-tests",1100,"pro part"],bad:[["Connect it yourself to save money",0,-15,-25,"Gas plus venting plus a permit is not a weekend project. Do-over."],["Reuse the old flex gas connector to save $20",0,-10,-20,"Old gas connectors can crack. Pros install new ones. Do-over."]],noBail:true},
  {q:"Installed. Turning it back on:",ok:["Fill the tank with water first (open a hot faucet until it runs steady), then light it per the instructions",0],bad:[["Light it right away, then fill it",300,-10,-10,"Firing an empty tank cooks it. New tank, new problem."]]}
 ],
 good:"You did the safe, easy parts yourself (shutoffs, draining, rebuilding the platform) and paid a pro for the gas work. Hot showers are back.",
 fail:"Crunch. The new tank leans like the Tower of Pisa. The cat refuses to enter the garage ever again.",
 lesson:"Shut off gas and water first. Anything holding a lot of weight has to be solid. Gas and venting connections, plus the permit, belong to a licensed plumber."},

{id:"fan",em:"🌀",title:"Ceiling Fan Swap",request:"The bedroom is SO hot. Can someone swap that old light for a ceiling fan?",
 quote:350,
 hidden:"The ceiling box is a light-only plastic box. It can't hold a spinning fan.",
 secret:"The old light was super light. Like, I lifted it with one finger.",
 hint:"I bet that ceiling box is older than us.",
 spots:[{l:"Ceiling box",c:"Small plastic box. No \"rated for fan support\" marking.",t:"real"},{l:"Fan box",c:"Instructions: \"Mount only to a fan-rated box.\"",t:"real"},{l:"Wall switch",c:"Works great. Also has a sticker of a dinosaur.",t:"joke"},{l:"Wire colors",c:"They look normal, which feels like the whole story. It isn't.",t:"herring"}],
 steps:[
  {q:"Ladder's set up. First?",ok:["Turn off that circuit's breaker at the panel",0],bad:[["Just flip the wall switch off",0,-5,-15,"Zap! Switches don't always kill every wire. Go to the breaker."],["Leave the power on so you can see",0,-20,-35,"Live wires and a ladder. Ambulance chase.",true]]},
  {q:"Breaker's off. Next?",ok:["Check the wires with a non-contact voltage tester",0],bad:[["Touch the wires quickly to check",0,-20,-35,"Never test wires with your fingers.",true],["Trust the breaker label",0,-3,-10,"The label was wrong. Lucky you hesitated."]]},
  {q:"Confirmed dead. Old light is down. Next?",ok:["Check whether the ceiling box is rated for fan support",0],bad:[["Hang the fan right away",0,-5,-10,"It wobbles hard. Something's not right up there."]]},
  {q:"The box is plastic, light-only. Next?",ok:["Install a fan-rated brace box between the joists",45],bad:[["Add more screws to the plastic box",5,-10,-30,"The fan helicopters onto the bed.",true],["Hang it anyway and hope",0,-10,-30,"Wobble... wobble... THUD.",true]]},
  {q:"Fan-rated box is in. Next?",ok:["Wire the fan per its instructions with wire nuts and hang it",15],bad:[["Twist the wires together and tape them",0,-5,-15,"Taped connections come loose and get hot. Redo it with wire nuts."]]},
  {q:"Last step?",ok:["Breaker back on, test every speed, check for wobble",0],bad:[["Crank it to high and walk away",0,-3,0,"It hums a little. You should've tested it first."]]}
 ],
 good:"Breaker off, fan-rated brace in, fan hung. It spins quietly with zero wobble. Cool breeze, cooler husband.",
 fail:"The fan wobbles, then gently helicopters onto the bed. Nobody was hurt except your pride.",
 lesson:"Fans need a fan-rated box. Always turn the breaker off and test that the power is off first. Not sure? Call an electrician."},

{id:"faucet",em:"🚰",title:"New Kitchen Faucet",request:"I found the PERFECT faucet online. Can we have a plumber put it in?",
 quote:450,
 hidden:"The shutoff valve under the sink is corroded and stuck. It could snap off.",
 secret:"There's green crusty stuff on the pipes under the sink. I just closed the cabinet.",
 hint:"Under the sink has been a little... damp?",
 spots:[{l:"Shutoff valve",c:"Green crust. The handle won't budge by hand.",t:"real"},{l:"Cabinet floor",c:"A slow drip has warped the cabinet bottom.",t:"real"},{l:"Old faucet",c:"Hard water has given it a lovely beard.",t:"joke"},{l:"Pliers",c:"\"Just crank the valve harder,\" say the pliers.",t:"herring"}],
 steps:[
  {q:"Under the sink. First?",ok:["Clear out the cabinet and look at the shutoff valves",0],bad:[["Start unscrewing the old faucet",150,-15,-5,"The water was still on. Indoor fountain!"]]},
  {q:"The shutoff is crusty and won't turn by hand. Next?",ok:["Find the home's main water shutoff and close it",0],bad:[["Crank the valve with big pliers",200,-15,-5,"The valve snaps off. Geyser. She's filming."]]},
  {q:"Main is off. Next?",ok:["Open the kitchen faucet to drain the lines and relieve pressure",0],bad:[["Cut the supply lines right away",30,-5,0,"Pipe water splashes in your face. Minor, but rude."]]},
  {q:"Lines are drained. Next?",ok:["Replace the corroded shutoff valves",25],bad:[["Leave the old valves. They're probably fine.",0,-5,-5,"Next time something leaks, you won't be able to shut it off."]]},
  {q:"New valves are in. Next?",ok:["Remove the old faucet and install the new one per the instructions",15],bad:[["Install the new faucet over the old gasket gunk",20,-5,0,"Drip, drip. Clean the surface and redo it."]]},
  {q:"Last step?",ok:["Turn the main back on slowly and check every connection for leaks",0],bad:[["Turn the main on and leave for work",120,-10,0,"A tiny drip all day. Hello, warped cabinet."]]}
 ],
 good:"Main off, new valves in, faucet installed, leak-checked. The sink looks magazine-ready.",
 fail:"The valve snaps off. Indoor fountain! Your wife films it for the group chat.",
 lesson:"Know where your main shutoff is before any plumbing job. Replace corroded valves first. If anything feels stuck, don't force it."},

{id:"gate",em:"🚪",title:"Hang the New Gate",request:"Can we get the side gate replaced? The dog keeps escaping to visit the neighbors.",
 quote:600,
 hidden:"The fence post the gate hangs on is rotted at ground level.",
 secret:"The post kinda leans. I've been blaming the dog.",
 hint:"That whole fence line looks tired.",
 spots:[{l:"Post base",c:"The wood crumbles where it meets the dirt.",t:"real"},{l:"Push test",c:"The post rocks back and forth like a loose tooth.",t:"real"},{l:"The dog",c:"Looks guilty. Is innocent (this time).",t:"joke"},{l:"New hinges",c:"Shiny and strong. Problem solved? Nope.",t:"herring"}],
 steps:[
  {q:"New gate's here. First?",ok:["Push on the hinge post and check its base for rot",0],bad:[["Screw the new hinges into the old post",30,-10,-20,"The gate hangs for 3 seconds. Then the fence lies down.",true]]},
  {q:"The post is rotted at the ground. Before digging?",ok:["Call 811 (free) to get underground utilities marked",0],bad:[["Start digging right away",150,-10,-20,"Your shovel finds the sprinkler line. Could've been worse. Much worse."]]},
  {q:"Lines are marked, all clear. Next?",ok:["Dig out the old post and its old concrete",0],bad:[["Sink a new post right beside the rotten one",40,-5,0,"Now the gate doesn't line up with anything."]]},
  {q:"Hole's clear. Next?",ok:["Set a new post in concrete, plumb it, and let it cure",60],bad:[["Backfill with loose dirt",20,-5,-5,"It leans again within a week."],["Hang the gate the same day",20,-5,0,"The concrete wasn't set. Now the post is crooked forever."]]},
  {q:"Post is cured. Last step?",ok:["Hang the gate, then adjust the hinges and latch",30],bad:[["Hang it and skip the latch",0,-10,0,"The dog escapes again. Then she does."]]}
 ],
 good:"You call 811, set a new post in concrete, and hang the gate. It swings like butter. The dog is grounded.",
 fail:"The gate hangs fine for 3 seconds. Then the whole fence section lies down for a nap.",
 lesson:"Hardware is only as strong as what it's attached to. Call 811 before you dig so you don't hit buried lines."},

{id:"disposal",em:"🗑️",title:"Garbage Disposal Install",request:"I want a garbage disposal. Can we get someone out to install one?",
 quote:400,
 hidden:"The new disposal's dishwasher knockout plug was never removed.",
 secret:"The dishwasher hose goes right into where the disposal will be.",
 hint:"Read the tiny manual. Just trust me.",
 spots:[{l:"Disposal inlet",c:"A plastic plug blocks the dishwasher inlet.",t:"real"},{l:"Manual p.4",c:"\"Remove knockout plug if connecting a dishwasher.\"",t:"real"},{l:"The sink",c:"Has seen things. Mostly spaghetti.",t:"joke"},{l:"Plumber's putty",c:"You'll need it, but that's not the catch.",t:"herring"}],
 steps:[
  {q:"Box is open. First?",ok:["Make sure the outlet or circuit under the sink is OFF (unplug, or flip the breaker)",0],bad:[["Start working with everything powered",0,-15,-25,"Electricity plus water plus a blender. No.",true]]},
  {q:"Power's off. Next?",ok:["Disconnect the old sink drain and remove the old strainer",0],bad:[["Mount the disposal under the old strainer",20,-5,0,"Doesn't fit. Take it all apart again."]]},
  {q:"Drain is open. Next?",ok:["Install the new sink flange with putty and the mounting ring",0],bad:[["Hang the disposal with zip ties",30,-10,-5,"It vibrates loose and drips. Nope."]]},
  {q:"Mount's ready. Before hooking up the dishwasher?",ok:["Knock out the dishwasher inlet plug and remove the loose piece",0],bad:[["Connect the dishwasher hose as-is",80,-15,0,"The dishwasher can't drain. Soapy flood."]]},
  {q:"Plug's out. Next?",ok:["Hang the disposal, then connect the drain pipe and dishwasher hose",0],bad:[["Run the dishwasher to test before connecting the drain",100,-15,0,"Water everywhere. Foam party, and nobody was invited."]]},
  {q:"Last step?",ok:["Restore power, run water, and check every joint for leaks",0],bad:[["Test it with a spoon inside",50,-10,-10,"Ka-CHUNK. RIP spoon. Never put your hand or utensils in there."]]}
 ],
 good:"Power off, plug knocked out, everything connected and leak-tested. It works perfectly. You are a kitchen god.",
 fail:"The dishwasher floods the kitchen with soapy water. Foam party, and nobody was invited.",
 lesson:"Read the manual and do the small steps. Kill the power before working on anything electrical, and leak-test before you walk away."},

{id:"shed",em:"🛖",title:"Backyard Shed Kit",request:"Can we pay someone to put together that shed kit? It's been in the garage for 6 months.",
 quote:900,
 hidden:"The spot is sloped and soft, and a sprinkler line is buried right there.",
 secret:"That corner turns into a pond every time it rains.",
 hint:"The lawn guy said not to dig there. Or was it 'dig there'? Hmm.",
 spots:[{l:"Ground",c:"Squishy and slopes downhill. Puddle marks.",t:"real"},{l:"Sprinkler head",c:"Right in the middle of the shed footprint.",t:"real"},{l:"Kit box",c:"\"Level ground required.\" Also 400 screws.",t:"herring"},{l:"Squirrel",c:"Has claimed this land. Will fight.",t:"joke"}],
 steps:[
  {q:"Shed day. First?",ok:["Check the spot: is it level, firm, and well-drained?",0],bad:[["Build it right on the grass",60,-10,-10,"The shed slides 2 feet downhill.",true]]},
  {q:"It's soft and sloped. Before digging?",ok:["Call 811 and find the sprinkler lines",0],bad:[["Start digging the base",80,-5,-10,"Sprinkler geyser! Also, you got lucky it wasn't a power line."]]},
  {q:"Lines are marked. Next?",ok:["Lay a compacted, level gravel base (or blocks) away from the lines",120],bad:[["Toss down some plywood to level it",40,-5,-5,"The plywood rots in one season."]]},
  {q:"Base is level. Next?",ok:["Build the floor frame and check it's level and square",0],bad:[["Start with the walls to see progress",30,-5,0,"Nothing lines up. Take it apart."]]},
  {q:"Floor is square. Next?",ok:["Put up the walls and roof per the instructions",0],bad:[["Skip the roof bracing pieces",40,-5,-10,"The first windy day says no."]]},
  {q:"Last step?",ok:["Anchor the shed to the base so wind can't move it",20],bad:[["Skip the anchors. It's heavy.",80,-10,-10,"A windstorm moves it to the neighbor's yard."]]}
 ],
 good:"You level the base, avoid the sprinkler line, and anchor the shed. It's rock solid. The squirrel concedes.",
 fail:"The shed slides 2 feet downhill. A sprinkler geyser erupts at the grand reveal.",
 lesson:"A level, solid base comes first. Know what's buried before you dig or anchor."},

{id:"ac",em:"🥵",title:"The AC Won't Cool",request:"It's 98° and the house is an oven! The AC isn't working. Call someone NOW.",
 quote:450,credit:120,
 hidden:"The outdoor unit (condenser) keeps tripping its breaker. That points to an electrical or part failure inside, which is HVAC-tech work.",
 secret:"I heard a loud click outside and then the fan outside stopped.",
 hint:"Have you even looked at the thermostat?",
 spots:[{l:"Thermostat",c:"Set to Cool at 72°. Air is blowing inside, but it's warm.",t:"real"},{l:"Outdoor unit",c:"Dead silent. Not humming, not spinning.",t:"real"},{l:"Air filter",c:"A little dusty. Not the main villain today.",t:"herring"},{l:"The dog",c:"Lying on the tile. Judging you.",t:"joke"}],
 steps:[
  {q:"House is hot. First?",ok:["Check the thermostat: set to Cool, temp below room temp, batteries good",0],bad:[["Buy a new thermostat",60,-5,0,"The new thermostat says the same thing: the inside fan runs, but the air is warm."],["Buy a refrigerant can from the auto store",50,-10,-15,"Home AC refrigerant work takes EPA certification. That can's for cars."]]},
  {q:"The indoor fan blows, but the air is warm. Next?",ok:["Go outside and see if the condenser is running",0],bad:[["Replace the air filter and wait an hour",15,-5,0,"Clean filter, still warm air. Good habit, wrong problem."],["Turn the thermostat down to 60",0,-5,0,"Colder setting, same warm air. Plus a higher bill."]]},
  {q:"The condenser is silent. Next?",ok:["Check the breaker panel for a tripped AC breaker",0],bad:[["Pop the condenser panel and poke the capacitor",0,-20,-40,"High voltage and stored charge inside. Hospital trip.",true],["Hose it down to cool it off",0,-5,0,"Wet but still silent."]]},
  {q:"The AC breaker is tripped. Next?",ok:["Reset it once, firmly, and watch",0],bad:[["Flip it on and off a bunch of times",0,-5,-20,"Hammering a tripping breaker can damage parts. Once is the limit."]]},
  {q:"It trips again a few minutes later. Next?",ok:["Leave it off and call an HVAC tech. Tell them exactly what you found.",0],bad:[["Put in a bigger breaker so it stops tripping",0,-25,-45,"The breaker was protecting the wires. Now they get hot instead. Fire risk!",true],["Keep resetting it until it stays on",0,-10,-25,"Burning smell. Stop!"]],proEnd:true,noBail:true}
 ],
 good:"Your diagnosis saved the tech time: thermostat fine, indoor fan fine, condenser tripping its breaker. They head straight to the outdoor unit, and the bill drops.",
 fail:"Smoke curls out of the condenser. Now it's an emergency weekend call at double the rate.",
 lesson:"Check the simple stuff (thermostat settings, breaker). Reset a tripped breaker ONCE. If it trips again, something's wrong: leave it off and call a pro."}
];
