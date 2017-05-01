# Strain Widget

Strain is a measured quantity and is due to a change in shape because of  a load. Normal strain occurs when there is deformation in the direction of the force. 

In this activity you will change the angle 𝜽 (theta) and observe:

	* the changes to the strain of a wire (BD). 
	
	* two methods of calculating strain.


## What will you get?

The strain widget shows a system that contains a rope attached on one side to a holder and the other one to a bar, which is also attached to another holder.
The bar lays horizontally and can rotate from 0 degrees to 25 anticlockwise. Depending on the rotation angle the strain on the rope changes as it is seen in the simulation.
The strain value is calculated in two different ways and they both are shown below the simulation.


## Download and install

To run the widget you should either:
	
	* Clone the project: git clone https://github.com/stiagoflorez/strain_widget.git

	* Download the project.

Once it is done, in your cmd you should go to the project folder and install it.
	
	* npm install

The installation will also download the external libraries using [Bower](https://www.npmjs.com/package/bower).

Finally, you should start the web server and go to http://localhost:3000/ in your browser.

	* npm start


## Architecture

The website was created using [ExpressJS](http://expressjs.com/es/) and runs on the port 3000. Express will work as the web server and routing handler, whereas I use Html, javascript, and CSS for the view.

[Bower](https://www.npmjs.com/package/bower) was used as a package manager and all the external libraries could be found within the folder bower_modules.

The core of the application is Konva JS, a 2d html5 canvas library ready to use shapes and animations. In addition, Polymer was also used to create the widget as a custom web component "strain-widget".

The main files of the app could be found under the folder app:

	* index.html : The whole view of the widget.
	
	* widget/strain_widget.html : Custom web component created using Polymer. Contains the canvas and the slider for the widget.

	* js/rope_mechanism.js : Has the logic for the whole application, runs the simulation and calculates the strain values.


## Technologies

* [Konva](https://konvajs.github.io/)
* [JQuery](https://jquery.com/)
* [ExpressJS](http://expressjs.com/es/)
* [Polymer](https://www.polymer-project.org/)


## Thank you!

We really appreciate all kinds of feedback and contributions.

