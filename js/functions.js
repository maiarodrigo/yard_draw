
function Copy() {
	canvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
}

function Paste() {
	_clipboard.clone(function(clonedObj) {
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if (clonedObj.type === 'activeSelection') {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject(function(obj) {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		_clipboard.top += 10;
		_clipboard.left += 10;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();
	});
}

function deleteSelectedObjectsFromCanvas(){
    var selection = canvas.getActiveObject();
    if (selection.type === 'activeSelection') {
		if (confirm('Are you sure?')) {
			selection.forEachObject(function(element) {
				canvas.remove(element);
			});
		}
    }
    else{
		if (confirm('Are you sure?')) {
			canvas.remove(selection);
		}
        
    }
    canvas.discardActiveObject();
    canvas.requestRenderAll();
}


function ResetZoom(){
    canvas.setZoom(1);
}



function create_block(){

	wt = document.getElementById("blocks_horizontal").value;
	ht = document.getElementById("blocks_vertical").value;
	//console.log(wt,ht)

	for(var y_c = 1; y_c <= ht ; y_c++) {
		for(var x_c = 1; x_c <= wt; x_c++) {  
	
			var rect = new fabric.Rect({
				top : ( cont_size_h * (y_c - 1) ) ,
				left : ( cont_size_w * (x_c - 1) )   ,
				width : cont_size_w,
				height : cont_size_h,
				borderColor: "white",
				strokeWidth: 1,
				stroke: 'white',
				fill : 'red'
			});

			var points = [
				{x : cont_size_w * (x_c - 1) , y : cont_size_h * (y_c - 1)}, // TOP LEFT
				{x : cont_size_w * (x_c - 1) , y : ( cont_size_h * (y_c - 1)  +  cont_size_h)}, // BOTTOM LEFT
				{x : ( cont_size_w * (x_c - 1) + cont_size_w) , y : ( cont_size_h * (y_c - 1)  +  cont_size_h)}, // BOTTOM RIGHT
				{x : ( cont_size_w * (x_c - 1) + cont_size_w) , y : cont_size_h * (y_c - 1)  }] // TOP RIGHT
 
			var rect_poly = new fabric.Polygon(
				points,
				{
					borderColor: "white",
					strokeWidth: 1,
					stroke: 'white',
					fill : 'red'
				}
			);

			var text = new fabric.Text('', {
				fontSize: 2,
				left: ( cont_size_w * (x_c - 1) ),
				top: ( cont_size_h * (y_c - 1) )
			  });
			

			var group = new fabric.Group([ rect_poly , text ], {
				left: ( cont_size_w * (x_c - 1) )   ,
				top: ( cont_size_h * (y_c - 1) )
			});

	
			//console.log(y_c,x_c)
	
			arrayOfStacks.push(group)
		}
	
	}

	//console.log(arrayOfStacks)

	var group = new fabric.Group(arrayOfStacks, {
		left: 400,
		top: 400
	  });
	
	canvas.add(group);

	arrayOfStacks = []
	document.getElementById("blocks_horizontal").value = 0
	document.getElementById("blocks_vertical").value = 0


}



function cib_invert_order_of_macro_arrays(a){
	a_copy_macro = a.slice(); // create csimple copy
	return a_copy_macro.reverse();
}

function cib_invert_order_of_micro_arrays(a){
	a_copy_micro = a.slice(); // create csimple copy
	result_invert = []
	a_copy_micro.forEach(function(item){
		a_copy_micro_each = item.slice()
		result_invert.push(a_copy_micro_each.reverse())
	});
	return result_invert
}

function cib_invert_order_of_micro_and_macro_arrays(a){
	a_copy_micro_macro = a.slice(); // create csimple copy
	return cib_invert_order_of_macro_arrays(cib_invert_order_of_micro_arrays(a_copy_micro_macro))
	
}


function cib_generate_char_range(c1, diff){
	c1 =  c1.toUpperCase();
	a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
	return (a.slice(a.indexOf(c1), a.indexOf(c1) + diff)); 
}

function cib_generate_int_range(c1, diff, oddeven){
	c1 =  parseInt(c1)
	diff =  parseInt(diff)
	if(oddeven==true){
		return _.range(c1,c1+(diff*2),2)
	}else{
		return _.range(c1,c1+diff); 
	}
}


function cib_define_and_create_range(type_range, c1, diff){
	if(type_range == "number"){
		return cib_generate_int_range(c1,diff,false)
	} else if (type_range == "odd_even_number"){
		return cib_generate_int_range(c1,diff,true)
	} else if (type_range == "letter"){
		return cib_generate_char_range(c1,diff)
	}
}


function create_info_blocks(){
	block_name = document.getElementById("block_name").value;
	
	bay_naming = document.getElementById("bays_naming").value;
	bay_ordering = document.getElementById("bays_ordering").value;
	bay_initial = document.getElementById("bays_initial").value;

	row_naming = document.getElementById("rows_naming").value;
	row_ordering = document.getElementById("rows_ordering").value;
	row_initial = document.getElementById("rows_initial").value;

	console.log(block_name,bay_naming,bay_ordering,bay_initial,row_naming,row_ordering,row_initial)

	var selection = canvas.getActiveObject();
	var colors = ["blue","pink","black", "yellow", "green"]

	console.log(selection)	
	group_w = (selection.width -1)/ cont_size_w
	group_h = (selection.height -1)/ cont_size_h


	indexes = Array.from(selection._objects.keys())
	new_indexes = []


	while (indexes.length > 0) {
		new_indexes.push(indexes.splice(0,group_w))
	}


	if (bay_ordering == 'lr' && row_ordering == 'tb'){
		//console.log("LR/TB")
		new_indexes_ordered = new_indexes

	} else if (bay_ordering == 'rl' && row_ordering == 'tb'){
		//console.log("RL/TB")
		new_indexes_ordered = cib_invert_order_of_micro_arrays(new_indexes)

	} else if (bay_ordering == 'rl' && row_ordering == 'bt'){
		//console.log("RL/BT")
		new_indexes_ordered = cib_invert_order_of_micro_and_macro_arrays(new_indexes)

	} else if (bay_ordering == 'lr' && row_ordering == 'bt'){
		//console.log("LR/BT")
		new_indexes_ordered = cib_invert_order_of_macro_arrays(new_indexes)

	}

	// if numner, even or odd, letters

	//// FALTAM OS RANGES

	bay_range = cib_define_and_create_range(bay_naming, bay_initial,group_w)
	row_range = cib_define_and_create_range(row_naming, row_initial,group_h)
	//console.log(bay_range)
	//console.log(row_range)


	// flat and invert to use pop
	new_indexes_ordered = [].concat.apply([], new_indexes_ordered).reverse();
	//console.log(new_indexes_ordered) 

	row_range.forEach(function(row_item){

		bay_range.forEach(function(bay_item){
			index_item = new_indexes_ordered.pop()
			//console.log(index_item,{"bay": bay_item},{"row":row_item},{"block": block_name})
			selection._objects[index_item].item(0).set({'fill': "blue"})
			selection._objects[index_item].item(0).set({'location_mapping' : {"bay": bay_item,"row":row_item,"block": block_name}}) 
			selection._objects[index_item].item(1).set({'text' : block_name + "-" + bay_item + "-" + row_item  }) 
			selection._objects[index_item].item(1).set({'fill' : 'white' }) 
			//console.log(selection._objects[index_item].item(0))
		});

	});

	canvas.requestRenderAll();


}






(function () {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'image/svg+xml'});
    
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    
    
      var create = document.getElementById('to_svg_button');
    
      create.addEventListener('click', function () {
		var link = document.getElementById('downloadlink');
		//canvas.setZoom(1);
		canvas.requestRenderAll();
		link.href = makeTextFile(canvas.toSVG());
		//console.log(canvas.toJSON())
        link.style.display = 'block';
      }, false);
	})();
	
	
(function () {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'application/json'});
    
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    
    
      var create = document.getElementById('to_json_button');
    
      create.addEventListener('click', function () {
		var link = document.getElementById('downloadlink_json');
		//canvas.setZoom(1);
		canvas.requestRenderAll();
		console.log(canvas.toJSON());
		link.href = makeTextFile(canvas.toJSON());
        link.style.display = 'block';
      }, false);
	})();
	

	/////////////////////////
	/////////// TESTAR GROUP UNGROUP 
	///////////////////////////////


function Ungroup(){
 	var activeObject = canvas.getActiveObject();
	if(activeObject.type=="group"){
		var items = activeObject._objects;
		alert(items);
		activeObject._restoreObjectsState();
		canvas.remove(activeObject);
		for(var i = 0; i < items.length; i++) {
		canvas.add(items[i]);
		items[i].dirty = true; 
		canvas.item(canvas.size()-1).hasControls = true;
		}

		canvas.renderAll();
	}
}