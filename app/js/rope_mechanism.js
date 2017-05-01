var ropeMechanism = {};

ropeMechanism.theta                     =   0;      //  Bar rotation angle.
ropeMechanism.lastTheta                 =   0;      //  Last rotation angle. 
ropeMechanism.angleDiff                 =   0.5;    //  Angular speed used for the animation.

ropeMechanism.scale                     =   2;
ropeMechanism.verticalHolderWidth       =   Math.floor(188/ropeMechanism.scale) ;
ropeMechanism.verticalHolderHeight      =   Math.floor(113/ropeMechanism.scale) ;

ropeMechanism.horizontalHolderWidth     =   Math.floor(113/ropeMechanism.scale) ;
ropeMechanism.horizontalHolderHeight    =   Math.floor(188/ropeMechanism.scale) ;

ropeMechanism.ropeWidth                 =   Math.floor(15/ropeMechanism.scale) ;
ropeMechanism.ropeHeight                =   Math.floor(385/ropeMechanism.scale) ;

ropeMechanism.barWidth                  =   Math.floor(906 / ropeMechanism.scale) ;
ropeMechanism.barHeight                 =   34 ;

ropeMechanism.verticalMargin            =   25;
ropeMechanism.horizontalMargin          =   28;

/* Inits the whole system drawing holders, the bar and the rope. In addition creates the animation. */

ropeMechanism.initMechanism = function(width, height){
	
    var stage = new Konva.Stage({
        container: 'canvas',
        width: width,
        height: height
    });

    var layer = new Konva.Layer();

    ropeMechanism.drawVerticalHolder(stage,layer);
    ropeMechanism.drawBar(stage, layer);
    ropeMechanism.drawHorizontalHolder(stage,layer);
    ropeMechanism.drawRope(stage, layer);
    ropeMechanism.drawInformation(stage, layer);
    ropeMechanism.createAnimation(layer);  
}

/* Draws the holder where the rope is attached to.*/

ropeMechanism.drawVerticalHolder = function(stage, layer) {
    
    var x = ropeMechanism.horizontalMargin*10 - ropeMechanism.verticalHolderWidth/2;
    var y = ropeMechanism.verticalMargin;
    
    var imageObj = new Image();
    imageObj.onload = function() {
        var verticalHolder = new Konva.Image({
            x: x,
            y: y,
            image: imageObj,
            width: ropeMechanism.verticalHolderWidth,
            height: ropeMechanism.verticalHolderHeight
        });
        
        layer.add(verticalHolder);
        stage.add(layer);
    };
    imageObj.src = 'img/vertical_holder.png';
}

/* Draws the holder where the bar is attached to.*/

ropeMechanism.drawHorizontalHolder  =  function(stage, layer) {
    
    var x = ropeMechanism.horizontalMargin + ropeMechanism.barWidth + ropeMechanism.horizontalHolderWidth/4;
    var y = ropeMechanism.verticalMargin + ropeMechanism.ropeHeight;

    var imageObj = new Image();
    imageObj.onload = function() {
        var horizontalHolder = new Konva.Image({
            x: x,
            y: y,
            image: imageObj,
            width: ropeMechanism.horizontalHolderWidth,
            height: ropeMechanism.horizontalHolderHeight
        });
        layer.add(horizontalHolder);
        stage.add(layer);
    };
    imageObj.src = 'img/horizontal_holder.png';
}

/* Draws the horizontal bar.*/

ropeMechanism.drawBar = function(stage, layer){
    
    var x = ropeMechanism.horizontalMargin + ropeMechanism.barWidth + ropeMechanism.verticalHolderWidth/2.5;
    var y = ropeMechanism.verticalMargin + ropeMechanism.verticalHolderHeight + ropeMechanism.ropeHeight;
    
    var group = new Konva.Group({
            x: x,
            y: y,
            rotation: 0
        });
    var circle = new Konva.Circle({
            x: 0,
            y: 0,
            radius: 1,
            fill: 'red',
            stroke: 'black',
            strokeWidth: 4
        });

    var imageObj = new Image();
    imageObj.onload = function() {
        ropeMechanism.bar = new Konva.Image({
            x: 0,
            y: 0,
            image: imageObj,
            width: ropeMechanism.barWidth,
            height: ropeMechanism.barHeight,
            offset: {
                x: ropeMechanism.barWidth,
                y: ropeMechanism.barHeight/1.4 
            }
        });

        group.add(ropeMechanism.bar);
        //group.add(circle);
        layer.add(group);
        stage.add(layer);
    };
    imageObj.src = 'img/bar.png';
}

/* Draws the rope.*/

ropeMechanism.drawRope = function(stage, layer) {
    
    var x = ropeMechanism.horizontalMargin*10;
    var y = ropeMechanism.verticalMargin + ropeMechanism.verticalHolderHeight / 1.3 ;
	
    var imageObj = new Image();
    imageObj.onload = function() {
        ropeMechanism.rope = new Konva.Image({
        	x: x,
        	y: y,
        	image: imageObj,
        	width: ropeMechanism.ropeWidth ,
        	height: ropeMechanism.ropeHeight
      	});
      	layer.add(ropeMechanism.rope);
        stage.add(layer);
    };
    imageObj.src = 'img/rope.png';
}

/*  Gets the values of the selected angle and calculates the number of times the animation is going to run.
    LenghtDelta indicates how much the rope's length changed. 
*/

ropeMechanism.rotateBar = function(value) {

    ropeMechanism.theta         = parseInt(value);
    var lengthDelta,
    thetaAbs                    = Math.abs( ropeMechanism.theta - ropeMechanism.lastTheta);
    ropeMechanism.steps         = Math.floor( thetaAbs / ropeMechanism.angleDiff );
    
    //var lengthDelta             = (ropeMechanism.calculateLengthDelta(1)* (ropeMechanism.ropeHeight) / 300) - ropeMechanism.ropeHeight;
    //ropeMechanism.lengthDelta   = lengthDelta * Math.abs( ropeMechanism.theta - ropeMechanism.lastTheta) / ropeMechanism.steps ;

    if(ropeMechanism.theta >= ropeMechanism.lastTheta){
        lengthDelta = (ropeMechanism.calculateLengthDelta(ropeMechanism.theta) * (ropeMechanism.ropeHeight) / 300) - ropeMechanism.rope.height();
    }else{
        lengthDelta = ropeMechanism.rope.height() - ( (ropeMechanism.calculateLengthDelta(ropeMechanism.theta) * (ropeMechanism.ropeHeight) / 300) );
    }

    ropeMechanism.lengthDelta   = lengthDelta / ropeMechanism.steps ;
    ropeMechanism.rotationAnimation.start();
    ropeMechanism.updateDisplayValues();
}

/* Rotates the bar depending on the angle selected on the slider. In Addition,
   increases or decreases the height of the rope. 
*/

ropeMechanism.animateBarAndRope = function(){
    var height, angle;
    if(ropeMechanism.theta >= ropeMechanism.lastTheta) {
        ropeMechanism.bar.rotate(-ropeMechanism.angleDiff);
        if(ropeMechanism.bar.getRotation() == -ropeMechanism.theta){
            ropeMechanism.rotationAnimation.stop();
            ropeMechanism.lastTheta = ropeMechanism.theta;
        }
        height = ropeMechanism.rope.height() +  ropeMechanism.lengthDelta;
        angle  = ropeMechanism.arc.angle() - ropeMechanism.angleDiff;

    }else{
        ropeMechanism.bar.rotate(ropeMechanism.angleDiff);
        if(ropeMechanism.bar.getRotation() == -ropeMechanism.theta){
            ropeMechanism.rotationAnimation.stop();
            ropeMechanism.lastTheta = ropeMechanism.theta;
        }
        height = ropeMechanism.rope.height() -  ropeMechanism.lengthDelta; 
        angle  = ropeMechanism.arc.angle() + ropeMechanism.angleDiff;      
    }
    ropeMechanism.arc.angle(angle);
    ropeMechanism.rope.height(height);
}

/* Creates the animation for the mechanism. */

ropeMechanism.createAnimation = function(layer) {
    ropeMechanism.rotationAnimation = new Konva.Animation(function(frame) {
        ropeMechanism.animateBarAndRope();
    }, layer);
}   

/* Calculates the delta (Amount of change) of the rope */

ropeMechanism.calculateLengthDelta = function(theta) {
    var lengthRope  = 300;
    var lengthBar   = 400;
    var lad         = Math.sqrt(Math.pow(lengthRope, 2) + Math.pow(lengthBar, 2));
    var alpha       = Math.degrees(Math.atan(lengthBar/lengthRope));
    var phi         = 90 - alpha + theta;
    var delta       = Math.sqrt(Math.pow(lad, 2) + Math.pow(lengthBar, 2) - 2*(lad*lengthBar*Math.cos(Math.radians(phi))));
    ropeMechanism.strainSolutionOne = (delta - lengthRope)/lengthRope;
    ropeMechanism.strainSolutionTwo =  Math.radians(theta)*lengthBar/lengthRope;
    return delta.toFixed(5);
}

/* Draws diagram's information */

ropeMechanism.drawInformation = function(stage,layer) {
    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var x1 = ropeMechanism.horizontalMargin*10;
    var y1 = ropeMechanism.verticalMargin + ropeMechanism.verticalHolderHeight / 1.3;
    var x2 = ropeMechanism.horizontalMargin*20;
    var y2 = ropeMechanism.verticalMargin + ropeMechanism.verticalHolderHeight / 1.3
    var x3 = ropeMechanism.horizontalMargin + ropeMechanism.barWidth + ropeMechanism.horizontalHolderWidth/4;
    var y3 = ropeMechanism.verticalMargin + ropeMechanism.ropeHeight + ropeMechanism.verticalHolderHeight;
    
    group.add(ropeMechanism.drawDiagramLines(x1, y1, x2, y2, x3, y3));
    group.add(ropeMechanism.drawAccotationLines(x1, y1, x2, y2, x3, y3));
    group.add(ropeMechanism.drawForceArrow(x1, y1, x2, y2, x3, y3));
    group.add(ropeMechanism.drawLabels(x1, y1, x2, y2, x3, y3));
    group.add(ropeMechanism.drawAngleArc(x1, y1, x2, y2, x3, y3));
    group.add(ropeMechanism.drawSolutionOne(y3));
    group.add(ropeMechanism.drawSolutionTwo(y3));
    group.add(ropeMechanism.drawPercentageChange(y3 + 60));
    group.add(ropeMechanism.drawThetaValue(x3,y3));


    layer.add(group);
    stage.add(layer);
}

ropeMechanism.drawDiagramLines = function(x1, y1, x2, y2, x3, y3) {

    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var barLengthLine = new Konva.Line({
        points: [x1, y1, x2, y2],
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var ladLine = new Konva.Line({
        points: [x1, y1, x3, y3],
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
        dash: [3, 3]
    });

    var ropeHeightLine = new Konva.Line({
        points: [x3, 0, x3, y3],
        stroke: 'grey',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var accotationLine = new Konva.Line({
        points: [x1, 0, x1, ropeMechanism.verticalMargin],
        stroke: 'grey',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var barLine = new Konva.Line({
        points: [x1 - 20, y3, x2, y3],
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var rect = new Konva.Rect({
        x: x3 - 10,
        y: y2,
        width: 10,
        height: 10,
        stroke: 'grey',
        strokeWidth: 1
    });

    group.add(rect);
    group.add(barLengthLine);
    group.add(accotationLine);
    group.add(ladLine);
    group.add(ropeHeightLine);
    group.add(barLine);

    return group;
}

ropeMechanism.drawAngleArc = function(x1, y1, x2, y2, x3, y3) {
    ropeMechanism.arc = new Konva.Arc({
        x: x3,
        y: y3,
        outerRadius: 80,
        angle: 270,
        stroke: 'black',
        strokeWidth: 1,
        rotation: -90
    });
    ropeMechanism.arc.clockwise(true);
    return ropeMechanism.arc;
}

ropeMechanism.drawLabels = function(x1, y1, x2, y2, x3, y3) {
    
    var labelGroup = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var barLength = new Konva.Text({
        x: x1 + 70,
        y: y1/8,
        text: '400 mm',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var ropeLength = new Konva.Text({
        x: x3 + 11,
        y: y3/2,
        text: '300 mm',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var p = new Konva.Text({
        x: x1 - 45,
        y: y3/2,
        text: 'P',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var b = new Konva.Text({
        x: x1 - 25,
        y: y3 - 50,
        text: 'B',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var d = new Konva.Text({
        x: x1 - 25,
        y: y1,
        text: 'D',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var a = new Konva.Text({
        x: x3,
        y: y3 + 10,
        text: 'A',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var alpha = new Konva.Text({
        x: x3 - 50,
        y: y3/1.7,
        text: 'α',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var phi = new Konva.Text({
        x: x3 - 100,
        y: y3/1.3,
        text: 'ϕ',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    var theta = new Konva.Text({
        x: x3 - 110,
        y: y3,
        text: 'Θ',
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'black'
    });

    labelGroup.add(ropeLength);
    labelGroup.add(barLength);
    labelGroup.add(p);
    labelGroup.add(b);
    labelGroup.add(d);
    labelGroup.add(a);
    labelGroup.add(alpha);
    labelGroup.add(phi);
    labelGroup.add(theta);

    return labelGroup;
}

ropeMechanism.drawForceArrow = function(x1, y1, x2, y2, x3, y3){

    var arrowGroup = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var forceLine = new Konva.Line({
        points: [x1 - 40, y3 - 100 , x1 - 40, y3 - 20],
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var forceArrow = new Konva.RegularPolygon({
        x: x1 -40,
        y: y3 - 20,
        sides: 3,
        radius: 3,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4,
        rotation: 60
    });

    arrowGroup.add(forceLine);
    arrowGroup.add(forceArrow);
    return arrowGroup;
}

ropeMechanism.drawAccotationLines = function(x1, y1, x2, y2, x3, y3){
    
    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var ropeLengthAccotationTop = new Konva.Line({
        points: [x2 - 5, y2 , x2 - 5, y3/2 - 10],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var ropeLengthAccotationBottom = new Konva.Line({
        points: [x2 - 5, y3/2 + 30, x2 - 5, y3],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var barLengthAccotationLeft = new Konva.Line({
        points: [x1, y1/3 , x1 + 60, y1/3],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var barLengthAccotationRight = new Konva.Line({
        points: [x3 - 50, y1/3 , x3, y1/3],
        stroke: 'black',
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    group.add(barLengthAccotationLeft);
    group.add(barLengthAccotationRight);
    group.add(ropeLengthAccotationTop);
    group.add(ropeLengthAccotationBottom);

    return group;
}

ropeMechanism.drawSolutionOne = function(y3) {
    
    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var solutionOneTitle = new Konva.Text({
        x: ropeMechanism.horizontalMargin*2.5,
        y: y3 + y3/1.2,
        text: "SOLUTION ONE:",
        fontSize: 20,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var solutionOneText = new Konva.Text({
        x: ropeMechanism.horizontalMargin*1.5,
        y: y3 + y3/1.08,
        text: "Based on exact change in geometry.",
        fontSize: 12,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    var solutionOneSubTitle = new Konva.Text({
        x: ropeMechanism.horizontalMargin*3.5,
        y: y3 + y3/1.01,
        text: "Normal Strain",
        fontSize: 13,
        fontFamily: 'Roboto',
        fill: 'Red',
        padding: 20,
        align: 'center'
    });

    ropeMechanism.solutionOneValue = new Konva.Text({
        x: ropeMechanism.horizontalMargin*5,
        y: 2*y3 + 25,
        text: "0.00000",
        fontSize: 12,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var epsilon = new Konva.Text({
        x: ropeMechanism.horizontalMargin*3,
        y: 2*y3 + 11,
        text: "ε",
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    var bd = new Konva.Text({
        x: ropeMechanism.horizontalMargin*3.5,
        y: 2*y3 + 25,
        text: "BD = ",
        fontSize: 14,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    var solutionBox = new Konva.Rect({
        x: ropeMechanism.horizontalMargin*5.5,
        y: 2*y3 + 40,
        stroke: 'Black',
        width: 80,
        height: 20,
    });

    group.add(solutionOneTitle);
    group.add(solutionOneText);
    group.add(solutionOneSubTitle);
    group.add(solutionBox);
    group.add(ropeMechanism.solutionOneValue);
    group.add(epsilon);
    group.add(bd);
    return group;
}

ropeMechanism.drawSolutionTwo = function(positionY) {
    
    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var margin = 340;

    var solutionTwoTitle = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*2.5,
        y: positionY + positionY/1.2,
        text: "SOLUTION TWO:",
        fontSize: 20,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var solutionTwoText = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*1.5,
        y: positionY + positionY/1.08,
        text: "Based on small strain aproximation.",
        fontSize: 12,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    var solutionTwoSubTitle = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*3.5,
        y: positionY + positionY/1.01,
        text: "Normal Strain",
        fontSize: 13,
        fontFamily: 'Roboto',
        fill: 'Red',
        padding: 20,
        align: 'center'
    });

    ropeMechanism.solutionTwoValue = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*5,
        y: 2*positionY + 25,
        text: "0.00000",
        fontSize: 12,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var epsilon = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*3,
        y: 2*positionY + 11,
        text: "ε",
        fontSize: 25,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    var bd = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*3.5,
        y: 2*positionY + 25,
        text: "BD = ",
        fontSize: 14,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    var solutionBox = new Konva.Rect({
        x: margin + ropeMechanism.horizontalMargin*5.5,
        y: 2*positionY + 40,
        stroke: 'Black',
        width: 80,
        height: 20,
    });

    group.add(solutionTwoTitle);
    group.add(solutionTwoText);
    group.add(solutionTwoSubTitle);
    group.add(solutionBox);
    group.add(ropeMechanism.solutionTwoValue);
    group.add(epsilon);
    group.add(bd);
    return group;
}

ropeMechanism.drawPercentageChange = function(positionY) {
    
    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    var margin = 150;

    var title = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*2.5,
        y: positionY + positionY/1.2,
        text: "PERCENTAGE CHANGE",
        fontSize: 20,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var text = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*3.2,
        y: positionY + positionY/1.08,
        text: 'between SOLUTION ONE and\n SOLUTION TWO.',
        fontSize: 13,
        fontFamily: 'Roboto',
        fill: 'Black',
        padding: 20,
        align: 'center'
    });

    ropeMechanism.percentageChangeValue = new Konva.Text({
        x: margin + ropeMechanism.horizontalMargin*5,
        y: 2*positionY + 20,
        text: "0.00000",
        fontSize: 12,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var solutionBox = new Konva.Rect({
        x: margin + ropeMechanism.horizontalMargin*5.5,
        y: 2*positionY + 35,
        stroke: 'Black',
        width: 70,
        height: 20,
    });

    group.add(title);
    group.add(text);
    group.add(solutionBox);
    group.add(ropeMechanism.percentageChangeValue);
    return group;
}

ropeMechanism.drawThetaValue = function(x,y){
    var group = new Konva.Group({
            x: 0,
            y: 0,
            rotation: 0
        });

    ropeMechanism.thetaTextValue = new Konva.Text({
        x: x - 140,
        y: y + 10,
        text: "0.00000",
        fontSize: 12,
        fontFamily: 'Roboto',
        fill: 'Blue',
        padding: 20,
        align: 'center'
    });

    var solutionBox = new Konva.Rect({
        x: x - 138,
        y: y + 25,
        stroke: 'Black',
        width: 70,
        height: 20,
    });

    group.add(solutionBox);
    group.add(ropeMechanism.thetaTextValue);
    return group;
}

/********************************************************************************************/

ropeMechanism.updateDisplayValues = function(){
    var percentageChange    = (ropeMechanism.strainSolutionOne !== 0 && ropeMechanism.strainSolutionTwo !==0 )? 100 - (100*ropeMechanism.strainSolutionOne/ropeMechanism.strainSolutionTwo) : 0;
    ropeMechanism.solutionOneValue.text(ropeMechanism.strainSolutionOne.toFixed(5));
    ropeMechanism.solutionTwoValue.text(ropeMechanism.strainSolutionTwo.toFixed(5));
    ropeMechanism.percentageChangeValue.text(percentageChange.toFixed(5) + " %");
    ropeMechanism.thetaTextValue.text(ropeMechanism.theta.toFixed(2) + "°");
}

// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};