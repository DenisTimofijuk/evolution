# Evolution simulator

This is JavaScript project inspired by youtube video [I programmed some creatures. They Evolved.](https://www.youtube.com/watch?v=N3tRFayqVtk&list=WL&index=2)

 - Self-replication
 - Blueprint
 - Inherit blueprint
 - Mutation
 - Selection

# World rules
Creature can eat at one place, but multiply on another particular place.
Crature can multiply only when he has eaten enought food.
Creatures main goal is to multiply.


Visos amebos gyvena vienoda laika
Visos amebos per gyvenima gauna pasidaugint tik 1 karta ir palieka 2 vaikus.

# Genom and Neurons

When creature is born, it has no neuron connections. The genom has all the information what neurons will be connected. One gene holds information about one connection.  
Connections can be as fallows:
 - can go straight from input neuron to output
 - can go from input neuron to inner
 - can go from inner neuron to output
 - can go from inner to another inner or the same inner
 - it also defines the how strong connection can be

## Connection wight
Input produce value between 0.0 to 1.0 depending on the current situation what is it sensing.  
Then it is multiplied with small connection value which is between -4.0 to 4.0.  
Internal neuron output = tanh(sum(inputs)) = -1.0 to 1.0.  
Output neuron = tanh(sum(inputs)) = -1.0 to 1.0.

## Action ouptu neurons
If output can have values from -1.0 to 1.0. Action neuron outoput is the probability it will fire.
Available neuron types:
 - **Responsivness**. If it outputs high values, creature will be more reactive. For example if the creature is hungry this neuron will produce high value and the creature will be more active to find the food. If the creature full, then it will produce low value and the cerature will be slow.


# VS code tips
  
Multi cursor
	- create cursor on all occurrences of a string - select string and press Ctrl+Shift+L
	- add a cursor - CTRL+Alt+UpArrow
  
Format text
	- Shift+Alt+F
  
Emmet
	- write this ul>li.item$*5 then pres Ctrl+Space then Enter

# Using snowpack

All Commands:
  
  - npm install      Install your dependencies. (We already ran this one for you!)
  - npm start        Start your development server.
  - npm run build    Build your website for production.
  - npm test         Run your tests.