

var jsTask={	
	blok:null,
	action:null,
	halaman:null,
	task_person:null,
	isi:null,
	
	viewRead: function(){

		this.action = "read";
		
		var layout  = '';
		layout += '<div class="w3-container w3-theme-d4 w3-round">';
		layout += '<h3>Task Todo: READ</h3>';
		layout += '</div>';
		
		layout += '<div class="w3-container w3-card">';
		layout += '<br>';
		
		layout += '<div class="w3-row w3-section  w3-theme-d4">';
		layout += '<div class="w3-col w3-center" style="width:40px;padding-top:7px"><i class="w3-xlarge fa fa-search"></i></div>';
		layout += '<div class="w3-rest">';
		layout += '<input type="text" onkeyup="jsTask.viewSearch(this.value)" placeholder="Type to search..." id="cari" class="w3-input w3-border">';
		layout += '</div>';
		layout += '</div>';

		layout += '<p id="showPaging"></p>';
		layout += '<input type="button" onclick="jsTask.viewCreate()" value="Create" class="w3-btn w3-theme-l5 w3-round-large w3-border">';
		layout += '<span id="count"></span>';
		layout += '<p id="showTable"></p>';
		
		layout += '</div>';
		
		document.getElementById('viewMid').innerHTML = layout;

		let obj = {"login_blok":g.login_blok};
		
		if (this.halaman==null){

			loadDoc(myServer+"task/read_paging.php",this.showData, obj); 
			
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
		txt+="<th>Job Number</th>";
		txt+="<th>Task Code</th>";
		txt+="<th>Date</th>";
		txt+="<th>Work Area</th>";
		
		txt+="<th>Owner</th>";
		txt+="<th>Created</th>";
		txt+="<th colspan=2 class='w3-center'>Edit</th>";
		
		txt+="</tr></thead>"
		
	    if (drax.err==0){
			
			for (x in drax.data) {
				txt += "<tr>";
				txt += "<td>"+drax.data[x].nomer + "</td>";
				txt += "<td>"+drax.data[x].job_number + "</td>";
				txt += "<td>"+drax.data[x].task_code + "</td>";
				txt += "<td>"+drax.data[x].task_date + "</td>";
				txt += "<td>"+drax.data[x].task_area + "</td>";
				
				txt += "<td>"+drax.data[x].user_name + "</td>";
				txt += "<td>"+drax.data[x].date_created + "</td>";

				txt += "<td class='w3-center'><input type='button' id='upd' onClick='jsTask.viewUpdate(\"" + drax.data[x].task_blok + "\");' value='Update' class='w3-btn w3-theme-l5 w3-round-large w3-border'></td>";
				txt += "<td class='w3-center'><input type='button' id='del' onClick='jsTask.viewDelete(\"" + drax.data[x].task_blok + "\");' value='Delete' class='w3-btn w3-theme-l5 w3-round-large w3-border'></td>";
				
				txt += "</tr>";
			}

		}
		
		txt+="</table></div>";
		
		document.getElementById("showTable").innerHTML = txt;
		document.getElementById("count").innerHTML = " Total record: <span class='w3-tag w3-theme-l1'>" + drax.msg+'</div>';
		
		txt="";
		
		if (jsTask.action=="read"){
			
			if (drax.err===0){
				
				if (drax.paging.first!=""){
					
					txt+= "<input type='button' value= 'First' onclick='jsTask.gotoPage(\"" + drax.paging.first + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
				}
				
				for (x in drax.paging.pages) {
					
					if (drax.paging.pages[x].current_page=="yes"){
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsTask.gotoPage(\"" + drax.paging.pages[x].url + "\")' disabled class='w3-btn w3-theme-l5 w3-border w3-round' >&nbsp;";	
						
					} 
					else{
						
						txt+= "<input type='button' value = '"+ drax.paging.pages[x].page +"' onclick='jsTask.gotoPage(\"" + drax.paging.pages[x].url + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;";	
						
					}

				}
				
				if (drax.paging.last!=""){
					
					txt+= "<input type='button' value= 'Last' onclick='jsTask.gotoPage(\"" + drax.paging.last + "\")' class='w3-btn w3-theme-l5 w3-border w3-round'>&nbsp;" ;
					
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
		var isi = [];
		jsTask.readDetail(isi);

	}, 
	htmlShow: function(){
		
		var btn ='<input type="button" onclick="jsTask.viewRead()" value="Read" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
		
		if (this.action.toUpperCase() == 'CREATE'){
			
			btn+='<input type="button" id = "btnCreate" onclick="jsTask.klikCreate()" value="Create" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'DELETE'){
			
			btn+='<input type="button" id = "btnDelete" onclick="jsTask.klikDelete()" value="Delete" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		if (this.action.toUpperCase() == 'UPDATE'){
			
			btn+='<input type="button" id = "btnUpdate" onclick="jsTask.klikUpdate()" value="Update" class="w3-btn w3-theme-l5 w3-border w3-round-large">&nbsp;';
			
		}
		
		let layout  = '';
		
		layout += '<div class="w3-container w3-theme-d4 w3-round w3-border">';
		layout += '<h3>Task Todo: '+ this.action.toUpperCase() +'</h3>';
		layout += '</div>';
		
		layout += '<form class="w3-container w3-card">';
		layout += '<p>';
		layout += btn;
		layout += '</p>';

		layout += '<div id="msg"></div>';
		
		layout += '<p>';
		layout += '<input type="hidden" id = "job_blok" class="w3-input w3-border">';		
		layout += '<input type="button" onclick="jsJoborderlookup.viewFind(\'task todo\',0,\''+this.blok+'\')" value="Job Number" id="btnparent"  class="w3-btn w3-theme-l5 w3-border w3-round">';
		layout += '<input type="text" id = "job_number" class="w3-input w3-border" readonly="readonly">';		
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Task Code</label>';
		layout += '<input type="text" id = "task_code" class="w3-input w3-border">';
		layout += '</p>';

		layout += '<p>';
		layout += '<label>Date</label>';
		layout += '<input type="date" id = "task_date" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<label>Area</label>';
		layout += '<input type="text" id = "task_area" class="w3-input w3-border">';
		layout += '</p>';
		
		layout += '<p>';
		layout += '<input type="button" onclick="jsTask.klikTambah()" value="Add Person" class="w3-btn w3-theme-l5 w3-round-large w3-border">';
		layout += '<div id="person_detail"></div>';
		layout += '<p>';

		layout += '</form>';
		
		document.getElementById('viewMid').innerHTML = layout;		
		
		document.getElementById("task_code").focus();
		
	},
	
	klikCreate: function(){

		if (document.getElementById("btnCreate").value=="Create"){		
			let baru = this.filterArray();
			
			let obj = {
				"login_blok":g.login_blok,
				"job_blok":document.getElementById("job_blok").value,
				"task_code":document.getElementById("task_code").value,
				"task_date":document.getElementById("task_date").value,
				"task_area":document.getElementById("task_area").value,
				"task_person":baru
			};
				
			loadDoc(myServer+"task/create_one.php",this.serverMessage, obj); 
			
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
		document.getElementById("job_blok").value = "";
		document.getElementById("task_code").value = "";
		document.getElementById("task_date").value = "";
		document.getElementById("task_area").value = "";
		
		document.getElementById("task_code").focus();
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
			"task_blok":this.blok
		};

		loadDoc(myServer+"task/read_one.php",loadData, obj); 

		function loadData(xhttp){

			let hope = JSON.parse(xhttp.responseText);
			
			if (hope.err==0) {
				
				document.getElementById("job_blok").value =  hope.data[0].job_blok;		
				document.getElementById("job_number").value =  hope.data[0].job_number;		
				document.getElementById("task_code").value =  hope.data[0].task_code;		
				document.getElementById("task_date").value = hope.data[0].task_date;		
				document.getElementById("task_area").value =  hope.data[0].task_area;		

				jsTask.readDetail(hope.data[0].task_person);
				
			}else{

				messageBox(hope.msg);		
			}
			
		}
	},

	klikDelete:function(){
		
		var obj = {
			"login_blok":g.login_blok,
			"task_blok":this.blok
		};
			
		loadDoc(myServer+"task/delete_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnDelete").disabled=true;
		
	}, 

	viewUpdate: function(blok){

		this.blok=blok;
		this.action="update";		
		this.htmlShow();
		this.readOne();	

	},
	
	klikUpdate:function(){
		let baru = this.filterArray();

		var obj = {
			"login_blok":g.login_blok,
			"task_blok":this.blok,
			"task_code":document.getElementById("task_code").value,
			"task_date":document.getElementById("task_date").value,
			"task_area":document.getElementById("task_area").value,
			"task_person":baru

		};
			
		loadDoc(myServer+"task/update_one.php",this.serverMessage, obj); 
		
		document.getElementById("btnUpdate").disabled=true;
		
	},
	
	viewSearch: function (ini){

		this.action="search";
		
		if (ini.length==0){

			this.halaman=null;

			jsTask.viewRead();
			
		}else{
			
			var obj = {
				"login_blok":g.login_blok,
				"search":ini
			};
				
			loadDoc(myServer + "task/search.php",this.showData, obj); 
		
		}
	
	},
	
	readJob: function(job_blok,job_number){
		
		document.getElementById("job_blok").value = job_blok;
		document.getElementById("job_number").value = job_number;
		
	},
	
	klikTambah: function(){
		
		let barisBaru = [];
		
		if (this.isi==null){
			this.isi = barisBaru;
		}else{
			barisBaru = this.isi;
		}
		
		let kolom = {};
		
		kolom.nomer = barisBaru.length+1;
		
		kolom.person_blok="";
		kolom.person_name="";
		kolom.person_function="";
		
		barisBaru.push (kolom);
		
		jsTask.readDetail(barisBaru);	
	},

	readDetail: function(isi){

		this.isi = isi;
		var flen, i;
		
		var txt='';

		txt ='<div class="w3-responsive">';
		txt+='<table border=1 class="w3-table-all">';
		txt+='<thead><tr class="w3-theme-l1">';

		txt+="<th>No.</th>";
		txt+="<th>Name</th>";
		txt+="<th>Function</th>";
		txt+="<th colspan=2 class='w3-center'>Action</th>";
		
		txt+="</tr></thead>";
		
		// urai isi disini 
		
		flen=isi.length;
		
		if (isi.length != 0){
			for (i=0; i<flen; i++){
				txt+= "<tr>";
				txt+= "<td>"+isi[i].nomer+"</td>";
				
				txt+= "<td>";
				txt+= "<input type ='text' id='person_name' value= '"+isi[i].person_name+"' readonly='readonly' class='w3-input w3-border'>";
				txt+= "</td>";
				
				txt+= "<td>";
				txt+= "<input type ='text' id='person_function' value= '"+isi[i].person_function+"' readonly='readonly' class='w3-input w3-border'>";
				txt+= "</td>";				
				
				txt+= '<td class="w3-center"><input type="button" onclick="jsPersonlookup.viewFind(\'task todo\',\''+i+'\',\''+isi[i].person_blok+'\')" value="Find..." class="w3-btn w3-theme-l5 w3-border w3-round-large"></td>';
				txt+= "<td class='w3-center'><input type = 'button' onclick='jsTask.klikKurang(\""+i+"\")' value='Remove' class='w3-btn w3-theme-l5 w3-border w3-round-large'></td>";
				txt+= "</tr>";
			}
		}
		
		txt+="</table></div><p>";
		
		var budi = JSON.stringify(isi);
		
		document.getElementById('person_detail').innerHTML = txt;		
	},
	
	readPerson: function(person_blok,person_name,person_function){
		
		let baris=gPerson.baris;
		var isi = this.isi;
		var baru = [];
		var isiEdit = {}
		let sudahAda = false;
		
		for (i=0;i<isi.length; i++){
			if (person_blok==isi[i].person_blok){
				sudahAda=true;
			}
		}
		
		if (sudahAda==true){
			messageBox("Person already add....");
			return;
		}
		
		for (i=0;i<isi.length; i++){
			if (i != baris){
				baru.push(isi[i]);
				
			}else{
				
				isiEdit = isi[i];
				
				isiEdit.person_blok=person_blok;
				isiEdit.person_name=person_name;
				isiEdit.person_function=person_function;

				baru.push(isiEdit);

			}
		}
		
		jsTask.readDetail(baru);
		
	},
	
	filterArray: function(){

		let isi = this.isi;
		let baru = []; 
		let isiEdit = {};

		for (i=0;i<isi.length; i++){

			// kosong

			if (isi[i].person_blok!=""){
				isiEdit = {};
			
				isiEdit.person_blok=isi[i].person_blok;
			
				baru.push(isiEdit);
			}
		}

		return baru;
	},
	
	klikKurang: function(baris){
		var i,j;
		var isi = this.isi;
		var baru = [];
		
		j=1;
		for (i=0;i<isi.length; i++){
			if (i != baris){
				isi[i].nomer=j++;
				baru.push(isi[i]);
			}
		}
		
		jsTask.readDetail(baru);
		
	},
	
}
