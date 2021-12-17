// JavaScript 

var main_ldmks_max_index = 0;
var main_ldmks_ids = new Array();
var main_ldmks_names = new Array();
var main_ldmks_posx = new Array();
var main_ldmks_posz = new Array();
var main_ldmks_r = new Array();
var main_ldmks_g = new Array();
var main_ldmks_b = new Array();
var main_ldmks_dor = new Array();
var main_ldmks_photo = new Array();
var main_ldmks_production = new Array();
var main_ldmks_description = new Array();

var hell_ldmks_max_index = 0;
var hell_ldmks_ids = new Array();
var hell_ldmks_names = new Array();
var hell_ldmks_posx = new Array();
var hell_ldmks_posz = new Array();
var hell_ldmks_r = new Array();
var hell_ldmks_g = new Array();
var hell_ldmks_b = new Array();
var hell_ldmks_dor = new Array();
var hell_ldmks_photo = new Array();
var hell_ldmks_production = new Array();
var hell_ldmks_description = new Array();

var end_ldmks_max_index = 0;
var end_ldmks_ids = new Array();
var end_ldmks_names = new Array();
var end_ldmks_posx = new Array();
var end_ldmks_posz = new Array();
var end_ldmks_r = new Array();
var end_ldmks_g = new Array();
var end_ldmks_b = new Array();
var end_ldmks_dor = new Array();
var end_ldmks_photo = new Array();
var end_ldmks_production = new Array();
var end_ldmks_description = new Array();

function clearRecord()
{
	main_ldmks_max_index = 0;
	main_ldmks_ids.length = 0;
	main_ldmks_names.length = 0;
    main_ldmks_posx.length = 0;
    main_ldmks_posz.length = 0;
    main_ldmks_r.length = 0;
    main_ldmks_g.length = 0;
    main_ldmks_b.length = 0;
    main_ldmks_dor.length = 0;
    main_ldmks_photo.length = 0;
    main_ldmks_production.length = 0;
    main_ldmks_description.length = 0;
	
	hell_ldmks_max_index = 0;
    hell_ldmks_ids.length = 0;
    hell_ldmks_names.length = 0;
    hell_ldmks_posx.length = 0;
    hell_ldmks_posz.length = 0;
    hell_ldmks_r.length = 0;
    hell_ldmks_g.length = 0;
    hell_ldmks_b.length = 0;
    hell_ldmks_dor.length = 0;
    hell_ldmks_photo.length = 0;
    hell_ldmks_production.length = 0;
    hell_ldmks_description.length = 0;
	
	end_ldmks_max_index = 0;
    end_ldmks_ids.length = 0;
    end_ldmks_names.length = 0;
    end_ldmks_posx.length = 0;
    end_ldmks_posz.length = 0;
    end_ldmks_r.length = 0;
    end_ldmks_g.length = 0;
    end_ldmks_b.length = 0;
    end_ldmks_dor.length = 0;
    end_ldmks_photo.length = 0;
    end_ldmks_production.length = 0;
    end_ldmks_description.length = 0;
	
}
//dom节点转换为字符串
function nodeToString ( node ) {
   var tmpNode = document.createElement( "div" );
   tmpNode.appendChild( node.cloneNode( true ) );
   var str = tmpNode.innerHTML;
   tmpNode = node = null; // prevent memory leaks in IE
   return str;
}

function getIndexById(idsheet,id)
{
	for(var i = 0 ; i < idsheet.length; i++)
	{
		if(idsheet[i] == id){return i;}
	}
	return -1;
}

function appendMainLdmk(id,name,posx,posz,r,g,b,dor,photo,production,description)
{
	main_ldmks_ids[main_ldmks_max_index] = id;
	main_ldmks_names[main_ldmks_max_index] = name;
	main_ldmks_posx[main_ldmks_max_index] = posx;
	main_ldmks_posz[main_ldmks_max_index] = posz;
	main_ldmks_r[main_ldmks_max_index] = r;
	main_ldmks_g[main_ldmks_max_index] = g;
	main_ldmks_b[main_ldmks_max_index] = b;
	main_ldmks_dor[main_ldmks_max_index] = dor;
	main_ldmks_photo[main_ldmks_max_index] = photo;
	main_ldmks_production[main_ldmks_max_index] = production;
	main_ldmks_description[main_ldmks_max_index] = description;
	main_ldmks_max_index += 1;
}

function appendHellLdmk(id,name,posx,posz,r,g,b,dor,photo,production,description)
{
	hell_ldmks_ids[hell_ldmks_max_index] = id;
	hell_ldmks_names[hell_ldmks_max_index] = name;
	hell_ldmks_posx[hell_ldmks_max_index] = posx;
	hell_ldmks_posz[hell_ldmks_max_index] = posz;
	hell_ldmks_r[hell_ldmks_max_index] = r;
	hell_ldmks_g[hell_ldmks_max_index] = g;
	hell_ldmks_b[hell_ldmks_max_index] = b;
	hell_ldmks_dor[hell_ldmks_max_index] = dor;
	hell_ldmks_photo[hell_ldmks_max_index] = photo;
	hell_ldmks_production[hell_ldmks_max_index] = production;
	hell_ldmks_description[hell_ldmks_max_index] = description;
	hell_ldmks_max_index += 1;
}

function appendEndLdmk(id,name,posx,posz,r,g,b,dor,photo,production,description)
{
	end_ldmks_ids[end_ldmks_max_index] = id;
	end_ldmks_names[end_ldmks_max_index] = name;
	end_ldmks_posx[end_ldmks_max_index] = posx;
	end_ldmks_posz[end_ldmks_max_index] = posz;
	end_ldmks_r[end_ldmks_max_index] = r;
	end_ldmks_g[end_ldmks_max_index] = g;
	end_ldmks_b[end_ldmks_max_index] = b;
	end_ldmks_dor[end_ldmks_max_index] = dor;
	end_ldmks_photo[end_ldmks_max_index] = photo;
	end_ldmks_production[end_ldmks_max_index] = production;
	end_ldmks_description[end_ldmks_max_index] = description;
	end_ldmks_max_index += 1;
}





function setMainLdmksLi()
{
	//创建主世界地标列表按钮
	for (var i = 0 ; i < main_ldmks_max_index ; i++){
		
		var item_id = main_ldmks_ids[i];
		var name = main_ldmks_names[i];
		var r = main_ldmks_r[i];
		var g = main_ldmks_g[i];
		var b = main_ldmks_b[i];
		var color = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
		
		var posx = main_ldmks_posx[i];
		var posz = main_ldmks_posz[i];
		
		name = name + " (x: " + posx.toString() + ", z: " + posz.toString() + ")";
	
		
		var block = document.createElement("div");
		block.className = "icon";
		block.style.backgroundColor = color;
		
		var txt = document.createElement("div");
		txt.className = "text";
		txt.innerHTML += name;
		
		
		var slot = document.createElement("li");
		slot.id = item_id;
		
		slot.innerHTML += nodeToString(block);
		slot.innerHTML += nodeToString(txt);
		$("#detail_list1").append(slot);
	}
	
	//注册列表按钮监听
	
	for (var i = 0 ; i < main_ldmks_max_index ; i++){
		
		var id_str = "#" + main_ldmks_ids[i].toString();
		$(id_str).click(itemClicked);
	}
	
}

function setHellLdmksLi()
{
	//创建下界地标列表按钮
	for (var i = 0 ; i < hell_ldmks_max_index ; i++){
		
		var item_id = hell_ldmks_ids[i];
		var name = hell_ldmks_names[i];
		var r = hell_ldmks_r[i];
		var g = hell_ldmks_g[i];
		var b = hell_ldmks_b[i];
		var color = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
		
		var posx = hell_ldmks_posx[i];
		var posz = hell_ldmks_posz[i];
		
		name = name + " (x: " + posx.toString() + ", z: " + posz.toString() + ")";
		
		var block = document.createElement("div");
		block.className = "icon";
		block.style.backgroundColor = color;
		
		var txt = document.createElement("div");
		txt.className = "text";
		txt.innerHTML += name;
		
		
		var slot = document.createElement("li");
		slot.id = item_id;
		
		slot.innerHTML += nodeToString(block);
		slot.innerHTML += nodeToString(txt);
		$("#detail_list4").append(slot);
	}
	
	//注册列表按钮监听
	
	for (var i = 0 ; i < hell_ldmks_max_index ; i++){
		
		var id_str = "#" + hell_ldmks_ids[i].toString();
		$(id_str).click(itemClicked);
	}
}

function setEndLdmksLi()
{
	//创建下界地标列表按钮
	for (var i = 0 ; i < end_ldmks_max_index ; i++){
		
		var item_id = end_ldmks_ids[i];
		var name = end_ldmks_names[i];
		var r = end_ldmks_r[i];
		var g = end_ldmks_g[i];
		var b = end_ldmks_b[i];
		var color = "rgb(" + r.toString() + "," + g.toString() + "," + b.toString() + ")";
		
		var posx = end_ldmks_posx[i];
		var posz = end_ldmks_posz[i];
		
		name = name + " (x: " + posx.toString() + ", z: " + posz.toString() + ")";
		
		var block = document.createElement("div");
		block.className = "icon";
		block.style.backgroundColor = color;
		
		var txt = document.createElement("div");
		txt.className = "text";
		txt.innerHTML += name;
		
		
		var slot = document.createElement("li");
		slot.id = item_id;
		
		slot.innerHTML += nodeToString(block);
		slot.innerHTML += nodeToString(txt);
		$("#detail_list7").append(slot);
	}
	
	//注册列表按钮监听
	
	for (var i = 0 ; i < end_ldmks_max_index ; i++){
		
		var id_str = "#" + end_ldmks_ids[i].toString();
		$(id_str).click(itemClicked);
	}
	
}


//在这里创建主世界地标，id从100开始
function loadMainLdmks()
{
	$.ajax({
		type:"post",
		url:"",
		data:{"get":"MLDMK"},
		success:function(list){

				var list_obj = eval(list);
				console.log(list_obj);
				var id = 100;
				var name = "地标";
				var world_x = 0;
				var world_z = 0;
				var r = 0;
				var g = 0;
				var b = 0;
				var dor = 0;
				var photo = "static\\record\\photos\\none.png";
				var production = "...";
				var description = "111";
				for(var i= 0; i < list_obj.length; i++){
					id = list_obj[i].id;
					name = list_obj[i].name;
					r = list_obj[i].r;
					g = list_obj[i].g;
					b = list_obj[i].b;
					world_x = list_obj[i].world_x;
					world_z = list_obj[i].world_z;
					dor = list_obj[i].dor;
					photo = list_obj[i].photo;
					production = list_obj[i].production;
					description = list_obj[i].description;
					appendMainLdmk(id,name,world_x,world_z,r,g,b,dor,photo,production,description);

					
				}
				setMainLdmksLi();
				renderMap();
		},
		error:function(xhr){
			//window.alert(xhr);
		}
	});  

}

//在这里创建下界地标,id从1000开始
function loadHellLdmks()
{
	$.ajax({
		type:"post",
		url:"",
		data:{"get":"HLDMK"},
		success:function(list){

				var list_obj = eval(list);
				console.log(list_obj);
				var id = 1000;
				var name = "地标";
				var world_x = 0;
				var world_z = 0;
				var r = 0;
				var g = 0;
				var b = 0;
				var dor = 0;
				var photo = "static\\record\\photos\\none.png";
				var production = "...";
				var description = "111";
				for(var i= 0; i < list_obj.length; i++){
					id = list_obj[i].id;
					name = list_obj[i].name;
					r = list_obj[i].r;
					g = list_obj[i].g;
					b = list_obj[i].b;
					world_x = list_obj[i].world_x;
					world_z = list_obj[i].world_z;
					dor = list_obj[i].dor;
					photo = list_obj[i].photo;
					production = list_obj[i].production;
					description = list_obj[i].description;
					appendHellLdmk(id,name,world_x,world_z,r,g,b,dor,photo,production,description);

					
				}
				setHellLdmksLi();
				renderMap();
		},
		error:function(xhr){
			window.alert(xhr);
		}
	});  

}

//在这里创建末地地标,id从2000开始
function loadEndLdmks()
{
	$.ajax({
		type:"post",
		url:"",
		data:{"get":"ELDMK"},
		success:function(list){

				var list_obj = eval(list);
				console.log(list_obj);
				var id = 2000;
				var name = "地标";
				var world_x = 0;
				var world_z = 0;
				var r = 0;
				var g = 0;
				var b = 0;
				var dor = 0;
				var photo = "static\\record\\photos\\none.png";
				var production = "...";
				var description = "111";
				for(var i= 0; i < list_obj.length; i++){
					id = list_obj[i].id;
					name = list_obj[i].name;
					r = list_obj[i].r;
					g = list_obj[i].g;
					b = list_obj[i].b;
					world_x = list_obj[i].world_x;
					world_z = list_obj[i].world_z;
					dor = list_obj[i].dor;
					photo = list_obj[i].photo;
					production = list_obj[i].production;
					description = list_obj[i].description;
					appendEndLdmk(id,name,world_x,world_z,r,g,b,dor,photo,production,description);

					
				}
				setEndLdmksLi();
				renderMap();
		},
		error:function(xhr){
			window.alert(xhr);
		}
	});  
}
