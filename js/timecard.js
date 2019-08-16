var jsTime={	
	blok:null,
	action:null,
	halaman:null,
	viewRead: function(){

		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h2>Time Card: READ</h2>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<br>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:7px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsTime.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsTime.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round-large w3-border">';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {"login_blok":g.login_blok};
		
		if (this.halaman==null){

			loadDoc(myServer+"timecard/read_paging.php",this.showData, obj); 
			
		}else{

			loadDoc(this.halaman,this.showData, obj)
		}		
		
		document.getElementById("cari").focus();
	},
	
	showData: function(xhttp){

		var txt;
		
		var drax = JSON.parse(xhttp.responseText);
		
		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';


		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Task</th>";
		txt+="<th>Date</th>";
		txt+="<th>Start</th>";
		txt+="<th>End</th>";
		txt+="<th>Break</th>";
		txt+="<th>Regular</th>";
		txt+="<th>Overtime</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>"
		
	    if (drax.err==0){
			
			for (x in drax.data) {
				txt += "<tr>";
				txt += "<td>"+drax.data[x].nomer + "</td>";
				txt += "<td>"+drax.data[x].person_name + "</td>";
				txt += "<td>"+drax.data[x].task_code + "</td>";
				txt += "<td>"+drax.data[x].task_date + "</td>";
				txt += "<td class='w3-center'>"+drax.data[x].time_start + "</td>";
				txt += "<td class='w3-center'>"+drax.data[x].time_end + "</td>";
				txt += "<td class='w3-center'>"+drax.data[x].time_break + "</td>";
				txt += "<td class='w3-center'>"+drax.data[x].time_regular + "</td>";
				txt += "<td class='w3-center'>"+drax.data[x].time_ot + "</td>";
				
				txt += "<td>"+drax.data[x].user_name + "</td>";
				txt += "<td>"+drax.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsTime.viewUpdate(\"" + drax.data[x].time_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-round-large w3-border'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsTime.viewDelete(\"" + drax.data[x].time_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-round-large w3-border'></td>";
				
				txt += "</tr>";
			}

		}
		
		txt+="</table></div>";
		
		document.getElementById("showTable").innerHTML = txt;
		document.getElementById("count").innerHTML = " Total record: <span class='w3-tag w3-theme-l1'>" + drax.msg+'</div>';
		
		txt="";
		
		if (jsTime.action=="read"){
			
			if (drax.err===0){
				
				if (drax.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsTime.gotoPage(\"" + drax.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
				for (x in drax.paging.pages) {
					
					if (drax.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsTime.gotoPage(\"" + drax.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-border w3-round' >&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsTime.gotoPage(\"" + drax.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;";	
						
					}

				}
				
				if (drax.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsTime.gotoPage(\"" + drax.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
			}
		}
		
		document.getElementById("showPaging").innerHTML = txt; 

		if (drax.err !=0){

			messageBox(drax.msg);

		}
		
	},
	
	gotoPage: function (ini){

		this.halaman = ini;
		
		this.viewRead();

	},
	
	viewCreate: function(){
		
		this.action="create";

		this.htmlShow();

	}, 

	htmlShow: function(){
		
		var btn ='<input type="button" onclick="jsTime.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsTime.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			
			btn+='<input type="button" id = "btnDelete" onclick="jsTime.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			
			btn+='<input type="button" id = "btnUpdate" onclick="jsTime.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h2>Time Card: '+ this.action.toUpperCase() +'</h2>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';

		layout += '<div id="msg"></div>';

		layout += '<p>';
		layout += '<input type="button" onclick="jsTasklookup.viewFind(\'time card\',0,\''+this.blok+'\')" value="Person and Task" id="btnparent"  class="w3-btn w3-theme-l5 w3-border w3-round">';
		layout += '</p>';
		layout += '<p>';
		layout += '<label>Task Code</label>';
		layout += '<input type="hidden" id = "task_blok" class="w3-input w3-border" readonly="readonly">';
		layout += '<input type="text" id = "task_code" class="w3-input w3-border" readonly="readonly">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Name:</label>';
		layout += '<input type="hidden" id = "person_blok" class="w3-input w3-border" readonly="readonly">';		
		layout += '<input type="text" id = "person_name" class="w3-input w3-border" readonly="readonly">';
		layout += '<input type="hidden" id = "person_auto" class="w3-input w3-border" readonly="readonly">';		
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Function</label>';
		layout += '<input type = "text" id = "person_function" class="w3-input w3-border" readonly="readonly">';
		layout += '</p>';
		
		layout += '<div class="w3-row">'; // start
		layout += '<div class="w3-col m2" style="padding:5px">';
		layout += '<label>Start Time</label>';
		layout += '<input type = "text" id = "time_start" value="00:00" class="w3-input w3-border w3-center" onchange="jsTime.jam(\'start\',this.value)">';
		layout += '</div>';		
		
		layout += '<div class="w3-col m2" style="padding:5px">';
		layout += '<label>End Time</label>';
		layout += '<input type = "text" id = "time_end" value="00:00" class="w3-input w3-border w3-center" onchange="jsTime.jam(\'end\',this.value)">';
		layout += '</div>';		
		
		layout += '<div class="w3-col m2" style="padding:5px">';
		layout += '<label>Break Hours</label>';
		layout += '<input type = "text" id = "time_break" value="00:00" class="w3-input w3-border w3-center" onchange="jsTime.jam(\'break\',this.value)">';
		layout += '</div>';		
		
		layout += '<div class="w3-col m2" style="padding:5px">';
		layout += '<label>Regular Hours</label>';
		layout += '<input type = "text" id = "time_regular" value="00:00" class="w3-input w3-border w3-center" readonly="readonly">';
		layout += '</div>';		
		
		layout += '<div class="w3-col m2" style="padding:5px">';
		layout += '<label>Overtime Hours</label>';
		layout += '<input type = "text" id = "time_ot" value="00:00" class="w3-input w3-border w3-center" onchange="jsTime.jam(\'ot\',this.value)">';
		layout += '</div>';		
		
		layout += '</div>';		// end

		layout += '<p>';
		layout += '<label>Note of Activity</label>';
		layout += '<input type = "text" id = "time_note" class="w3-input w3-border">';
		layout += '</p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		
		document.getElementById("time_start").focus();
		
	},
	
	hitung: function(){

		document.getElementById("time_regular").value=document.getElementById("time_end").value - document.getElementById("time_start").value ;
	},
	
	jam: function(el,x){

		var y=parseInt(x);
		var a=y.toString().length;// mengambil panjang text
		
		var c=x.toString(); // jadi string, hilangkan spasi

		var d=c.search(":"); // find :
		
		var z='';
		
		
		if (d>0){ // ada :

			var f=c.toString().length;
			
			if (f==5){
				var e=x.substr(0,2); // dua angka pertama
				var g=x.substr(d-4,2); // dua angka terakhir
				z=e+":"+g;

			}else if(f==4){
				var h=x.substr(0,1); // dua angka pertama
				var i=x.substr(d-3,2); // dua angka terakhir
				z=h+":"+i;

			}else if(f==3){
				var j=x.substr(0,1); // dua angka pertama
				var k=x.substr(d-1,1); // dua angka terakhir
				z=j+":"+k;

			}
		}
		// tidak ada :
		else{
			if (a<=2){
				var z=c + ":00";
			}else if (a==3){

				var e=y.toString().substr(a-3,1); // dua angka pertama
				var b=y.toString().substr(a-2,2); // dua angka terakhir
				z=e+":"+b
			}else if(a==4){
				var e=y.toString().substr(a-4,2); // dua angka pertama
				var b=y.toString().substr(a-2,2); // dua angka terakhir
				z=e+":"+b				
			}
		}
		var start = z.split(":");
		var startDate = new Date(0, 0, 0, start[0], start[1],0, 0);
		var tulis=startDate.getHours() +":"+ ("00"+startDate.getMinutes()).slice(-2);
		
		if (el=="start"){
			document.getElementById("time_start").value = tulis ;
		}
		if (el=="end"){
			document.getElementById("time_end").value = tulis ;
		}
		if (el=="break"){
			document.getElementById("time_break").value = tulis;
		}
		if (el=="ot"){
			document.getElementById("time_ot").value = tulis;
		}
		
		var mulai = document.getElementById("time_start").value;
		var selesai = document.getElementById("time_end").value;
		var rehat = document.getElementById("time_break").value;
		
		if (mulai==""){
			mulai="0:00";
		}
		
		if (selesai==""){
			selesai="0:00";
		}
		
		if (rehat==""){
			rehat="0:00";
		}

		var total=this.diff(mulai,selesai);
		document.getElementById("time_regular").value = this.diff(rehat,total);
	
	},
	
	// https://stackoverflow.com/questions/10804042/calculate-time-difference-with-javascript
	diff: function(start, end){
		start = start.split(":");
		end = end.split(":");
		var startDate = new Date(0, 0, 0, start[0], start[1], 0);
		var endDate = new Date(0, 0, 0, end[0], end[1], 0);
		var diff = endDate.getTime() - startDate.getTime();
		var hours = Math.floor(diff / 1000 / 60 / 60);
		diff -= hours * (1000 * 60 * 60);
		var minutes = Math.floor(diff / 1000 / 60);
		diff -= minutes * (1000 * 60);
		var seconds = Math.floor(diff / 1000);

		// If using time pickers with 24 hours format, add the below line get exact hours
		if (hours < 0)
		   hours = hours + 24;

		//return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes + (seconds<= 9 ? "0" : "") + seconds;
		return (hours <= 9 ? "0" : "") + hours + ":" + (minutes <= 9 ? "0" : "") + minutes ;

	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"task_blok":document.getElementById("task_blok").value,
				"person_auto":document.getElementById("person_auto").value,
				"person_blok":document.getElementById("person_blok").value,
				"time_start":document.getElementById("time_start").value,
				"time_end":document.getElementById("time_end").value,
				"time_break":document.getElementById("time_break").value,
				"time_regular":document.getElementById("time_regular").value,
				"time_ot":document.getElementById("time_ot").value,
				"time_note":document.getElementById("time_note").value
				
			};
				
			loadDoc(myServer+"timecard/create_one.php",this.serverMessage, obj); 
			
		}
		else{
			
			document.getElementById("btnCreate").value="Create";
			
			this.reset();

		}
	},

	serverMessage: function(xhttp){	
		
		var groot = JSON.parse(xhttp.responseText);

	
		if (groot.err==0){
			
			if (groot.metode=="Create"){

				document.getElementById("btnCreate").value="Reset";
			}
		
		} 

		document.getElementById("msg").innerHTML=papanInfo(groot.msg, groot.err);
				
	},
	
	reset:	function(){
		
		document.getElementById("msg").innerHTML = "";
		
		document.getElementById("task_blok").value = "";
		document.getElementById("person_auto").value = "";
		document.getElementById("person_blok").value = "";
		document.getElementById("time_start").value = "";
		document.getElementById("time_end").value = "";
		document.getElementById("time_break").value = "";
		document.getElementById("time_regular").value = "";
		document.getElementById("time_ot").value = "";
		document.getElementById("time_note").value = "";
		
		document.getElementById("time_start").focus();
	},
	
	viewDelete: function(blok){
		
		this.blok=blok;
		this.action="delete";
		this.htmlShow();
		this.readOne();

	}, 

	readOne: function(){

		let obj={
			"login_blok":g.login_blok,
			"time_blok":this.blok
		};
			
		loadDoc(myServer+"timecard/read_one.php",loadData, obj); 

		function loadData(xhttp){

			let hope = JSON.parse(xhttp.responseText);
			
			if (hope.err==0) {
				
				document.getElementById("person_blok").value = hope.data[0].person_blok;		
				document.getElementById("task_blok").value = hope.data[0].task_blok;
				document.getElementById("time_start").value = hope.data[0].time_start;
				document.getElementById("time_end").value = hope.data[0].time_end;
				document.getElementById("time_break").value = hope.data[0].time_break;
				document.getElementById("time_regular").value = hope.data[0].time_regular;
				document.getElementById("time_ot").value = hope.data[0].time_ot;
				document.getElementById("time_note").value = hope.data[0].time_note;
				document.getElementById("person_auto").value = hope.data[0].person_auto;

				document.getElementById("person_name").value = hope.data[0].person_name;
				document.getElementById("person_function").value = hope.data[0].person_function;
				document.getElementById("task_code").value = hope.data[0].task_code;
				
				/*
				var mulai=hope.data[0].time_start;
				var selesai=hope.data[0].time_end;
				var rehat=hope.data[0].time_break;				
				var total=jsTime.diff(mulai,selesai);

				document.getElementById("time_regular").value = jsTime.diff(rehat,total);
				*/
				
			}else{

				messageBox(hope.msg);		
			}
			
		}
	},

	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"time_blok":this.blok
		};
			
		loadDoc(myServer+"timecard/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate: function(blok){

		this.blok=blok;
		this.action="update";		
		this.htmlShow();
		this.readOne();	

	},
	
	klikUpdate:function(){

		var obj = {
			"login_blok":g.login_blok,
			"time_blok":this.blok,
			"time_start":document.getElementById("time_start").value,
			"time_end":document.getElementById("time_end").value,
			"time_break":document.getElementById("time_break").value,
			"time_regular":document.getElementById("time_regular").value,
			"time_ot":document.getElementById("time_ot").value,
			"time_note":document.getElementById("time_note").value,
			"task_blok":document.getElementById("task_blok").value,
			"person_blok":document.getElementById("person_blok").value,
			"person_auto":document.getElementById("person_auto").value
		};
			
		loadDoc(myServer+"timecard/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){

		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsTime.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
				
			loadDoc(myServer + "timecard/search.php",this.showData, obj); 
		
		}
	
	},
	
	readTask: function(person_blok,person_name,person_function,task_blok,task_code,person_auto){
		
		document.getElementById("person_blok").value = person_blok;
		document.getElementById("person_name").value = person_name;
		document.getElementById("person_function").value = person_function;
		document.getElementById("task_blok").value = task_blok;
		document.getElementById("task_code").value = task_code;
		document.getElementById("person_auto").value = person_auto;
		
	},
	
}
