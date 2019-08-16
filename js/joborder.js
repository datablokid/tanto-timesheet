var jsJoborder={	
	blok:null,
	action:null,
	halaman:null,
	viewRead: function(){

		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>Job Order: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<br>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:7px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsJoborder.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsJoborder.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round-large w3-border">';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {"login_blok":g.login_blok};
		
		if (this.halaman==null){

			loadDoc(myServer+"joborder/read_paging.php",this.showData, obj); 
			
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
		txt+="<th>Number</th>";
		txt+="<th>Description</th>";
		txt+="<th>Location</th>";
		txt+="<th>Percent</th>";
		txt+="<th>Supervisor</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>"
		
	    if (drax.err==0){
			
			for (x in drax.data) {
				txt += "<tr>";
				txt += "<td>"+drax.data[x].nomer + "</td>";
				txt += "<td>"+drax.data[x].job_number + "</td>";
				txt += "<td>"+drax.data[x].job_description + "</td>";
				txt += "<td>"+drax.data[x].job_location + "</td>";
				txt += "<td>"+drax.data[x].job_percent + "</td>";
				txt += "<td>"+drax.data[x].job_supervisor + "</td>";
				
				txt += "<td>"+drax.data[x].user_name + "</td>";
				txt += "<td>"+drax.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsJoborder.viewUpdate(\"" + drax.data[x].job_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-round-large w3-border'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsJoborder.viewDelete(\"" + drax.data[x].job_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-round-large w3-border'></td>";
				
				txt += "</tr>";
			}

		}
		
		txt+="</table></div>";
		
		document.getElementById("showTable").innerHTML = txt;
		document.getElementById("count").innerHTML = " Total record: <span class='w3-tag w3-theme-l1'>" + drax.msg+'</div>';
		
		txt="";
		
		if (jsJoborder.action=="read"){
			
			if (drax.err===0){
				
				if (drax.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsJoborder.gotoPage(\"" + drax.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
				for (x in drax.paging.pages) {
					
					if (drax.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsJoborder.gotoPage(\"" + drax.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-border w3-round' >&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsJoborder.gotoPage(\"" + drax.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;";	
						
					}

				}
				
				if (drax.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsJoborder.gotoPage(\"" + drax.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
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
		
		var btn ='<input type="button" onclick="jsJoborder.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsJoborder.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			
			btn+='<input type="button" id = "btnDelete" onclick="jsJoborder.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			
			btn+='<input type="button" id = "btnUpdate" onclick="jsJoborder.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Job Order: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';

		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<label>Number:</label>';
		layout += '<input type="text" id = "job_number" class="w3-input w3-border">';		
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Description</label>';
		layout += '<input type="text" id = "job_description" class="w3-input w3-border">';
		layout += '</p>';

		layout += '<p>';
		layout += '<label>Location</label>';
		layout += '<input type="text" id = "job_location" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Start Date</label>';
		layout += '<input type="date" id = "job_sdate" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>End Date</label>';
		layout += '<input type="date" id = "job_edate" class="w3-input w3-border">';
		layout += '</p>';

		layout += '<p>';
		layout += '<label>Percent</label>';
		layout += '<input type="text" id = "job_percent" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Supervisor</label>';
		layout += '<input type="text" id = "job_supervisor" class="w3-input w3-border">';
		layout += '</p>';




		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		
		document.getElementById("job_number").focus();
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			
			let obj = {
				"login_blok":g.login_blok,
				"job_number":document.getElementById("job_number").value,
				"job_description":document.getElementById("job_description").value,
				"job_location":document.getElementById("job_location").value,
				"job_sdate":document.getElementById("job_sdate").value,
				"job_edate":document.getElementById("job_edate").value,
				"job_percent":document.getElementById("job_percent").value,
				"job_supervisor":document.getElementById("job_supervisor").value,
			};
				
			loadDoc(myServer+"joborder/create_one.php",this.serverMessage, obj); 
			
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
		
		document.getElementById("job_number").value = "";
		document.getElementById("job_description").value = "";
		document.getElementById("job_location").value = "";
		document.getElementById("job_sdate").value = "";
		document.getElementById("job_edate").value = "";
		document.getElementById("job_percent").value = "";
		document.getElementById("job_supervisor").value = "";
		
		document.getElementById("job_number").focus();
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
			"job_blok":this.blok
		};

		loadDoc(myServer+"joborder/read_one.php",loadData, obj); 

		function loadData(xhttp){

			let hope = JSON.parse(xhttp.responseText);
			
			if (hope.err==0) {
				
				document.getElementById("job_number").value =  hope.data[0].job_number;		
				document.getElementById("job_description").value =  hope.data[0].job_description;		
				document.getElementById("job_location").value = hope.data[0].job_location;		
				document.getElementById("job_sdate").value =  hope.data[0].job_sdate;		
				document.getElementById("job_edate").value =  hope.data[0].job_edate;		
				document.getElementById("job_percent").value =  hope.data[0].job_percent;		
				document.getElementById("job_supervisor").value =  hope.data[0].job_supervisor;		
				
			}else{

				messageBox(hope.msg);		
			}
			
		}
	},

	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"job_blok":this.blok
		};
			
		loadDoc(myServer+"joborder/delete_one.php",this.serverMessage, obj); 
		
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
			"job_blok":this.blok,
			"job_number":document.getElementById("job_number").value,
			"job_description":document.getElementById("job_description").value,
			"job_location":document.getElementById("job_location").value,
			"job_sdate":document.getElementById("job_sdate").value,
			"job_edate":document.getElementById("job_edate").value,
			"job_percent":document.getElementById("job_percent").value,
			"job_supervisor":document.getElementById("job_supervisor").value,

		};
			
		loadDoc(myServer+"joborder/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){

		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsJoborder.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
				
			loadDoc(myServer + "joborder/search.php",this.showData, obj); 
		
		}
	
	}
	
}
