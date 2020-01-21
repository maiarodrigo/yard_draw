function custom_svg(){

    canvas.requestRenderAll();

    blocks_to_svg = []
    canvas._objects.forEach(function(obj){
            //console.log("hey")
            console.log(obj);
            obj._objects.forEach(function(obj2){
                
                blocks_to_svg.push(obj2._objects.filter(o => o.points !== undefined ));
            });
            //var ob = obj.filter(o => o.points !== undefined );
            //console.log(ob);
        });
    
  
    
    var lines_to_svg = []
    
    
// canvas width and height for svg tag

    lines_to_svg.push('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">')
    lines_to_svg.push('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="1920" height="700"  xml:space="preserve">')
    lines_to_svg.push('<desc>Created with Fabric.js 3.6.0</desc>')
    lines_to_svg.push('<defs></defs>')
    //lines_to_svg.push('<g>')
    
    console.log("start")
    blocks_to_svg.forEach(function(obj){
        //console.log(obj[0].points[0], obj[0].points[1], obj[0].points[2]. obj[0].points[3])
        a_0_x = obj[0].points[0]['x']
        a_0_y = obj[0].points[0]['y']

        a_1_x = obj[0].points[1]['x']
        a_1_y = obj[0].points[1]['y']

        a_2_x = obj[0].points[2]['x']
        a_2_y = obj[0].points[2]['y']

        a_3_x = obj[0].points[3]['x']
        a_3_y = obj[0].points[3]['y']
        
        points = a_0_x+","+a_0_y+" "+a_1_x+","+a_1_y+" "+a_2_x+","+a_2_y+" "+a_3_x+","+a_3_y

        var polygon_element = '<polygon xmlns="http://www.w3.org/2000/svg" points="'+points+'" style="stroke: rgb(255,255,255); stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;" />'

        lines_to_svg.push(polygon_element)
        
    });

    //lines_to_svg.push('</g>')
    lines_to_svg.push('</svg>')
    
    console.log("end")

    console.log(lines_to_svg.join(''))
}
